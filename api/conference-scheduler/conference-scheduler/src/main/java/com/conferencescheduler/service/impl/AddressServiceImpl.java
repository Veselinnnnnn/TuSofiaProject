package com.conferencescheduler.service.impl;

import com.conferencescheduler.mappers.AddressMapper;
import com.conferencescheduler.models.dtos.address.AddressCreateRequest;
import com.conferencescheduler.models.dtos.address.AddressResponse;
import com.conferencescheduler.models.dtos.address.AddressUpdateRequest;
import com.conferencescheduler.models.entities.Address;
import com.conferencescheduler.repository.AddressRepository;
import com.conferencescheduler.service.AddressService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public record AddressServiceImpl(AddressRepository addressRepository)
        implements AddressService {

    @Override
    public AddressResponse create(AddressCreateRequest request) {
        if (this.addressRepository.findByAddressName(request.getAddressName()) == null) {
            return AddressMapper.INSTANCE.map(
                    this.addressRepository.save(
                            AddressMapper.INSTANCE.map(request)));
        } else {
            throw new IllegalArgumentException("Address with that name already exists!");
        }
    }

    @Override
    public AddressResponse update(AddressUpdateRequest request) {
        if (this.addressRepository.findById(request.getId()).isPresent()) {
            if (this.addressRepository.findByAddressName(request.getAddressName()) != null) {
                throw new IllegalArgumentException("Address with that name already exists!");
            } else {
                return AddressMapper.INSTANCE.map(
                        this.addressRepository.save(
                                AddressMapper.INSTANCE.map(
                                        addressRepository.getReferenceById(request.getId()), request)));
            }
        }
        throw new IllegalArgumentException("Such address with that id does not exist!");
    }

    @Override
    public void delete(Long id) {
        if (this.addressRepository.findById(id).isPresent()) {
            this.addressRepository.deleteById(id);
            return;
        }
        throw new IllegalArgumentException("Such address with that id does not exist!");
    }

    @Override
    public AddressResponse getOne(Long id) {
        if (this.addressRepository.findById(id).isPresent()) {
            return AddressMapper.INSTANCE.map(
                    this.addressRepository.getReferenceById(id));
        }
        throw new IllegalArgumentException("Such address with that id does not exist!");
    }

    @Override
    public Page<Address> getAll(Pageable pageable) {
        return addressRepository.findAll(pageable);
    }

    @Override
    public AddressResponse getOneByName(String addressName) {
        if (this.addressRepository.findByAddressName(addressName) != null) {
            return AddressMapper.INSTANCE.map(
                    this.addressRepository.findByAddressName(addressName));
        }
        throw new IllegalArgumentException("Such address with that name does not exist!");
    }

}
