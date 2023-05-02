package com.conferencescheduler.service.impl;


import com.conferencescheduler.service.JwtUtil;
import com.conferencescheduler.models.entities.User;
import com.conferencescheduler.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.function.Function;

@Service
public class JwtUtilImpl implements JwtUtil {
    private final String secret = "superMegaGigaTeraPetaExaZettaUncrackableSecretKey";

    private final UserService service;

    public JwtUtilImpl(@Lazy UserService service) {
        this.service = service;
    }

    @Override
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public Claims extractAllClaims(String token) {
        System.out.println(token);
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    @Override
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    @Override
    public String generateToken(String username) {
        return createToken(username);
    }

    @Override
    public String createToken(String email) {
        System.out.println("username: " +email);
        String authorities = service.loadUserByEmail(email).getAuthorities().toString();
        User user = service.fetchUserByEmail(email);
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("role", authorities)
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(SignatureAlgorithm.HS256, secret).compact();

    }

    @Override
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
