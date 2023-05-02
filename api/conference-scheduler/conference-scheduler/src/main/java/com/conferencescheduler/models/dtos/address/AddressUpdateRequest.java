package com.conferencescheduler.models.dtos.address;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressUpdateRequest {
    private Long id;

    private String addressName;
}
