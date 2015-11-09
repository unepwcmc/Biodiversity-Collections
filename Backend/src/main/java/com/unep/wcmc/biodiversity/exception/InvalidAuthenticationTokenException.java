package com.unep.wcmc.biodiversity.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Throws whenever user has tried to get into the
 * system using invalid token
 * 
 */
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public final class InvalidAuthenticationTokenException extends RuntimeException {

    private static final long serialVersionUID = 7491302398331504642L;
    
    public InvalidAuthenticationTokenException(String message) {
        super(message);
    }
}
