package com.arzan.MSMS.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Medicine {
    @Id
    private String medCode;
    private String medName;
    private Long quantity;
    private Float price;
    private Date expiryDate;

    public Medicine(String medCode, String medName, Long quantity, Float price, Date expiryDate) {
        this.medCode = medCode;
        this.medName = medName;
        this.quantity = quantity;
        this.price = price;
        this.expiryDate = expiryDate;
    }

    public Medicine() {
    }

    public String getMedCode() {
        return this.medCode;
    }

    public void setMedCode(String medCode) {
        this.medCode = medCode;
    }

    public String getMedName() {
        return this.medName;
    }

    public void setMedName(String medName) {
        this.medName = medName;
    }

    public Long getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Float getPrice() {
        return this.price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Date getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
