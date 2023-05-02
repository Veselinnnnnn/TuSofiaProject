package com.conferencescheduler.service;

import com.conferencescheduler.models.entities.Session;
import com.conferencescheduler.models.dtos.session.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface SessionService {
    SessionResponse create(SessionCreateRequest request);

    SessionResponse update(SessionUpdateRequest request);

    void delete(Long id);

    Page<Session> getAll(LocalDate date, Pageable pageable);

    SessionResponse getOne(Long id);

    List<LocalTime> availableStartTimes(Long hallId, LocalDate localDate, Long duration);

    List<Session> maxProgram(LocalDate date);

    Page<Session> getFutureSessions(LocalDate date, Pageable pageable);

    Page<Session> getExpiredSessions(LocalDate date, Pageable pageable);

    SessionResponse addMember(MembersToSessionResponse request);

    SessionResponse removeMember(RemoveMemberToSessionResponse request);
}
