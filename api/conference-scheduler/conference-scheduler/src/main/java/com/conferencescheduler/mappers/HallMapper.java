package com.conferencescheduler.mappers;


import com.conferencescheduler.models.dtos.hall.HallCreateRequest;
import com.conferencescheduler.models.dtos.hall.HallResponse;
import com.conferencescheduler.models.dtos.hall.HallUpdateRequest;
import com.conferencescheduler.models.entities.Hall;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring"
)
public interface HallMapper {
    HallMapper INSTANCE = Mappers.getMapper(HallMapper.class);

    HallResponse map(
            Hall hall
    );

    @Mapping(source = "address", target = "address.id")
    @Mapping(source = "owner", target = "owner.id")
    Hall map(
            HallCreateRequest hallCreateRequest
    );

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Hall map(
            @MappingTarget Hall hall,
            HallUpdateRequest hallUpdateRequest
    );
}
