package com.conferencescheduler.models.dtos.session;

import com.conferencescheduler.models.dtos.address.AddressResponse;
import com.conferencescheduler.models.dtos.hall.HallResponse;
import com.conferencescheduler.models.dtos.speaker.SpeakerResponse;
import com.conferencescheduler.models.dtos.user.UserResponse;
import com.conferencescheduler.models.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class SessionResponse {
    private Long id;

    private String sessionName;

    private String description;

    private AddressResponse address;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private Set<User> members;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private UserResponse owner;

    private HallResponse hall;

    private SpeakerResponse speaker;
}
