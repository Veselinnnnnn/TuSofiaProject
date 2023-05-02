package com.conferencescheduler.models.dtos.speaker;

import com.conferencescheduler.models.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SpeakerResponse {
    private Long id;

    private String speakerName;

    private String description;

    private String profilePhoto;

    private User owner;
}
