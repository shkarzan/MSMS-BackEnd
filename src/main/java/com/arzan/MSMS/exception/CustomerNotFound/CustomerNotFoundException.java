package com.arzan.MSMS.exception.CustomerNotFound;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(Long id) {
        super("Customer with id : "+id+" not found");
    }
}
