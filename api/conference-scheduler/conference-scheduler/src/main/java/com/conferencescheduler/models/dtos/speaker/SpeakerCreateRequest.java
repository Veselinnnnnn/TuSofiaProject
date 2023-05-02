package com.conferencescheduler.models.dtos.speaker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SpeakerCreateRequest {
    private String speakerName;

    private String description;

    private Long owner;
}
