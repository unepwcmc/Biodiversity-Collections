package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.dto.SuccessResponse;
import com.unep.wcmc.biodiversity.model.Support;
import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.service.UserService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController extends AbstractController<User, UserService> {

    @RequestMapping(value = "/signup", method= RequestMethod.POST)
    public User signUp(@Valid @RequestBody User user) {
        return service.registerNewUser(user);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public User create(@RequestBody User e){

        return service.create(e);
    }

    @RequestMapping(value = "/password/forget", method= RequestMethod.POST)
    public SuccessResponse forgetPassword(@RequestParam(value = "email") String email,
                                          @RequestParam(value = "callback") String urlCallback) {
        service.forgetPassword(email, urlCallback);
        return new SuccessResponse("forgot password requested");
    }

    @RequestMapping(value = "/password/reset", method= RequestMethod.POST)
    public SuccessResponse resetPassword(@RequestParam(value = "token") String token,
                                         @RequestParam(value = "password") String password) {
        service.resetPassword(token, password);
        return new SuccessResponse("password was reset");
    }

    @RequestMapping(value = "/password/change", method= RequestMethod.POST)
    public User changePassword(@RequestParam(value = "password") String password,
                               @RequestParam(value = "oldpassword") String oldPassword) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)authentication.getDetails();
        user = service.findByEmail(user.getEmail());
        return service.changePassword(user, password, oldPassword);
    }

    @RequestMapping(value = "/ask/support", method= RequestMethod.POST)
    public SuccessResponse askForSupport(@RequestBody Support support) {
        service.askForSupport(support.getEmail(), support.getSubject(), support.getMessage());
        return new SuccessResponse("ask for support email sent successful");
    }
}