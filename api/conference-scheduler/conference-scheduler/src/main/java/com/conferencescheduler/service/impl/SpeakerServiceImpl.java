package com.conferencescheduler.service.impl;


import com.conferencescheduler.mappers.SpeakerMapper;
import com.conferencescheduler.models.dtos.speaker.SpeakerCreateRequest;
import com.conferencescheduler.models.dtos.speaker.SpeakerResponse;
import com.conferencescheduler.models.dtos.speaker.SpeakerUpdateRequest;
import com.conferencescheduler.models.entities.Speaker;
import com.conferencescheduler.repository.SpeakerRepository;
import com.conferencescheduler.service.SpeakerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public record SpeakerServiceImpl(SpeakerRepository speakerRepository) implements SpeakerService {

    @Override
    public SpeakerResponse create(SpeakerCreateRequest request) {
        return SpeakerMapper.INSTANCE.map(
                this.speakerRepository.save(
                        SpeakerMapper.INSTANCE.map(request)));
    }

    @Override
    public SpeakerResponse update(SpeakerUpdateRequest request) {
        if (this.speakerRepository.findById(request.getId()).isPresent()) {
            return SpeakerMapper.INSTANCE.map(
                    this.speakerRepository.save(
                            SpeakerMapper.INSTANCE.map(
                                    speakerRepository.getReferenceById(request.getId()), request)));
        }
        throw new IllegalArgumentException("Speaker with such id does not exist!");
    }

    @Override
    public void delete(Long id) {
        if(this.speakerRepository.findById(id).isPresent()){
            this.speakerRepository.deleteById(id);
            return;
        }
        throw new IllegalArgumentException("Speaker with such id does not exist!");
    }

    @Override
    public Page<Speaker> getAll(Pageable pageable) {
        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return this.speakerRepository.findAll(pageable);
    }

    @Override
    public SpeakerResponse getOne(Long id) {
        if(this.speakerRepository.findById(id).isPresent()){
            return SpeakerMapper.INSTANCE.map(
                    this.speakerRepository.getReferenceById(id));
        }
        throw new IllegalArgumentException("Speaker with such id does not exist!");
    }
}
