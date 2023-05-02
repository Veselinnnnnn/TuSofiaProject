package com.conferencescheduler.repository;

import com.conferencescheduler.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String tempEmail);
}
