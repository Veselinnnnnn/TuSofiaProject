package com.conferencescheduler.models.dtos.session;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SessionCreateRequest {
    private String sessionName;

    private String description;

    private Long address;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Long owner;

    private Long hall;

    private Long speaker;
}
