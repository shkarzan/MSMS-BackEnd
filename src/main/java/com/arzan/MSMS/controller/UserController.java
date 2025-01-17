package com.arzan.MSMS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arzan.MSMS.exception.UserNotFound.UserNotFoundException;
import com.arzan.MSMS.model.User;
import com.arzan.MSMS.repository.UserRepository;
import com.arzan.MSMS.response.loginResponse;

// @Controller
@RestController
@CrossOrigin
@RequestMapping("/api/user")

//1. Post Mapping : register  - /api/user/register
//2. Post Mapping : login - /api/user/login
//3. Get Mapping : all - /api/user/all
//4. Delete Mapping : delete - /api/user/delete/{id}

public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    ResponseEntity<String> registerUser(@RequestBody User user) {
        if(userRepository.existsById(user.getUsername())){
            return ResponseEntity.status(409).body("User Already Exist");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User Added Successfully");
    }

    @PostMapping("/login")
    loginResponse loginUser(@RequestBody User user) {
        loginResponse response = new loginResponse();
        Optional<User> validUser = userRepository.findById(user.getUsername());
        if (validUser.isEmpty()) {
            response.setAuthentication(-1);
        } else {
            if (validUser.get().getPassword().equals(user.getPassword())) {
                response.setAuthentication(1);
                response.setName(validUser.get().getName());
                response.setUsername(validUser.get().getUsername());
                response.setLevel(user.getUsername().equals("admin"));
            } else {
                response.setAuthentication(0);
                response.setUsername(user.getUsername());
            }
        }
        return response;
    }

    @GetMapping("/all")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/delete/{username}")
    String removeUser(@PathVariable String username) {
        if(!userRepository.existsById(username)){
            throw new UserNotFoundException(username);
        }
        userRepository.deleteById(username);
        return "User " + username + " deleted";
    }

}
