package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.service.UserService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController extends AbstractController<User, UserService> {

    @RequestMapping(value = "/signup", method= RequestMethod.POST)
    public User signUp(@Valid @RequestBody User user) {
        return service.registerNewUser(user);
    }
}