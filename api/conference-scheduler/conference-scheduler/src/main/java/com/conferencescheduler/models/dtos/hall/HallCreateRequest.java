package com.conferencescheduler.models.dtos.hall;

import lombok.Data;

@Data
public class HallCreateRequest {
    private String name;

    private int seatCapacity;

    private Long address;

    private Long owner;
}
