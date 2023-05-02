package com.conferencescheduler.models.dtos.hall;

import lombok.Data;

@Data
public class HallUpdateRequest {
    private Long id;

    private String name;

    private int seatCapacity;
}
