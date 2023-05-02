package com.conferencescheduler.controller;


import com.conferencescheduler.models.dtos.session.*;
import com.conferencescheduler.models.entities.Session;
import com.conferencescheduler.service.SessionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/daySchedule")
public record SessionController(
        SessionService sessionService
) {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SessionResponse create(@RequestBody SessionCreateRequest request) {
        return this.sessionService.create(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Session> getAllByDate(@RequestParam LocalDate data, @PageableDefault Pageable pageable) {
        return this.sessionService.getAll(data, pageable);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.sessionService.delete(id);
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public SessionResponse update(@RequestBody SessionUpdateRequest request) {
        return this.sessionService.update(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public SessionResponse getOne(@PathVariable Long id) {
        return this.sessionService.getOne(id);
    }

    @GetMapping("/{hallId}/{date}/{duration}")
    @ResponseStatus(HttpStatus.OK)
    public List<LocalTime> getAvailableStartTimes(
            @PathVariable Long hallId,
            @PathVariable LocalDate date,
            @PathVariable Long duration) {
        return this.sessionService.availableStartTimes(hallId, date, duration);
    }

    @GetMapping("/maxProgram")
    @ResponseStatus(HttpStatus.OK)
    public List<Session> maxProgram(@RequestParam LocalDate date) {
        return this.sessionService.maxProgram(date);
    }

    @GetMapping("/getFutureSessions")
    @ResponseStatus(HttpStatus.OK)
    public Page<Session> getFutureSessions(@RequestParam LocalDate date, @PageableDefault Pageable pageable) {
        return this.sessionService.getFutureSessions(date, pageable);
    }

    @GetMapping("/getExpiredSessions")
    @ResponseStatus(HttpStatus.OK)
    public Page<Session> getExpiredSessions(@RequestParam LocalDate date, @PageableDefault Pageable pageable) {
        return this.sessionService.getExpiredSessions(date, pageable);
    }

    @PatchMapping("/addMember")
    @ResponseStatus(HttpStatus.OK)
    public SessionResponse addMember(@RequestBody MembersToSessionResponse request) {
        return this.sessionService.addMember(request);
    }

    @PatchMapping("/removeMember")
    @ResponseStatus(HttpStatus.OK)
    public SessionResponse removeMember(@RequestBody RemoveMemberToSessionResponse request) {
        return this.sessionService.removeMember(request);
    }
}
