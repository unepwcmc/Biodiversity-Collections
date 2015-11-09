package com.unep.wcmc.biodiversity.exception;

/**
 * Throws whenever use tries to do an invalid operation over
 * passwords
 * 
 */
public final class InvalidPasswordException extends RuntimeException {
    
    private static final long serialVersionUID = 4502872009512055008L;

    public InvalidPasswordException(String message) {
        super(message);
    }
}
