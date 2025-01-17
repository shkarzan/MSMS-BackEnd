package com.arzan.MSMS.model;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue
    private Long orderId;
    private String medCode;
    private String medName;
    private Long quantity;
    private String vendorName;
    private Float total;
    private Date orderDate;

    public Orders(String medCode, String medName, Long quantity, String vendorName, Float total, Date date,
                  Long salesId) {
        this.medCode = medCode;
        this.medName = medName;
        this.orderId = salesId;
        this.quantity = quantity;
        this.vendorName = vendorName;
        this.total = total;
        this.orderDate = date;
    }

    public Orders() {
    }

    public Long getOrderId() {
        return this.orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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

    public long getQuantity() {
        return this.quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public String getVendorName() {
        return this.vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public float getTotal() {
        return this.total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public Date getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
}
