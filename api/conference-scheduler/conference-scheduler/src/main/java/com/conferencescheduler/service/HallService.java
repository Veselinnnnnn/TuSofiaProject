package com.conferencescheduler.service;

import com.conferencescheduler.models.dtos.hall.HallCreateRequest;
import com.conferencescheduler.models.dtos.hall.HallResponse;
import com.conferencescheduler.models.dtos.hall.HallUpdateRequest;
import com.conferencescheduler.models.entities.Hall;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HallService {
    HallResponse create(HallCreateRequest request);

    HallResponse getOne(Long id);

    HallResponse update(HallUpdateRequest request);

    void delete(Long id);

    Page<Hall> findAllByAddressId(Long addressId, Pageable pageable);
}
