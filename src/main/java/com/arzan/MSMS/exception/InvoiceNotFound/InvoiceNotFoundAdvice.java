package com.arzan.MSMS.exception.InvoiceNotFound;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@ControllerAdvice
public class InvoiceNotFoundAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(InvoiceNotFoundException.class)
    Map<String,String> invoiceNotFound(InvoiceNotFoundException e){
      return Map.of("ErrorMessage", e.getMessage());
    }
}
