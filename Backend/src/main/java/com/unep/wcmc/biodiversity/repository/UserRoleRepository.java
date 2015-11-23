package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.UserRole;
import com.unep.wcmc.biodiversity.support.AbstractRepository;

public interface UserRoleRepository extends AbstractRepository<UserRole> {
    
    UserRole findByRole(String role);

    UserRole findByName(String name);
}
