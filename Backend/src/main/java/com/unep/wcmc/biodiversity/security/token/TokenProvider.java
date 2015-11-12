package com.unep.wcmc.biodiversity.security.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unep.wcmc.biodiversity.dto.TokenResponse;
import com.unep.wcmc.biodiversity.exception.InvalidAuthenticationTokenException;
import com.unep.wcmc.biodiversity.model.User;
import com.unep.wcmc.biodiversity.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * Service responsible for taking care of all token generation as well as evicting and persistence
 */
@Component
public class TokenProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(TokenProvider.class);

    public  static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";

    @Autowired
    private UserService userService;

    @Value("${token.secret}")
    private String tokenSecret;

    @Value("${token.expiration.minutes}")
    private int tokenExpirationMinutes;

    @Value("${token.lifetime.hours}")
    private int tokenLifetimeHours;

    private final Cache authTokenCache = CacheManager.getInstance().getCache("AuthTokenCache");

    public int getTimeToIdle() {
        return 60 * tokenExpirationMinutes;
    }

    public int getTimeToLive() {
        return 60 * 60 * tokenLifetimeHours;
    }

    public String addAuthentication(HttpServletResponse response, Authentication authentication) throws IOException {
        User user = (User) authentication.getDetails();
        String token = createTokenForUser(user);
        authTokenCache.put(new Element(token, authentication, getTimeToIdle(), getTimeToLive()));
        response.addHeader(AUTH_HEADER_NAME, token);
        TokenResponse tokenResponse = new TokenResponse(token, user);
        String tokenJsonResponse = new ObjectMapper().writeValueAsString(tokenResponse);
        response.addHeader("Content-Type", "application/json");
        response.getWriter().print(tokenJsonResponse);
        return token;
    }
    
    public void removeAuthentication(HttpServletRequest request) throws IOException {
        final Authentication authentication = getAuthentication(request);
        if (authentication == null) {
            throw new InvalidAuthenticationTokenException("invalid token");
        }
        final String token = request.getHeader(AUTH_HEADER_NAME);
        authTokenCache.remove(token);
    }

    public Authentication getAuthentication(String token) {
        if (token != null) {
            Element element = authTokenCache.get(token);
            if (element != null) {
                try {
                    if (!element.isExpired()) {
                        authTokenCache.put(new Element(element.getObjectKey(), element.getObjectValue(),
                                element.getTimeToIdle(), element.getTimeToLive()));
                        return (UsernamePasswordAuthenticationToken) element.getObjectValue();
                    } else {
                        authTokenCache.remove(element.getObjectKey());
                        throw new InvalidAuthenticationTokenException("token expired");
                    }
                } catch (MalformedJwtException e) {
                    LOGGER.error(e.getMessage());
                }
            }
        }
        return null;
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(AUTH_HEADER_NAME);
        if (token == null) {
            token = (String) request.getAttribute(AUTH_HEADER_NAME);
        }
        return getAuthentication(token);
    }

    private Authentication getAuthentication(UserDetails user) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getAuthorities());
        authenticationToken.setDetails(user);
        return authenticationToken;
    }

    public String createTokenForUser(User user) {
        return Jwts.builder()
                    .setSubject(user.getUsername())
                    .signWith(SignatureAlgorithm.HS512, tokenSecret)
                    .setIssuedAt(new Date())
                    .compact();
    }    
}
