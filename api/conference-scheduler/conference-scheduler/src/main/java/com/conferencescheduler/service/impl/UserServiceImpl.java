package com.conferencescheduler.service.impl;

import com.conferencescheduler.mappers.UserMapper;
import com.conferencescheduler.models.dtos.user.TokenResponse;
import com.conferencescheduler.models.dtos.user.UserResponse;
import com.conferencescheduler.models.dtos.user.UserSignInRequest;
import com.conferencescheduler.models.dtos.user.UserSignUpRequest;
import com.conferencescheduler.models.entities.User;
import com.conferencescheduler.repository.UserRepository;
import com.conferencescheduler.service.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public record UserServiceImpl(
        UserRepository userRepository,
        JwtUtilImpl jwtUtil,
        PasswordEncoder passwordEncoder,
        @Lazy AuthenticationManager authenticationManager
) implements UserService {
    @Override
    public User fetchUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public TokenResponse signIn(UserSignInRequest request) {
        return new TokenResponse(jwtUtil.generateToken(request.getEmail()));
    }

    @Override
    public UserResponse signUp(UserSignUpRequest request) throws Exception {
        var tempEmail = request.getEmail();

        if (tempEmail != null && !"".equals(tempEmail)) {
            User userObj = userRepository.findByEmail(tempEmail);
            if (userObj != null) {
                throw new Exception("User with this email already exists");
            }
        }

        request.setPassword(passwordEncoder.encode(request.getPassword()));

        return UserMapper.INSTANCE.map(
                userRepository.save(
                        UserMapper.INSTANCE.map(request)));
    }

    @Override
    public UserResponse getOne(Long id) {
        return UserMapper.INSTANCE.map(
                this.userRepository.getReferenceById(id));
    }

    @Override
    public UserDetails loadUserByEmail(String email) {
        var user = fetchUserByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException(email + " does not exist in our system");
        }

        return this.toDetails(user);
    }

    @Override
    public UserDetails toDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole().getGrantedAuthorities())
                .build();
    }
}

