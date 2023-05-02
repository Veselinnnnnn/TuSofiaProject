package com.conferencescheduler.models.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 32)
    private String sessionName;

    @Column(length = 256)
    private String description;

    @ManyToOne
    private Address address;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @ManyToOne
    private User owner;

    @ManyToOne
    private Hall hall;

    @ManyToOne
    private Speaker speaker;

    @ManyToMany
    private Set<User> members;

    public void addMember(User member) {
        if (members == null) {
            this.members = new HashSet<>();
        }
        this.members.add(member);
    }
}
