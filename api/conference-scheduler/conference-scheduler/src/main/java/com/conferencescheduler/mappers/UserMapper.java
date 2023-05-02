package com.conferencescheduler.mappers;


import com.conferencescheduler.models.dtos.user.UserResponse;
import com.conferencescheduler.models.dtos.user.UserSignUpRequest;
import com.conferencescheduler.models.dtos.user.UserUpdateRequest;
import com.conferencescheduler.models.entities.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(
        componentModel = "spring"
)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponse map(
            User User
    );

    User map(
            UserSignUpRequest UserCreateRequest
    );


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User map(
            @MappingTarget User user,
            UserUpdateRequest userUpdateRequest
    );
}
