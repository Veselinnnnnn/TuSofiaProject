package com.conferencescheduler.models.dtos.user;

import com.conferencescheduler.models.enums.Role;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;

    private String firstName;

    private String lastName;

    private String password;

    private String username;

    private String email;

    private Role role;
}
