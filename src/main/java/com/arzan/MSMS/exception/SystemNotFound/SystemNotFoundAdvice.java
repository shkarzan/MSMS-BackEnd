package com.arzan.MSMS.exception.SystemNotFound;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

import org.springframework.http.HttpStatus;

@ControllerAdvice
public class SystemNotFoundAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(SystemNotFoundException.class)
    public Map<String, String> handleSystemNotFound(SystemNotFoundException e) {
       return Map.of("ErrorMessage",e.getMessage());
    }
}
