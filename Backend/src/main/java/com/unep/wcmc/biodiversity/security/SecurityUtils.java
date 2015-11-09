package com.unep.wcmc.biodiversity.security;

import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.model.UserRole;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static String getCurrentUsername() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null)
            return null;

        Authentication authentication = context.getAuthentication();
        if (authentication == null)
            return null;

        return authentication.getName();
    }

    public static Authentication getCurrentAuth() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static User getCurrentUser() {
        Object object = SecurityContextHolder.getContext().getAuthentication().getDetails();
        if (object instanceof User) {
            return (User) object;
        }
        return null;
    }

    public static boolean hasRole(UserRole.RoleType role) {
        return hasRole(role.name());
    }

    public static boolean hasRole(String role) {
        // get security context from thread local
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null)
            return false;

        Authentication authentication = context.getAuthentication();
        if (authentication == null)
            return false;

        // NOTE: GrantedAuthority is not working properly using user details instead
        //for (GrantedAuthority auth : authentication.getAuthorities()) {
        //    if (role.equals(auth.getAuthority()))
        //        return true;
        //}

        Object details = authentication.getDetails();
        if (details instanceof User) {
            return role.equals(((User) details).getUserRole().getRole());
        }

        return false;
    }

    public static boolean hasAnyRole(UserRole.RoleType... roles) {
        boolean result = false;
        for (UserRole.RoleType role : roles) {
            result = hasRole(role.name());
            if (result) {
                break;
            }
        }
        return result;
    }

    public static boolean hasAnyRole(String... roles) {
        boolean result = false;
        for (String role : roles) {
            result = hasRole(role);
            if (result) {
                break;
            }
        }
        return result;
    }

}
