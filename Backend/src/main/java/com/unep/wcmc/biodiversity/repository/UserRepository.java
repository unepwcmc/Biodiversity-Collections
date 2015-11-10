package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

    User findByUsername(String username);

    Page<User> findByFirstNameContaining(String firstName, Pageable pageable);

}
