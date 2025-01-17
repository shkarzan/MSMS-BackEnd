package com.arzan.MSMS.exception.SalesNotFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ControllerAdvice
public class SalesNotFoundAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(SalesNotFoundException.class)
    Map<String,String> salesNotFound(SalesNotFoundException e){
        return Map.of("ErrorMessage",e.getMessage());

    }
}
