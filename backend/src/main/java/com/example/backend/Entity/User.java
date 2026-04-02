package com.example.backend.Entity;

import com.example.backend.Entity.Enum.Gender;
import com.example.backend.Entity.Enum.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Hệ thống & Bảo mật ---
    @Column(name = "password_hash", nullable = false, length = 255)
    private String userPassword;

    @Column(name = "role")
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(name = "is_verified")
    @Builder.Default
    private boolean isVerified = true;

    @Column(name = "is_active")
    @Builder.Default
    private boolean isActive = true;

    @Column(name = "ethnicity") // Giữ lại từ code cũ
    private String ethnicity;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "created_by", length = 100)
    private String createdBy;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "updated_by", length = 100)
    private String updatedBy;



    @Column(name = "f_name", nullable = false, length = 100)
    private String f_Name;

    @Column(name = "l_name", nullable = false, length = 100)
    private String l_name;


    @Enumerated(EnumType.STRING)
    private Gender gender; // Giới tính

    @Column(name = "birth_day")
    private LocalDate birthDay; // Ngày sinh

    private String avatar; // Ảnh đại diện

    @Column(nullable = false, unique = true, length = 100)
    private String email; // Email

    @Column(name = "phone_number", length = 20)
    private String phoneNumber; // Số điện thoại

    @Column(columnDefinition = "TEXT")
    private String address; // Địa chỉ hiện tại

    @Column(name = "city", length = 100)
    private String city; // Tỉnh / Thành phố

    @Column(name = "citizen_id", length = 20, unique = true)
    private String citizenId; // CCCD

    @Column(name = "student_code", length = 50)
    private String studentCode; // Mã học sinh / sinh viên

    @Column(name = "school_name")
    private String schoolName; // Trường đang học

    @Column(name = "education_level")
    private String educationLevel; // Bậc học (VD: Đại học, Cao đẳng)

    @Column(name = "major")
    private String major; // Chuyên ngành (Thay thế/bổ sung cho faculty)

    @Column(name = "classes", length = 20)
    private String classes; // Lớp

    @Column(name = "academic_year")
    private String academicYear; // Niên khóa (VD: 2020-2024)

    @Column(name = "enrollment_year")
    private String enrollmentYear; // Năm nhập học

    @Column(name = "graduation_year")
    private String graduationYear; // Năm dự kiến tốt nghiệp


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("role:" + this.role.name()));
    }

    @Override
    public String getPassword() {
        return this.userPassword;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {  // Mặc định true; customize nếu cần thêm field
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {  // Mặc định true
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // Mặc định true
        return true;
    }

    @Override
    public boolean isEnabled() {  // Dựa trên field enabled
        return this.isActive;
    }
}