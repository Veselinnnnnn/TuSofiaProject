package com.conferencescheduler.models.dtos.address;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressCreateRequest {
    private String addressName;

    private Long owner;
}
