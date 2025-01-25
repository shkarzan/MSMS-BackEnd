package com.arzan.MSMS.model;

import java.util.List;

public class InventoryUpdate {
    List<String> medCodes;
    List<Long> quantities;

    public InventoryUpdate(List<String> medCodes, List<Long> quantities) {
        this.medCodes = medCodes;
        this.quantities = quantities;
    }
    public InventoryUpdate(){}

    public List<String> getMedCodes() {
        return medCodes;
    }

    public void setMedCodes(List<String> medCodes) {
        this.medCodes = medCodes;
    }

    public List<Long> getQuantities() {
        return quantities;
    }

    public void setQuantities(List<Long> quantities) {
        this.quantities = quantities;
    }
}
