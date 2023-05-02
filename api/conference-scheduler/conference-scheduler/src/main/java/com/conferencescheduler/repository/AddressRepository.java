package com.conferencescheduler.repository;


import com.conferencescheduler.models.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByAddressName(String addressName);
}
