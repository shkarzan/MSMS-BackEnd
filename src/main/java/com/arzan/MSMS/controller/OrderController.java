package com.arzan.MSMS.controller;

import java.util.List;

import com.arzan.MSMS.model.Orders;
import com.arzan.MSMS.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    OrderRepo orderRepo;

    @GetMapping("/sales/{name}")
    List<Orders> getSalesById(@PathVariable String name) {
        return orderRepo.findByVendorName(name);
    }

    @GetMapping("/sales")
    List<Orders> getAllSales() {
        return orderRepo.findAll();
    }



    @PostMapping("/addSale")
    Orders addSale(@RequestBody Orders sale) {
        return orderRepo.save(sale);
    }

}
