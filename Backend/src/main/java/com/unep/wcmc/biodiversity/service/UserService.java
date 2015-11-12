package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.repository.UserRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * User service api
 */
@Service
public final class UserService extends AbstractService<User, UserRepository> implements UserDetailsService {

    private final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = repo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        detailsChecker.check(user);
        return user;
    }

}
