package com.example.backend.Dto.Request;

import lombok.Data;

@Data
public class UserResetPwRequest {
    
    private String token;

    private String newPw;

}
