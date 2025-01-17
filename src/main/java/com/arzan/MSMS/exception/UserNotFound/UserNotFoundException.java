package com.arzan.MSMS.exception.UserNotFound;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super("Could not find user with username " + username);
    }
}
