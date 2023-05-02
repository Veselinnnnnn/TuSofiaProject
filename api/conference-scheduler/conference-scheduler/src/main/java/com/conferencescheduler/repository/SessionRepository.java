package com.conferencescheduler.repository;

import com.conferencescheduler.models.entities.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    Page<Session> findByDate(LocalDate date, Pageable pageable);

    List<Session> findAllByDateOrderByStartTimeAsc(LocalDate date);

    Page<Session> findByDateGreaterThan(LocalDate date, Pageable pageable);

    Page<Session> findByDateLessThan(LocalDate date, Pageable pageable);
}
