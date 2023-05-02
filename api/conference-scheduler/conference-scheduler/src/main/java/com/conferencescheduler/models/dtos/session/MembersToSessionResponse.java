package com.conferencescheduler.models.dtos.session;

import com.conferencescheduler.models.entities.User;
import lombok.Data;

import java.util.List;

@Data
public class MembersToSessionResponse {
    private Long sessionId;

    private List<User> members;
}
