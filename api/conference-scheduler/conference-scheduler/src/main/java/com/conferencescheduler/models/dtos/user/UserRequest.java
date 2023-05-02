package com.conferencescheduler.models.dtos.user;

import lombok.Data;

@Data
public class UserRequest {
    private Long id;

    private String firstName;

    private String lastName;
}
