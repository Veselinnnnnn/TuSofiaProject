package com.conferencescheduler.service;

import com.conferencescheduler.models.dtos.address.AddressCreateRequest;
import com.conferencescheduler.models.dtos.address.AddressResponse;
import com.conferencescheduler.models.dtos.address.AddressUpdateRequest;
import com.conferencescheduler.models.entities.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AddressService {
    AddressResponse create(AddressCreateRequest request);

    AddressResponse update(AddressUpdateRequest request);

    void delete(Long id);

    AddressResponse getOne(Long id);

    Page<Address> getAll(Pageable pageable);

    AddressResponse getOneByName(String addressName);
}
