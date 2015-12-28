package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.exception.UserAlreadyExistException;
import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.model.UserRole;
import com.unep.wcmc.biodiversity.repository.UserRepository;
import com.unep.wcmc.biodiversity.repository.UserRoleRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserRoleRepository userRoleRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = repo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        detailsChecker.check(user);
        return user;
    }

    public User registerNewUser(User user) {
        validateUser(user, repo.findByEmail(user.getEmail()));
        validateUser(user, repo.findByUsername(user.getUsername()));
        final String role = user.getRole();
        user.setUserRole(getUserRole(role));
        user.setEnabled(true);
        return save(user);
    }

    public User create(User user) {
        validateUser(user, repo.findByEmail(user.getEmail()));
        validateUser(user, repo.findByUsername(user.getUsername()));
        final String role = user.getRole();
        user.setUserRole(getUserRole(role));

        return save(user);
    }

    private void validateUser(User user, User other) {
        if ((user == null) || (other == null) || (user.getId() == other.getId())) {
            return;
        }
        if (other.getEmail().equals(user.getEmail()) ||
                other.getUsername().equals(user.getUsername())) {
            throw new UserAlreadyExistException("User already exists");
        }
    }

    private UserRole getUserRole(String role) {
        UserRole userRole;
        final UserRole.RoleType publicUser = UserRole.RoleType.PUBLIC_USER;
        try {
            userRole = userRoleRepo.findByRole(role == null ? publicUser.name() : role);
        } catch (Exception e) {
            userRole = userRoleRepo.findByRole(publicUser.name());
        }
        return userRole;
    }

}
