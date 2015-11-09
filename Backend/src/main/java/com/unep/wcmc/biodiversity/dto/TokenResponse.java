package com.unep.wcmc.biodiversity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unep.wcmc.biodiversity.model.User;

/**
 * Domain that represents the login response within
 * generated token
 * 
 */
public final class TokenResponse {

    @JsonProperty
    private final String token;
    @JsonProperty
    private final User user;
    
    public TokenResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
