package com.conferencescheduler.models.dtos.user;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String password;
}