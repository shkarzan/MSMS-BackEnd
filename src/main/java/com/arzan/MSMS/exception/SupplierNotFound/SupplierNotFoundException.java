package com.arzan.MSMS.exception.SupplierNotFound;


public class SupplierNotFoundException extends RuntimeException {
    public SupplierNotFoundException(Long id) {
        super("Supplier with id :"+id+" not found");
    }
}
