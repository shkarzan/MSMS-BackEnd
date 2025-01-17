package com.arzan.MSMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arzan.MSMS.exception.SystemNotFound.SystemNotFoundException;
import com.arzan.MSMS.model.SystemDetails;
import com.arzan.MSMS.repository.SystemRepo;

@RestController
@CrossOrigin
@RequestMapping("/api/system")
//1. Post Mapping : add - /api/system/add
//2. Get Mapping : get - /api/system/get
//3. Put Mapping : update - /api/system/update
//4. Delete Mapping : delete - /api/system/delete/{companyName}

public class SystemController {
    @Autowired
    SystemRepo systemRepo;

    @PostMapping("/add")
    SystemDetails saveSystemDetails(@RequestBody SystemDetails system) {
        return systemRepo.save(system);
    }

    @GetMapping("/get")
    List<SystemDetails> fetchSystemDetails() {
        return systemRepo.findAll();
    }

    @PutMapping("/update")
    SystemDetails updateSystemDetails(@RequestBody SystemDetails system) {
        return systemRepo.findById(system.getCompanyName()).map(sys -> {
            sys.setCompanyName(system.getCompanyName());
            sys.setAddress(system.getAddress());
            sys.setEmail(system.getEmail());
            sys.setPhoneNumber(system.getPhoneNumber());
            return systemRepo.save(sys);
        }).orElseThrow(() -> new SystemNotFoundException(system.getCompanyName()));
    }

    @DeleteMapping("/delete/{companyName}")
    ResponseEntity<String> deleteSystemData(@PathVariable String companyName){
        if(!systemRepo.existsById(companyName)){
            return ResponseEntity.status(404).body("No System Found");
        }
        systemRepo.deleteById(companyName);
        return ResponseEntity.ok("Successfully Deleted");
    }

}
