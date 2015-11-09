package com.unep.wcmc.biodiversity.exception;

/**
 * Throws when tries to user an non exist user role
 * 
 * @author Adriano Braga Alencar (adriano.alencar@integritas.com)
 *                               (adrianobragaalencar@gmail.com)
 *
 */
public final class UserRoleNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 2471655279541288272L;
	
	public UserRoleNotFoundException(String message) {
		super(message);
	}
}
