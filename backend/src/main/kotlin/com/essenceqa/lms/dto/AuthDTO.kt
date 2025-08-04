package com.essenceqa.lms.dto

import com.essenceqa.lms.model.UserRole
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDate

data class LoginRequest(
    @field:Email(message = "Email should be valid")
    @field:NotBlank(message = "Email is required")
    val email: String,
    
    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, message = "Password must be at least 8 characters")
    val password: String,
    
    val rememberMe: Boolean = false
)

data class SignupRequest(
    @field:Email(message = "Email should be valid")
    @field:NotBlank(message = "Email is required")
    val email: String,
    
    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, message = "Password must be at least 8 characters")
    val password: String,
    
    @field:NotBlank(message = "First name is required")
    val firstName: String,
    
    @field:NotBlank(message = "Last name is required")
    val lastName: String,
    
    val phone: String? = null,
    
    val role: UserRole = UserRole.STUDENT, // Default to student, others created by admin
    
    // Student-specific fields
    val dateOfBirth: LocalDate? = null,
    val gender: String? = null,
    
    // Parent info for student registration
    val parentEmail: String? = null,
    val parentPassword: String? = null
)

data class AuthResponse(
    val success: Boolean,
    val message: String,
    val user: UserDTO? = null,
    val token: String? = null,
    val refreshToken: String? = null,
    val redirectUrl: String? = null
)

data class UserDTO(
    val id: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val role: UserRole,
    val isActive: Boolean,
    val emailVerified: Boolean,
    val profileImage: String? = null,
    val phone: String? = null,
    
    // Role-specific data
    val student: StudentDTO? = null,
    val teacher: TeacherDTO? = null,
    val parent: ParentDTO? = null
)

data class StudentDTO(
    val id: String,
    val dateOfBirth: LocalDate,
    val gender: String,
    val gradeLevel: String? = null,
    val studentPhone: String? = null
)

data class TeacherDTO(
    val id: String,
    val bio: String? = null,
    val nameTag: String? = null
)

data class ParentDTO(
    val id: String,
    val children: List<StudentDTO> = emptyList()
)

data class ForgotPasswordRequest(
    @field:Email(message = "Email should be valid")
    @field:NotBlank(message = "Email is required")
    val email: String
)

data class ResetPasswordRequest(
    @field:NotBlank(message = "Token is required")
    val token: String,
    
    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, message = "Password must be at least 8 characters")
    val newPassword: String
)

data class RefreshTokenRequest(
    @field:NotBlank(message = "Refresh token is required")
    val refreshToken: String
) 

// Alias for compatibility
typealias UserResponse = UserDTO 