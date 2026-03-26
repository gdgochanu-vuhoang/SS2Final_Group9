package com.example.backend.Service;

import com.example.backend.Dto.Request.UserRegisterRequest;
import com.example.backend.Entity.User;
import com.example.backend.Entity.VerifyToken.RegisterVerifyToken;
import com.example.backend.Repository.RegisterVerifyTokenRepository;
import com.example.backend.Repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

}