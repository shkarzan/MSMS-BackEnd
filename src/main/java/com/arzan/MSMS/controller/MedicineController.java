package com.arzan.MSMS.controller;

import java.util.List;
import com.arzan.MSMS.model.InventoryUpdate;
import com.arzan.MSMS.model.Medicine;
import com.arzan.MSMS.repository.MedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    ResponseEntity<String> addMed(@RequestBody Medicine inventory) {
        if(inventoryRepo.existsById(inventory.getMedCode())){
            return ResponseEntity.status(404).body("Medicine with code "+inventory.getMedCode()+" already exist");
        }
        inventoryRepo.save(inventory);
        return ResponseEntity.ok("Medicine added Successfully");
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

    @PutMapping("/updateInventory/{operation}")
    String updateMedQuantity(@RequestBody InventoryUpdate inventoryUpdate,@PathVariable String operation) {
        List<String> medCodes = inventoryUpdate.getMedCodes();
        List<Long> quantities = inventoryUpdate.getQuantities();
        for (int i = 0; i < medCodes.size(); i++) {
            Long quan = quantities.get(i);
            inventoryRepo.findById(medCodes.get(i)).map(val -> {
                if (operation.equals("add")) {
                    val.setQuantity(val.getQuantity() + quan);
                } else if (operation.equals("subs")) {
                    val.setQuantity(val.getQuantity() - quan);
                }
                return inventoryRepo.save(val);
            });
        }
        return "Inventory Updated Successfully";
    }
    @GetMapping("/getCountOfOOS")
    Long getCount(){
        return inventoryRepo.countByQuantityLessThan(10L);
    }

    @GetMapping("/all")
    List<Medicine> getAllMeds() {
        return inventoryRepo.findAll();
    }

    @GetMapping("/allMedName")
    List<String> getAllMedNames(){
        return inventoryRepo.findAllByMedName();
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

    @GetMapping("/outOfStock")
    List<Medicine> getOutOfStockMeds(){
        return inventoryRepo.findByQuantityLessThan(10L);
    }


}
