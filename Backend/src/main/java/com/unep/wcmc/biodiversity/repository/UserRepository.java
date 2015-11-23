package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends AbstractRepository<User> {

    User findByEmail(String email);

    User findByUsername(String username);

    Page<User> findByFirstNameContaining(String firstName, Pageable pageable);

}
