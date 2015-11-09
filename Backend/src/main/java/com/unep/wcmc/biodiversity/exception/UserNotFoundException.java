package com.unep.wcmc.biodiversity.exception;

/**
 * Throws when tries to get a non exist user
 * 
 */
public final class UserNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -3232081941194765193L;
    
    public UserNotFoundException(String message) {
        super(message);
    }
}
