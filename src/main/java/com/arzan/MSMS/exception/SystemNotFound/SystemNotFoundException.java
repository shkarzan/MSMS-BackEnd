package com.arzan.MSMS.exception.SystemNotFound;

public class SystemNotFoundException extends RuntimeException {
    public SystemNotFoundException(String companyName) {
        super("Company name " + companyName + " not register");
    }
}
