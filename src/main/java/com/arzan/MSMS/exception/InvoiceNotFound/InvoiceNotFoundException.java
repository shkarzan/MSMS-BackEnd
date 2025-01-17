package com.arzan.MSMS.exception.InvoiceNotFound;

public class InvoiceNotFoundException extends RuntimeException {
    public InvoiceNotFoundException(Long id) {
        super("Invoice with id:"+id+" not found");
    }
}
