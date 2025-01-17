package com.arzan.MSMS.model;

import jakarta.persistence.*;

@Entity
public class Sales {
    @Id
    @GeneratedValue
    private Long salesId;
    private Long subTotal;
    private Long taxRate;
    private Double taxAmount;
    private Long discountRate;
    private Double discountAmount;
    private Long total;

    public Sales(){}
    public Sales(Long salesId, Long subTotal, Long taxRate, Double taxAmount, Long discountRate, Double discountAmount, Long total) {
        this.salesId = salesId;
        this.subTotal = subTotal;
        this.taxRate = taxRate;
        this.taxAmount = taxAmount;
        this.discountRate = discountRate;
        this.discountAmount = discountAmount;
        this.total = total;
    }

    public Long getSalesId() {
        return salesId;
    }

    public void setSalesId(Long salesId) {
        this.salesId = salesId;
    }

    public Long getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Long subTotal) {
        this.subTotal = subTotal;
    }

    public Long getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(Long taxRate) {
        this.taxRate = taxRate;
    }

    public Double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(Double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public Long getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Long discountRate) {
        this.discountRate = discountRate;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
