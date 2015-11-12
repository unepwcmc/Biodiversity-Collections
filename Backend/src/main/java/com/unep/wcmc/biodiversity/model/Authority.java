package com.unep.wcmc.biodiversity.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

/**
 * Authority granted to an authentication object
 *
 */
@Entity
@IdClass(Authority.class)
public class Authority implements GrantedAuthority {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private UserRole userRoleId;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Permission permissionId;
    
    public Authority() {
        super();
    }
    
    public Authority(UserRole userRoleId) {
        this.userRoleId = userRoleId;
    }
    
    public void getPermission(Permission permission) {
        this.permissionId = permission;
    }
    
    @Override
    public String getAuthority() {
        return permissionId.getPermission();
    }

    @Override
    public int hashCode() {
        int result = 17;
        result *= 41 * (userRoleId == null ? 1 : userRoleId.hashCode());
        result *= 41 * (permissionId == null ? 1 : permissionId.hashCode());
        return result;
    }
    
    @Override
    public boolean equals(Object other) {
        if (other == this) return true;
        if (other == null) return false;
        if (other.getClass() == getClass()) {
            final Authority auth = (Authority)other;
            return (userRoleId == null ? auth.userRoleId == null : 
                    userRoleId.equals(auth.userRoleId)) &&    
                   (permissionId == null) ? auth.permissionId == null : 
                       permissionId.equals(auth.permissionId);
        }
        return false;
    }

    @Override
    public String toString() {
        return permissionId == null ? null : permissionId.toString();
    }
}
