package com.conferencescheduler.models.dtos.session;

import com.conferencescheduler.models.entities.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class SessionUpdateRequest {
    private Long id;

    private String sessionName;

    private String description;

    private Long address;

    private LocalDate date;

    private Set<User> members;


    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Long owner;

    private Long hall;

    private Long speaker;
}
