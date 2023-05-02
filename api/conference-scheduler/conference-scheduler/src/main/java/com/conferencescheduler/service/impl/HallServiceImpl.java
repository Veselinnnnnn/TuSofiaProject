package com.conferencescheduler.service.impl;

import com.conferencescheduler.mappers.HallMapper;
import com.conferencescheduler.models.dtos.hall.HallCreateRequest;
import com.conferencescheduler.models.dtos.hall.HallResponse;
import com.conferencescheduler.models.dtos.hall.HallUpdateRequest;
import com.conferencescheduler.models.entities.Hall;
import com.conferencescheduler.repository.AddressRepository;
import com.conferencescheduler.repository.HallRepository;
import com.conferencescheduler.service.HallService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public record HallServiceImpl(
        HallRepository hallRepository,
        AddressRepository addressRepository
) implements HallService {
    @Override
    public HallResponse create(HallCreateRequest request) {
        if (this.addressRepository.findById(request.getAddress()).isPresent()) {
            if (this.hallRepository.findHallByName(request.getName()) != null) {
                throw new IllegalArgumentException("Hall with this name in this address already exists!");
            } else {
                return HallMapper.INSTANCE.map(
                        this.hallRepository.save(
                                HallMapper.INSTANCE.map(request)));
            }
        }
        throw new IllegalArgumentException("Address with such id doesnt exist!");
    }

    @Override
    public HallResponse getOne(Long id) {
        if(this.hallRepository.findById(id).isPresent()){
            return HallMapper.INSTANCE.map(
                    this.hallRepository.getReferenceById(id));
        }
        throw new IllegalArgumentException("Hall with such id does not exist!");
    }

    @Override
    public HallResponse update(HallUpdateRequest request) {
        if (this.hallRepository.findById(request.getId()).isPresent()) {
            if (this.hallRepository.findHallByName(request.getName()) == null) {
                return HallMapper.INSTANCE.map(
                        this.hallRepository.save(
                                HallMapper.INSTANCE.map(
                                        hallRepository.getReferenceById(request.getId()), request)));
            } else {
                throw new IllegalArgumentException("Hall with that name already exists in this address!");
            }
        }
        throw new IllegalArgumentException("Hall with such id does not exist!");
    }

    @Override
    public void delete(Long id) {
        if(this.hallRepository.findById(id).isPresent()){
            this.hallRepository.deleteById(id);
            return;
        }
        throw new IllegalArgumentException("Hall with such id does not exist!");
    }

    @Override
    public Page<Hall> findAllByAddressId(Long addressId, Pageable pageable) {
        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return hallRepository.findAllByAddressId(addressId, pageable);
    }
}
