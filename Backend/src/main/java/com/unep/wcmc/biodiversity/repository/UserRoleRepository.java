package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    
    UserRole findByRole(String role);

    UserRole findByName(String name);
}
