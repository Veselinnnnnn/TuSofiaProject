package com.conferencescheduler.service;

import com.conferencescheduler.models.dtos.speaker.SpeakerCreateRequest;
import com.conferencescheduler.models.dtos.speaker.SpeakerResponse;
import com.conferencescheduler.models.dtos.speaker.SpeakerUpdateRequest;
import com.conferencescheduler.models.entities.Speaker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SpeakerService {

    SpeakerResponse create(SpeakerCreateRequest request);

    SpeakerResponse update(SpeakerUpdateRequest request);

    void delete(Long id);

    Page<Speaker> getAll(Pageable pageable);

    SpeakerResponse getOne(Long id);

}
