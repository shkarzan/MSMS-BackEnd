package com.arzan.MSMS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SystemDetails {
    @Id
    private String companyName;
    private String address;
    private Long phoneNumber;
    private String email;

    public SystemDetails(String companyName, String address, Long phoneNumber, String email) {
        this.companyName = companyName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public SystemDetails() {
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
