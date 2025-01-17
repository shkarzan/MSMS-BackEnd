package com.arzan.MSMS.exception.SalesNotFound;

public class SalesNotFoundException extends RuntimeException {
    public SalesNotFoundException(Long salesId) {
        super("Sales with id:"+salesId+" not found");
    }
}
