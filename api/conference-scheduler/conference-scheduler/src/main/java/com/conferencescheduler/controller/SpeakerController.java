package com.conferencescheduler.controller;

import com.conferencescheduler.models.dtos.speaker.SpeakerCreateRequest;
import com.conferencescheduler.models.dtos.speaker.SpeakerResponse;
import com.conferencescheduler.models.dtos.speaker.SpeakerUpdateRequest;
import com.conferencescheduler.models.entities.Speaker;
import com.conferencescheduler.repository.SpeakerRepository;
import com.conferencescheduler.service.SpeakerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RequiredArgsConstructor
@RestController
@RequestMapping("/speakers")
public class SpeakerController {

    private final SpeakerService speakerService;
    @Autowired
    private SpeakerRepository speakerRepository;
    private static final Logger logger = LoggerFactory.getLogger(SpeakerController.class);

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SpeakerResponse create(@RequestBody SpeakerCreateRequest request) {
        return this.speakerService.create(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Speaker> getAll(@PageableDefault Pageable pageable) {
        return speakerService.getAll(pageable);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        this.speakerService.delete(id);
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public SpeakerResponse update(@RequestBody SpeakerUpdateRequest request) {
        return this.speakerService.update(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public SpeakerResponse getOne(@PathVariable Long id) {
        return this.speakerService.getOne(id);
    }

    @PatchMapping("/{id}/upload")
    public ResponseEntity<Object> handleProfilePhotoUpload(@PathVariable Long id, @RequestBody MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String filePath = "D:\\images\\" + fileName;
            file.transferTo(new File(filePath));

            Speaker speaker = speakerRepository.findById(id).orElseThrow();
            speaker.setProfilePhoto(filePath);
            speakerRepository.save(speaker);

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            logger.error("Error occurred while uploading image for speaker with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<ByteArrayResource> getProfilePhoto(@PathVariable Long id) {
        try {
            Speaker speaker = speakerRepository.findById(id).orElseThrow();
            String filePath = speaker.getProfilePhoto();
            File file = new File(filePath);
            byte[] imageBytes = Files.readAllBytes(file.toPath());
            ByteArrayResource imageResource = new ByteArrayResource(imageBytes);
            logger.info("Successfully retrieved image for speaker with ID: {}. Image size: {} bytes", id, imageResource.contentLength());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageResource);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving image for speaker with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


