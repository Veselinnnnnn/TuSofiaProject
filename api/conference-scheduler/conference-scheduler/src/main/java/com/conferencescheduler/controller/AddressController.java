package com.conferencescheduler.controller;

import com.conferencescheduler.models.dtos.address.AddressCreateRequest;
import com.conferencescheduler.models.dtos.address.AddressResponse;
import com.conferencescheduler.models.dtos.address.AddressUpdateRequest;
import com.conferencescheduler.models.entities.Address;
import com.conferencescheduler.service.AddressService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addresses")
public record AddressController (
        AddressService addressService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AddressResponse create(@RequestBody AddressCreateRequest request) {
        return this.addressService.create(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Address> getAll(@PageableDefault Pageable pageable) {
        return addressService.getAll(pageable);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.addressService.delete(id);
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public AddressResponse update(@RequestBody AddressUpdateRequest request) {
        return this.addressService.update(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AddressResponse getOne(@PathVariable Long id) {
        return addressService.getOne(id);
    }

    @GetMapping("/searchByName/{name}")
    @ResponseStatus(HttpStatus.OK)
    public AddressResponse getOneByName(@PathVariable String name) {
        return addressService.getOneByName(name);
    }
}

