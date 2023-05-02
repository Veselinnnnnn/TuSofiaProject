package com.conferencescheduler.controller;

import com.conferencescheduler.models.dtos.user.TokenResponse;
import com.conferencescheduler.models.dtos.user.UserResponse;
import com.conferencescheduler.models.dtos.user.UserSignInRequest;
import com.conferencescheduler.models.dtos.user.UserSignUpRequest;
import com.conferencescheduler.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public record UserController(
        UserService userService
) {
    @PostMapping("/signIn")
    @ResponseStatus(HttpStatus.OK)
    public TokenResponse signIn(@RequestBody UserSignInRequest request) {
        return this.userService.signIn(request);
    }

    @PostMapping("/signUp")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse signUp(@RequestBody UserSignUpRequest request) throws Exception {
        return userService.signUp(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse getOne(@PathVariable Long id) {
        return this.userService.getOne(id);
    }
}
