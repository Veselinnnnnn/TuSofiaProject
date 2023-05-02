package com.conferencescheduler.mappers;

import com.conferencescheduler.models.dtos.address.AddressCreateRequest;
import com.conferencescheduler.models.dtos.address.AddressResponse;
import com.conferencescheduler.models.dtos.address.AddressUpdateRequest;
import com.conferencescheduler.models.entities.Address;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring"
)
public interface AddressMapper {
    AddressMapper INSTANCE = Mappers.getMapper(AddressMapper.class);

    AddressResponse map(
            Address address
    );

    @Mapping(source = "owner", target = "owner.id")
    Address map(
            AddressCreateRequest addressCreateRequest
    );

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Address map(
            @MappingTarget Address Address,
            AddressUpdateRequest addressUpdateRequest
    );
}
