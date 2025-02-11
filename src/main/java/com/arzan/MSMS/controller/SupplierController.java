package com.arzan.MSMS.controller;

import com.arzan.MSMS.exception.SupplierNotFound.SupplierNotFoundException;
import com.arzan.MSMS.model.Supplier;
import com.arzan.MSMS.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
@CrossOrigin
public class SupplierController {
    @Autowired
    private SupplierRepo supplierRepo;

    @PostMapping("/add")
    Supplier addSupplier(@RequestBody Supplier supplier){
        return supplierRepo.save(supplier);
    }

    @GetMapping("/all")
    List<Supplier> getAll(){
        return supplierRepo.findAll();
    }

    @GetMapping("/{id}")
    Supplier getSupplier(@PathVariable Long id){
        return supplierRepo.findById(id).orElseThrow(()-> new SupplierNotFoundException(id));
    }

    @PutMapping("/update/{id}")
    Supplier update(@PathVariable Long id,@RequestBody Supplier supplier){
            return supplierRepo.findById(id).map(val ->{
                val.setSupplierName(supplier.getSupplierName());
                val.setSupplierNumber(supplier.getSupplierNumber());
                val.setSupplierEmail(supplier.getSupplierEmail());
                return supplierRepo.save(val);
            }).orElseThrow(()-> new SupplierNotFoundException(id));
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> delete(@PathVariable Long id){
        if(supplierRepo.existsById(id)){
            supplierRepo.deleteById(id);
            return ResponseEntity.ok("Supplier delete successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/allSupplierName")
    List<String> getAllSupplierName(){
        return supplierRepo.findAllSupplierName();
    }

    @PostMapping("/addAll")
    String addAll(@RequestBody List<Supplier> suppliers){
        supplierRepo.saveAll(suppliers);
        return "Saved All";
    }



}
