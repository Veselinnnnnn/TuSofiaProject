package com.conferencescheduler.mappers;


import com.conferencescheduler.models.dtos.speaker.SpeakerCreateRequest;
import com.conferencescheduler.models.dtos.speaker.SpeakerResponse;
import com.conferencescheduler.models.dtos.speaker.SpeakerUpdateRequest;
import com.conferencescheduler.models.entities.Speaker;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring"
)
public interface SpeakerMapper {
    SpeakerMapper INSTANCE = Mappers.getMapper(SpeakerMapper.class);


    SpeakerResponse map(
            Speaker speaker
    );

    @Mapping(source = "owner", target = "owner.id")
    Speaker map(
            SpeakerCreateRequest speakerCreateRequest
    );

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Speaker map(
            @MappingTarget Speaker Speaker,
            SpeakerUpdateRequest speakerUpdateRequest
    );

}
