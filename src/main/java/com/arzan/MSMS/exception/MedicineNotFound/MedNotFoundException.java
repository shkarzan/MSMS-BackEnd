package com.arzan.MSMS.exception.MedicineNotFound;

public class MedNotFoundException extends RuntimeException {
    public MedNotFoundException(String medCode) {
        super("Medicine with code " + medCode + " not found");
    }
}