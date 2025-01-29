package com.arzan.MSMS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Supplier {
    @Id
    @GeneratedValue
    private Long id;
    private String supplierName;
    private String supplierNumber;

    public Supplier(Long id, String supplierName, String supplierNumber) {
        this.id = id;
        this.supplierName = supplierName;
        this.supplierNumber = supplierNumber;
    }
    public Supplier(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getSupplierNumber() {
        return supplierNumber;
    }

    public void setSupplierNumber(String supplierNumber) {
        this.supplierNumber = supplierNumber;
    }
}
