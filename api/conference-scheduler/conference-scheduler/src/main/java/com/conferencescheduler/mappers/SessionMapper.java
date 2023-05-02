package com.conferencescheduler.mappers;


import com.conferencescheduler.models.dtos.session.SessionCreateRequest;
import com.conferencescheduler.models.dtos.session.SessionResponse;
import com.conferencescheduler.models.dtos.session.SessionUpdateRequest;
import com.conferencescheduler.models.entities.Session;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface SessionMapper {
    SessionMapper INSTANCE = Mappers.getMapper(SessionMapper.class);

    SessionResponse map(
            Session session
    );

    @Mapping(source = "owner", target = "owner.id")
    @Mapping(source = "address", target = "address.id")
    @Mapping(source = "speaker", target = "speaker.id")
    @Mapping(source = "hall", target = "hall.id")
    Session map(
            SessionCreateRequest sessionCreateRequest
    );

    @Mapping(source = "owner", target = "owner.id")
    @Mapping(source = "address", target = "address.id")
    @Mapping(source = "speaker", target = "speaker.id")
    @Mapping(source = "hall", target = "hall.id")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Session map(
            @MappingTarget Session session,
            SessionUpdateRequest sessionUpdateRequest
    );

}
