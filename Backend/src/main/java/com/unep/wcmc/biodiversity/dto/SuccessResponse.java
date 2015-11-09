package com.unep.wcmc.biodiversity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Domain that represents a success response operation
 * 
 */
public final class SuccessResponse {

    @JsonProperty
    private final String success;

    public SuccessResponse() {
        this("success");
    }    
    
    public SuccessResponse(String success) {
    	this.success = success;
    }
}
