package com.conferencescheduler.models.dtos.address;

import com.conferencescheduler.models.dtos.user.UserResponse;
import lombok.Data;

@Data
public class AddressResponse {
    private Long id;

    private String addressName;

    private UserResponse owner;
}
