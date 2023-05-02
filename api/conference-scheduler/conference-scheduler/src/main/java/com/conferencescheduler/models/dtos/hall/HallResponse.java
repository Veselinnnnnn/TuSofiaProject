package com.conferencescheduler.models.dtos.hall;

import com.conferencescheduler.models.dtos.address.AddressResponse;
import com.conferencescheduler.models.dtos.user.UserResponse;
import lombok.Data;

@Data
public class HallResponse {
    private Long id;

    private String name;

    private int seatCapacity;

    private AddressResponse address;

    private UserResponse owner;
}
