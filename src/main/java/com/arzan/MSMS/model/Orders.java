package com.arzan.MSMS.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.sql.Date;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private String medCode;
    private String medName;
    private Long quantity;
    private String supplierName;
    private String date;
    private String status;

    public Orders(Long orderId, String medCode, String medName, Long quantity, String supplierName, String date) {
        this.orderId = orderId;
        this.medCode = medCode;
        this.medName = medName;
        this.quantity = quantity;
        this.supplierName = supplierName;
        this.date = date;
    }

    public Orders(){}

    @PrePersist
    public void setDefaultStatus() {
        if (this.status == null) {
            this.status = "Pending";
        }
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getMedCode() {
        return medCode;
    }

    public void setMedCode(String medCode) {
        this.medCode = medCode;
    }

    public String getMedName() {
        return medName;
    }

    public void setMedName(String medName) {
        this.medName = medName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
