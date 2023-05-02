package com.conferencescheduler.service;

import com.conferencescheduler.models.dtos.user.TokenResponse;
import com.conferencescheduler.models.dtos.user.UserResponse;
import com.conferencescheduler.models.dtos.user.UserSignInRequest;
import com.conferencescheduler.models.dtos.user.UserSignUpRequest;
import com.conferencescheduler.models.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    User fetchUserByEmail(String email);

    TokenResponse signIn(UserSignInRequest request);

    UserResponse signUp(UserSignUpRequest request) throws Exception;

    UserResponse getOne(Long id);

    UserDetails loadUserByEmail(String email);

    UserDetails toDetails(User user);
}
