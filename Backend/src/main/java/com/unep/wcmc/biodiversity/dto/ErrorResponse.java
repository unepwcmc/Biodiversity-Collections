package com.unep.wcmc.biodiversity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Domain that represents an error response operation
 * 
 */
public final class ErrorResponse {

    @JsonProperty
    private final String message;

    public ErrorResponse(String message) {
        this.message = message;
    }    
}
