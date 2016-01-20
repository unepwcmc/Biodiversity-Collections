package com.unep.wcmc.biodiversity.dto;

public class ErrorMessage {

    private static final long serialVersionUID = -2088995976378504993L;
    private final Object id;
    private final String message;
    
    public ErrorMessage(Object id, String message) {
        this.id = id;
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
    
    public Object getId() {
        return id;
    }

    public void setId(Object id) {
    }
}
