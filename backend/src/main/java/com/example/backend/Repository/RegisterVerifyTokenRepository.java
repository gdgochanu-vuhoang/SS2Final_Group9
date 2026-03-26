package com.example.backend.Repository;

import com.example.backend.Entity.User;
import com.example.backend.Entity.VerifyToken.RegisterVerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterVerifyTokenRepository extends JpaRepository<RegisterVerifyToken, String> {

    public Optional<RegisterVerifyToken> findByToken(String token);

    public void deleteByUser(User user);
}