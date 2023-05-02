package com.conferencescheduler.config;

import com.conferencescheduler.jwt.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.conferencescheduler.models.enums.Role.LOGGED_USER;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors();
        return http
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/users/**").permitAll()
                .requestMatchers("/users/signIn", "/users/signUp").permitAll()
                .requestMatchers("/users/**").hasRole(LOGGED_USER.name())

                .requestMatchers(HttpMethod.GET, "/speakers/**").permitAll()
                .requestMatchers("/speakers/**").hasRole(LOGGED_USER.name())

                .requestMatchers(HttpMethod.GET, "/addresses/**").permitAll()
                .requestMatchers("/addresses/**").hasRole(LOGGED_USER.name())

                .requestMatchers(HttpMethod.GET, "/halls/**").permitAll()
                .requestMatchers("/halls/**").hasRole(LOGGED_USER.name())

                .requestMatchers(HttpMethod.GET, "/daySchedule/**").permitAll()
                .requestMatchers("/daySchedule/**").hasRole(LOGGED_USER.name())
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}