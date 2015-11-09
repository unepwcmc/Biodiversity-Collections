package com.unep.wcmc.biodiversity.dto;

public class ErrorMessage {

    private static final long serialVersionUID = -2088995976378504993L;
    private final long id;
    private final String message;
    
    public ErrorMessage(long id, String message) {
        this.id = id;
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
    }
}
