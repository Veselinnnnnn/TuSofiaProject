package com.conferencescheduler.repository;


import com.conferencescheduler.models.entities.Hall;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HallRepository extends JpaRepository<Hall, Long> {
    Page<Hall> findAllByAddressId(Long addressId, Pageable pageable);

    Hall findHallByName(String name);
}
