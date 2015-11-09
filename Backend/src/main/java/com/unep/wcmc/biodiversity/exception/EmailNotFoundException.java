package com.unep.wcmc.biodiversity.exception;

/**
 * Throws when tries to get an user from invalid
 * email
 * 
 * @author Adriano Braga Alencar (adriano.alencar@integritas.com)
 *                               (adrianobragaalencar@gmail.com)
 *
 */
public final class EmailNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -3232081941194765193L;
    
    public EmailNotFoundException(String message) {
        super(message);
    }
}
