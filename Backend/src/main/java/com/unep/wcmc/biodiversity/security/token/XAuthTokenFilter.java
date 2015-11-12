package com.unep.wcmc.biodiversity.security.token;

import com.unep.wcmc.biodiversity.exception.InvalidAuthenticationTokenException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter that sets the current authenticated user
 * 
 */
public final class XAuthTokenFilter extends GenericFilterBean {

    private final TokenProvider tokenProvider;
    
    public XAuthTokenFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        try {
            Authentication auth = tokenProvider.getAuthentication(httpRequest);
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (InvalidAuthenticationTokenException ex) {
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
        }
        chain.doFilter(request, response);
    }
}