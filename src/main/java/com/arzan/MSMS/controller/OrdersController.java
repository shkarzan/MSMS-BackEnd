package com.arzan.MSMS.controller;

import com.arzan.MSMS.exception.SupplierNotFound.SupplierNotFoundException;
import com.arzan.MSMS.model.Orders;
import com.arzan.MSMS.model.Supplier;
import com.arzan.MSMS.repository.OrdersRepo;
import com.arzan.MSMS.repository.SalesRepo;
import com.arzan.MSMS.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrdersController {
    @Autowired
    OrdersRepo ordersRepo;

    @PostMapping("/add")
    Orders saveOrder(@RequestBody Orders orders){
        return ordersRepo.save(orders);
    }
    @GetMapping("/all")
    List<Orders> getAllOrders(){
        return ordersRepo.findAll();
    }

    @PutMapping("/completed/{id}")
    Orders updateOrderStatus(@PathVariable Long id){
        return ordersRepo.findById(id).map(val->{
            val.setStatus("Completed");
            return ordersRepo.save(val);
        }).orElseThrow(()->new SupplierNotFoundException(id));

    }


    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteOrder(@PathVariable Long id){
        if(ordersRepo.existsById(id)){
            ordersRepo.deleteById(id);
            return ResponseEntity.ok("Order with id:"+id+" deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
