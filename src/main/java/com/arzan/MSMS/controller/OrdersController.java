package com.arzan.MSMS.controller;

import com.arzan.MSMS.Service.EmailService;
import com.arzan.MSMS.exception.SalesNotFound.SalesNotFoundException;
import com.arzan.MSMS.exception.SupplierNotFound.SupplierNotFoundException;
import com.arzan.MSMS.model.Orders;
import com.arzan.MSMS.model.Supplier;
import com.arzan.MSMS.repository.OrdersRepo;
import com.arzan.MSMS.repository.SupplierRepo;
import jakarta.mail.MessagingException;
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

    @Autowired
    SupplierRepo supplierRepo;

    @Autowired
    private EmailService emailService;


    @PostMapping("/add")
    ResponseEntity<String> saveOrder(@RequestBody Orders orders){
        try{
            Optional<Supplier> supplier = supplierRepo.findBySupplierName(orders.getSupplierName());
            if(supplier.isPresent()){
                String supplierEmail = supplier.get().getSupplierEmail();
                emailService.sendEmailToSupplier(supplierEmail,orders.getMedName(),orders.getQuantity());
                ordersRepo.save(orders);
                return ResponseEntity.ok("Order Added Successfully");
            }
            else{
                return ResponseEntity.status(500).body("Supplier Email not found");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
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
    ResponseEntity<String> deleteOrder(@PathVariable Long id) throws MessagingException {
        if(ordersRepo.existsById(id)){
            Optional<Orders> order = ordersRepo.findById(id);
            if(order.isPresent()) {
                String status = order.get().getStatus();
                if (status.equals("Completed") || status.equals("Cancelled")) {
                    ordersRepo.deleteById(id);
                    return ResponseEntity.ok("Order with id:" + id + " deleted successfully");
                } else if(status.equals("Pending")){
                    Optional<Supplier> supplier = supplierRepo.findBySupplierName(order.get().getSupplierName());
                    if(supplier.isPresent()){
                        emailService.sendCancelEmailToSupplier(order.get(),supplier.get().getSupplierEmail());
                        order.get().setStatus("Cancelled");
                        ordersRepo.save(order.get());
                    }
                    return ResponseEntity.ok("Order cancelled");
                }
            }
        }
        return ResponseEntity.notFound().build();
    }
}
