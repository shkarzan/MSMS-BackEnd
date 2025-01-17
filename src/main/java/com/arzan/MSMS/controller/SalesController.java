package com.arzan.MSMS.controller;

import com.arzan.MSMS.exception.SalesNotFound.SalesNotFoundException;
import com.arzan.MSMS.model.Sales;
import com.arzan.MSMS.repository.SalesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/sales")
public class SalesController {
    @Autowired
    SalesRepo salesRepo;

    @GetMapping("/all")
    List<Sales> getAllSales(){
        return salesRepo.findAll();
    }

    @PostMapping("/add")
    Sales addSales(@RequestBody Sales sales){
        return salesRepo.save(sales);
    }

    @DeleteMapping("/deleteAll")
    ResponseEntity<String> deleteAll(){
        salesRepo.deleteAll();
        return ResponseEntity.ok().body("All Sales Deleted");
    }

    @GetMapping("/{id}")
    Sales getSalesById(@PathVariable Long id){
        return salesRepo.findById(id).orElseThrow(()->new SalesNotFoundException(id));
    }

    @DeleteMapping("/delete/{salesId}")
    ResponseEntity<String> deleteById(@PathVariable Long salesId){
        if(salesRepo.existsById(salesId)){
            salesRepo.deleteById(salesId);
            return ResponseEntity.ok("Sales Deleted Successfully");
        }
        return ResponseEntity.notFound().build();
    }

}
