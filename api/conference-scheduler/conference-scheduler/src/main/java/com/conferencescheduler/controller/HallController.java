package com.conferencescheduler.controller;

import com.conferencescheduler.models.dtos.hall.HallCreateRequest;
import com.conferencescheduler.models.dtos.hall.HallResponse;
import com.conferencescheduler.models.dtos.hall.HallUpdateRequest;
import com.conferencescheduler.models.entities.Hall;
import com.conferencescheduler.service.HallService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/halls")
public record HallController (
        HallService hallService
) {
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.hallService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HallResponse getOne(@PathVariable Long id) {
        return this.hallService.getOne(id);
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public HallResponse update(@RequestBody HallUpdateRequest request) {
        return this.hallService.update(request);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HallResponse create(@RequestBody HallCreateRequest request) {
        return this.hallService.create(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Hall> getAllByAddressId(@RequestParam("data") Long addressId, @PageableDefault Pageable pageable) {
        return hallService.findAllByAddressId(addressId, pageable);
    }
}
