package com.conferencescheduler.models.dtos.speaker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SpeakerUpdateRequest {
    private Long id;

    private String speakerName;

    private String description;

}
