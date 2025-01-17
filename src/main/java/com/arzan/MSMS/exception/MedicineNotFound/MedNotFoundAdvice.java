package com.arzan.MSMS.exception.MedicineNotFound;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MedNotFoundAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(MedNotFoundException.class)
    public Map<String, String> handleMedNotFound(MedNotFoundException e) {
        return Map.of("ErrorMessage",e.getMessage());
    }

}
