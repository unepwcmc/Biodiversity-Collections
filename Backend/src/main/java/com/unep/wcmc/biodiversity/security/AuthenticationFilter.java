package com.unep.wcmc.biodiversity.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.unep.wcmc.biodiversity.exception.InvalidAuthenticationTokenException;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.unep.wcmc.biodiversity.service.TokenAuthenticationService;

/**
 * Filter that sets the current authenticated user
 */
public final class AuthenticationFilter extends GenericFilterBean {

    private final TokenAuthenticationService tokenAuthenticationService;
    
    public AuthenticationFilter(TokenAuthenticationService tokenAuthenticationService) {
        this.tokenAuthenticationService = tokenAuthenticationService;
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        if (httpRequest.getMethod() != HttpMethod.OPTIONS.name()) {
            try {
                Authentication auth = tokenAuthenticationService.getAuthentication(httpRequest);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (InvalidAuthenticationTokenException ex) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
            }
        }
        chain.doFilter(request, response);
    }
}
