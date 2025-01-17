package com.arzan.MSMS.controller;

import com.arzan.MSMS.exception.CustomerNotFound.CustomerNotFoundException;
import com.arzan.MSMS.exception.UserNotFound.UserNotFoundException;
import com.arzan.MSMS.model.Customer;
import com.arzan.MSMS.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/customer")

//1. Put Mapping : update - /api/customer/update/{id}
//2. Get Mapping : all - /api/customer/all
//3. Get Mapping : get - /api/customer/get/{id}
//4. Post Mapping : add - /api/customer/add
//5. Delete Mapping : delete - /api/customer/delete/{id}

public class CustomerController {
    @Autowired
    CustomerRepo customerRepo;

    @PutMapping("/update/{id}")
    Customer updateCustomer(@PathVariable Long id,@RequestBody Customer customer){
        return customerRepo.findById(id)
                .map(c ->{
                    c.setEmail(customer.getEmail());
                    c.setName(customer.getName());
                    c.setPhone(customer.getPhone());
                    return customerRepo.save(c);
                }).orElseThrow(()-> new UserNotFoundException(customer.getName()));
    }

    @GetMapping("/all")
    List<Customer> getAllCustomers(){
        return customerRepo.findAll();
    }

    @GetMapping("/get/{id}")
    Customer getCustomerById(@PathVariable Long id) {
        return customerRepo.findById(id).orElseThrow(()-> new CustomerNotFoundException(id));
    }

    @PostMapping("/add")
    Customer saveCustomer(@RequestBody Customer customer){
        return customerRepo.save(customer);
    }

    @DeleteMapping("/delete/{customerId}")
    ResponseEntity<String> deleteById(@PathVariable Long customerId){
        if(!customerRepo.existsById(customerId)){
            return ResponseEntity.status(404).body("Customer with id:"+customerId+" not found");
        }
        customerRepo.deleteById(customerId);
        return ResponseEntity.ok("Customer deleted");
    }


}
