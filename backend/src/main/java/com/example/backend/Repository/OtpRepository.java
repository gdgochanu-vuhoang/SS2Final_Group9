package com.example.backend.Repository;

import com.example.backend.Entity.VerifyToken.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, String> {

    Optional<Otp> findByOtp(String otp);
}