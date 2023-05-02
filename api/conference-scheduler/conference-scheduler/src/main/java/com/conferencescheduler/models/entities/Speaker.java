package com.conferencescheduler.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Speaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 32)
    private String speakerName;

    @Column(length = 256)
    private String description;

    @Column
    private String profilePhoto;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "speaker")
    private Set<Session> sessions;
}
