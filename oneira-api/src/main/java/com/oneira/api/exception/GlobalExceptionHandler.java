package com.oneira.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DreamNotFoundException.class)
    public ResponseEntity<String> handleDreamNotFound(DreamNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(HttpStatus.NOT_FOUND + " : " + ex.getMessage());
    }
}
