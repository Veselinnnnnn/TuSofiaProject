package com.conferencescheduler.exceptionHandler;

import lombok.Data;

@Data
public class ErrorResponse {
    private int errorCode;

    private String errorMessage;
}
