package com.unep.wcmc.biodiversity.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unep.wcmc.biodiversity.service.TokenAuthenticationService;
import com.unep.wcmc.biodiversity.dto.SuccessResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Handle that takes care about of nuts and bolts of 
 * logout operation
 * 
 */
public final class LogoutHandler extends SimpleUrlLogoutSuccessHandler implements org.springframework.security.web.authentication.logout.LogoutHandler {

    private final TokenAuthenticationService tokenAuthenticationService;
        
    public LogoutHandler(TokenAuthenticationService tokenAuthenticationService) {
        this.tokenAuthenticationService = tokenAuthenticationService;
    }
    
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        try {
            tokenAuthenticationService.removeAuthentication(httpRequest);
            SecurityContextHolder.getContext().setAuthentication(null);
        } catch (IOException e) {
            SecurityContextHolder.clearContext();
        }
    }
    
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {        
        SuccessResponse successResponse = new SuccessResponse();
        String jsonResponse = new ObjectMapper().writeValueAsString(successResponse);
        response.addHeader("Content-Type", "application/json");
        response.getWriter().print(jsonResponse);    
    }
}