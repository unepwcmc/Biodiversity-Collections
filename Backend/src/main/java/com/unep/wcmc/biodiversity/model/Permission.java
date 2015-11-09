package com.unep.wcmc.biodiversity.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Model that defines an application's permission
 * access
 *
 */
@Entity
public class Permission implements BaseEntity {
    
    private static final long serialVersionUID = -3942955339677014610L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    
    public Permission() {
    }
    
    public String getPermission() {
        return name;
    }
    
	@Override
	public Long getId() {
		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}
    
    @Override
    public String toString() {
        return name;
    }
}
