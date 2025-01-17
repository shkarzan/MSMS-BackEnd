package com.arzan.MSMS.exception.UserAlreadyExist;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ControllerAdvice
public class UserAlreadyExistAdvice {
    @ResponseBody
    @ExceptionHandler(UserAlreadyExist.class)
    @ResponseStatus(HttpStatus.ALREADY_REPORTED)
    public Map<String,String> handleUserAlreadyExist(UserAlreadyExist e){
        return Map.of("ErrorMessage" ,e.getMessage());

    }
}
