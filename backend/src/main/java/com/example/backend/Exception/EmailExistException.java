package com.example.backend.Exception;

public class EmailExistException extends RuntimeException {

    public EmailExistException(String message){
        super(message);
    }
}