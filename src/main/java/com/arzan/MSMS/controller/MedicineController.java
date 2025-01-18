package com.arzan.MSMS.controller;

import java.util.List;

import com.arzan.MSMS.model.Medicine;
import com.arzan.MSMS.repository.MedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.arzan.MSMS.exception.MedicineNotFound.MedNotFoundException;

@RestController
@CrossOrigin
@RequestMapping("/api/medicine")
//1. Post Mapping : saveAll - /api/medicine/saveAll
//2. Post Mapping : add - /api/medicine/add
//3. Put Mapping : update - /api/medicine/update/{id}
//4. Get Mapping : all - /api/medicine/all
//5. Get Mapping : by Id - /api/medicine/{id}
//6. Delete Mapping : delete - /api/medicine/delete/{id}

public class MedicineController {
    @Autowired
    MedicineRepo inventoryRepo;

    @PostMapping("/saveAll")
    List<Medicine> saveAllMeds(@RequestBody List<Medicine> medicines){
        return inventoryRepo.saveAll(medicines);
    }

    @PostMapping("/add")
    Medicine addMed(@RequestBody Medicine inventory) {
        return inventoryRepo.save(inventory);
    }

    @PutMapping("/update/{medCode}")
    Medicine updateMed(@RequestBody Medicine medicine,@PathVariable String medCode) {
        return inventoryRepo.findById(medCode)
                .map(med -> {
                    // med.setMedCode(inventory.getMedCode());
                    med.setMedName(medicine.getMedName());
                    med.setPrice(medicine.getPrice());
                    med.setQuantity(medicine.getQuantity());
                    med.setExpiryDate(medicine.getExpiryDate());
                    return inventoryRepo.save(med);
                })
                .orElseThrow(() -> new MedNotFoundException(medCode));
    }

    @PutMapping("/updateQuantity")
    String updateMedQuantity(@RequestBody List<String> meds,@RequestBody List<String> quantities){
        for(int i=0;i<meds.size();i++){
            int finalI = i;
            inventoryRepo.findById(meds.get(i)).map(medicine -> {
                medicine.setQuantity(medicine.getQuantity() - Long.parseLong(quantities.get(finalI)));
                return inventoryRepo.save(medicine);
            }).orElseThrow(()-> new MedNotFoundException(meds.get(finalI)));
        }
        return "Done";
    }

    @GetMapping("/all")
    List<Medicine> getAllMeds() {
        return inventoryRepo.findAll();
    }

    @GetMapping("/{medCode}")
    Medicine getMed(@PathVariable String medCode) {
        return inventoryRepo.findById(medCode).orElseThrow(() -> new MedNotFoundException(medCode));
    }

    @DeleteMapping("/delete/{medCode}")
    String deleteMed(@PathVariable String medCode) {
        if(!inventoryRepo.existsById(medCode)){
            throw new MedNotFoundException(medCode);
        }
        inventoryRepo.deleteById(medCode);
        return "Medicine with code " + medCode + " deleted";
    }


}
