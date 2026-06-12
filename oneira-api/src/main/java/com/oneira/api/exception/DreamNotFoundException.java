package com.oneira.api.exception;

public class DreamNotFoundException extends RuntimeException {

    public DreamNotFoundException(Long id) {
        super("Dream not found with id " + id);
    }
}
