package com.conferencescheduler.service.impl;

import com.conferencescheduler.mappers.SessionMapper;
import com.conferencescheduler.models.dtos.session.*;
import com.conferencescheduler.models.entities.Session;
import com.conferencescheduler.models.entities.User;
import com.conferencescheduler.repository.*;
import com.conferencescheduler.service.SessionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public record SessionServiceImpl(
        SessionRepository sessionRepository,
        AddressRepository addressRepository,
        HallRepository hallRepository,
        SpeakerRepository speakerRepository,
        UserRepository userRepository,
        SessionMapper sessionMapper
) implements SessionService {

    private void makeValidSession(LocalDateTime startTime, LocalDateTime endTime, LocalDate date, Long hallId, Long addressId, Long speakerId, Long ownerId) {

        if (addressRepository.findById(addressId).isEmpty()) {
            throw new IllegalArgumentException("Address with such id does not exist!");
        }
        if (hallRepository.findById(hallId).isEmpty()) {
            throw new IllegalArgumentException("Hall with such id does not exist!");
        }
        if (speakerRepository.findById(speakerId).isEmpty()) {
            throw new IllegalArgumentException("Speaker with such id does not exist!");
        }
        if (userRepository.findById(ownerId).isEmpty()) {
            throw new IllegalArgumentException("User with such id does not exist!");
        }
        if (startTime.equals(endTime)) {
            throw new IllegalArgumentException("Start time and end time can't be equal!");
        }
        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start time can't be after end time!");
        }

        if (startTime.isBefore(LocalDateTime.of(date, LocalTime.of(8, 0)))
                || startTime.isAfter(LocalDateTime.of(date, LocalTime.of(20, 0)))
                || endTime.isAfter(LocalDateTime.of(date, LocalTime.of(20, 0)))) {
            throw new IllegalArgumentException("Hall working hours are 8:00-20:00");
        }

        List<Session> sessionList = this.sessionRepository.findAllByDateOrderByStartTimeAsc(date);

        if (sessionList != null) {
            for (Session session : sessionList) {
                if (session.getAddress().getId().equals(addressId)) {
                    if (session.getHall().getId().equals(hallId)) {
                        if ((startTime.isAfter(session.getStartTime()) && startTime.isBefore(session.getEndTime())) ||
                                (endTime.isAfter(session.getStartTime()) && endTime.isBefore(session.getEndTime())) ||
                                (startTime.isBefore(session.getStartTime()) && endTime.isAfter(session.getStartTime())) ||
                                (startTime.isEqual(session.getStartTime()) || endTime.isEqual(session.getEndTime()) ||
                                        startTime.isEqual(session.getEndTime()) || endTime.isEqual(session.getStartTime()))) {
                            throw new IllegalArgumentException("There is a session in the hall between "
                                    + session.getStartTime() + " and " + session.getEndTime());
                        }
                    }
                }
            }
        }
    }

    @Override
    public Page<Session> getFutureSessions(LocalDate date, Pageable pageable) {
        return this.sessionRepository.findByDateGreaterThan(date, pageable);
    }

    @Override
    public Page<Session> getExpiredSessions(LocalDate date, Pageable pageable) {
        return this.sessionRepository.findByDateLessThan(date, pageable);
    }

    @Override
    public SessionResponse create(SessionCreateRequest request) {
        request.setStartTime(request.getStartTime().plusHours(2));
        request.setEndTime(request.getEndTime().plusHours(2));

        makeValidSession(request.getStartTime(), request.getEndTime(), request.getDate(), request.getHall(), request.getAddress(), request.getSpeaker(), request.getOwner());

        return SessionMapper.INSTANCE.map(
                this.sessionRepository.save(
                        SessionMapper.INSTANCE.map(request)));
    }

    @Override
    public SessionResponse update(SessionUpdateRequest request) {
        request.setStartTime(request.getStartTime().plusHours(2));
        request.setEndTime(request.getEndTime().plusHours(2));

        if (this.sessionRepository.findById(request.getId()).isEmpty()) {
            throw new IllegalArgumentException("Session with such id does not exist!");
        }

        makeValidSession(request.getStartTime(), request.getEndTime(), request.getDate(), request.getHall(), request.getAddress(), request.getSpeaker(), request.getOwner());

        return SessionMapper.INSTANCE.map(
                this.sessionRepository.save(
                        SessionMapper.INSTANCE.map(
                                sessionRepository.getReferenceById(request.getId()), request
                        )
                )
        );
    }

    @Override
    public SessionResponse addMember(MembersToSessionResponse request) {
        Optional<Session> session = this.sessionRepository.findById(request.getSessionId());

        if (session.isEmpty()) {
            throw new IllegalArgumentException("Session with such id does not exist!");
        }

        if (request.getMembers().isEmpty()) {
            throw new IllegalArgumentException("No members to add");
        }

        request.getMembers().forEach(e -> {
            session.get().addMember(e);
        });

        return sessionMapper.map(sessionRepository.save(session.get()));
    }

    @Override
    public SessionResponse removeMember(RemoveMemberToSessionResponse request) {

        Session session = this.sessionRepository.getReferenceById(request.getSession());

        User user = this.userRepository.getReferenceById(request.getOwner());

        session.getMembers().remove(user);

        return sessionMapper.map(this.sessionRepository.save(session));
    }

    @Override
    public void delete(Long id) {
        if (this.sessionRepository.findById(id).isPresent()) {
            this.sessionRepository.deleteById(id);
            return;
        }
        throw new IllegalArgumentException("Session with such id does not exist!");
    }

    @Override
    public Page<Session> getAll(LocalDate date, Pageable pageable) {
        return this.sessionRepository.findByDate(date, pageable);
    }

    @Override
    public SessionResponse getOne(Long id) {
        var session = this.sessionRepository.findById(id).orElseThrow(() -> {
            throw new IllegalArgumentException("Session with such id does not exist!");
        });

        return this.sessionMapper.map(session);
    }

    @Override
    public List<LocalTime> availableStartTimes(Long hail, LocalDate localDate, Long duration) {
        List<Session> sessions = this.sessionRepository.findAllByDateOrderByStartTimeAsc(localDate);
        List<LocalTime> listOfHours = new ArrayList<>();

        LocalDateTime currentTime = LocalTime.parse("08:00:00").atDate(localDate);
        LocalDateTime dayEnd = LocalTime.parse("20:00:00").atDate(localDate);

        int i = 0;

        do {
            if (currentTime.plusMinutes(duration).compareTo(dayEnd) <= 0) {
                if (i < sessions.size()) {
                    if (currentTime.plusMinutes(duration).compareTo(sessions.get(i).getStartTime()) <= 0) {
                        listOfHours.add(currentTime.toLocalTime());
                        currentTime = currentTime.plusMinutes(15);
                    } else {
                        if (sessions.get(i).getEndTime().getMinute() % 15 != 0) {
                            currentTime = sessions.get(i).getEndTime().plusMinutes(15 - (sessions.get(i).getEndTime().getMinute() % 15));

                            System.out.println(sessions.get(i).getEndTime());
                        } else {
                            System.out.println(sessions.get(i).getEndTime());
                            currentTime = sessions.get(i).getEndTime();
                        }
                        i++;
                    }
                } else {
                    listOfHours.add(currentTime.toLocalTime());
                    currentTime = currentTime.plusMinutes(15);
                }
            } else {
                break;
            }
        } while (true);

        return listOfHours;
    }

    @Override
    public List<Session> maxProgram(LocalDate date) {

        List<Session> maxSessions = new ArrayList<>();
        List<Session> allSessions = this.sessionRepository.findAllByDateOrderByStartTimeAsc(date);

        LocalDateTime time;

        maxSessions.add(allSessions.get(0));

        time = allSessions.get(0).getEndTime();

        for (int i = 1; i < allSessions.size(); i++) {
            if (allSessions.get(i).getStartTime().isAfter(time)) {
                maxSessions.add(allSessions.get(i));
                time = allSessions.get(i).getEndTime();
            }
        }
        return maxSessions;
    }
}



