package com.arzan.MSMS.model;

import jakarta.persistence.*;

@Entity

public class Invoice {
    @Id
    private Long salesId;
    private Long customerId;
    @Lob
    private byte[] invoicePdf;
//    private Date dateCreated;

    public Invoice(Long salesId, Long customerId, byte[] invoicePdf) {
        this.salesId = salesId;
        this.customerId = customerId;
        this.invoicePdf = invoicePdf;
//        this.dateCreated = date;
    }

    public Invoice() {
    }

    public Long getSalesId() {
        return salesId;
    }

    public void setSalesId(Long salesId) {
        this.salesId = salesId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public byte[] getInvoicePdf() {
        return invoicePdf;
    }

    public void setInvoicePdf(byte[] invoicePdf) {
        this.invoicePdf = invoicePdf;
    }
}


