package com.unep.wcmc.biodiversity.exception;

/**
 * Throws when tries to create a new user within
 * another user's sensitive data as email or 
 * username
 * 
 */
public final class UserAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 5571283526796601573L;
    
    public UserAlreadyExistException(String message) {
        super(message);
    } 
}
