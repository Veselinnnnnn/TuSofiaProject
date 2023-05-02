package com.conferencescheduler.models.dtos.session;

import lombok.Data;

@Data
public class RemoveMemberToSessionResponse {
    private Long owner;

    private Long session;
}
