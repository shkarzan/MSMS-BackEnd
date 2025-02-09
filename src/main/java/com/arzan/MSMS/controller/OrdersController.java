package com.arzan.MSMS.controller;

import com.arzan.MSMS.exception.SalesNotFound.SalesNotFoundException;
import com.arzan.MSMS.exception.SupplierNotFound.SupplierNotFoundException;
import com.arzan.MSMS.model.Orders;
import com.arzan.MSMS.repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/get/{id}")
    Orders getOrderById(@PathVariable Long id){
        return ordersRepo.findById(id).orElseThrow(()-> new SalesNotFoundException(id));/**/
    }

    @PutMapping("/completed/{id}")
    Orders updateOrderStatus(@PathVariable Long id){
        return ordersRepo.findById(id).map(val->{
            val.setStatus("Completed");
            return ordersRepo.save(val);
        }).orElseThrow(()->new SupplierNotFoundException(id));
    }

    @PutMapping("update/{id}")
    Orders updateOrderById(@PathVariable Long id,@RequestBody Orders order){
        return ordersRepo.findById(id).map(val->{
            val.setMedName(order.getMedName());
            val.setQuantity(order.getQuantity());
            val.setSupplierName(order.getSupplierName());
            return ordersRepo.save(val);
        }).orElseThrow(()-> new SalesNotFoundException(id));
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
