package com.example.backend.Entity.VerifyToken;

import com.example.backend.Entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "register_verify_token")
public class RegisterVerifyToken {

    @Id
    private String token; // UUID

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "expiry_date")
    LocalDateTime expiryDate;

}