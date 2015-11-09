package com.unep.wcmc.biodiversity.exception;

import com.unep.wcmc.biodiversity.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Handler responsible for formating error 
 * messages as friendly json message and return
 * them to the caller
 *
 */
@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorResponse errorResponse(Exception exception) {
        return new ErrorResponse(exception.getMessage());
    }
}
