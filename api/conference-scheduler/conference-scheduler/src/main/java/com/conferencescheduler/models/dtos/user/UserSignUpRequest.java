package com.conferencescheduler.models.dtos.user;

import com.conferencescheduler.models.enums.Role;
import lombok.Data;

@Data
public class UserSignUpRequest {
    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String password;

    private Role role;
}