package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.service.UserService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController extends AbstractController<User, UserService> {

}