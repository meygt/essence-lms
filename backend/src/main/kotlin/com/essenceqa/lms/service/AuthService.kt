package com.essenceqa.lms.service

import com.essenceqa.lms.dto.*
import com.essenceqa.lms.model.*
import com.essenceqa.lms.repository.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import java.util.*

@Service
class AuthService {
    
    @Autowired
    private lateinit var userRepository: UserRepository
    
    @Autowired
    private lateinit var studentRepository: StudentRepository
    
    @Autowired
    private lateinit var teacherRepository: TeacherRepository
    
    @Autowired
    private lateinit var parentRepository: ParentRepository
    
    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder
    
    @Autowired
    private lateinit var jwtService: JwtService
    
    fun login(request: LoginRequest): AuthResponse {
        try {
            // Find user by email
            val user = userRepository.findByEmail(request.email.lowercase())
                ?: return AuthResponse(
                    success = false,
                    message = "Invalid email or password"
                )
            
            // Check if user is active
            if (!user.isActive) {
                return AuthResponse(
                    success = false,
                    message = "Your account has been deactivated. Please contact support."
                )
            }
            
            // Verify password
            if (user.password == null || !passwordEncoder.matches(request.password, user.password)) {
                return AuthResponse(
                    success = false,
                    message = "Invalid email or password"
                )
            }
            
            // Update last login time
            userRepository.updateLastLoginAt(user.id, LocalDateTime.now())
            
            // Generate tokens
            val token = jwtService.generateToken(user)
            val refreshToken = jwtService.generateRefreshToken(user)
            
            // Create user DTO with role-specific data
            val userDTO = createUserDTO(user)
            
            // Determine redirect URL based on role
            val redirectUrl = when (user.role) {
                UserRole.ADMIN -> "/dashboard/admin"
                UserRole.TEACHER -> "/dashboard/teacher"
                UserRole.PARENT -> "/dashboard/parent"
                UserRole.STUDENT -> "/dashboard/student"
            }
            
            return AuthResponse(
                success = true,
                message = "Login successful",
                user = userDTO,
                token = token,
                refreshToken = refreshToken,
                redirectUrl = redirectUrl
            )
            
        } catch (e: Exception) {
            return AuthResponse(
                success = false,
                message = "An error occurred during login: ${e.message}"
            )
        }
    }
    
    @Transactional
    fun signup(request: SignupRequest): AuthResponse {
        try {
            // Only allow student signups via public endpoint
            if (request.role != UserRole.STUDENT) {
                return AuthResponse(
                    success = false,
                    message = "Only student accounts can be created through signup"
                )
            }
            
            // Check if user already exists
            if (userRepository.findByEmail(request.email.lowercase()) != null) {
                return AuthResponse(
                    success = false,
                    message = "User with this email already exists"
                )
            }
            
            // Validate student-specific fields
            if (request.dateOfBirth == null || request.gender == null) {
                return AuthResponse(
                    success = false,
                    message = "Date of birth and gender are required for students"
                )
            }

            if (!listOf("Male", "Female").contains(request.gender)) {
                return AuthResponse(
                    success = false,
                    message = "Invalid gender selection"
                )
            }
            
            // Create user
            val user = User(
                email = request.email.lowercase(),
                password = passwordEncoder.encode(request.password),
                firstName = request.firstName,
                lastName = request.lastName,
                phone = request.phone,
                role = UserRole.STUDENT,
                isActive = true,
                emailVerified = false
            )
            
            val savedUser = userRepository.save(user)
            
            // Create student record (simplified to fix transaction rollback)
            val student = Student(
                userId = savedUser.id,
                dateOfBirth = request.dateOfBirth!!,
                gender = request.gender!!,
                studentPhone = request.phone,
                gradeLevel = "1" // Default grade level
            )
            
            studentRepository.save(student)
            
            // Generate tokens
            val token = jwtService.generateToken(savedUser)
            val refreshToken = jwtService.generateRefreshToken(savedUser)
            
            val userDTO = createUserDTO(savedUser)
            
            return AuthResponse(
                success = true,
                message = "Account created successfully",
                user = userDTO,
                token = token,
                refreshToken = refreshToken,
                redirectUrl = "/dashboard/student"
            )
            
        } catch (e: Exception) {
            return AuthResponse(
                success = false,
                message = "Failed to create account: ${e.message}"
            )
        }
    }
    
    fun refreshToken(request: RefreshTokenRequest): AuthResponse {
        try {
            if (!jwtService.isValidRefreshToken(request.refreshToken)) {
                return AuthResponse(
                    success = false,
                    message = "Invalid refresh token"
                )
            }
            
            val userId = jwtService.extractUserIdFromRefreshToken(request.refreshToken)
            val user = userRepository.findById(userId).orElse(null)
                ?: return AuthResponse(
                    success = false,
                    message = "User not found"
                )
            
            if (!user.isActive) {
                return AuthResponse(
                    success = false,
                    message = "Account is deactivated"
                )
            }
            
            val newToken = jwtService.generateToken(user)
            val newRefreshToken = jwtService.generateRefreshToken(user)
            
            return AuthResponse(
                success = true,
                message = "Token refreshed successfully",
                user = createUserDTO(user),
                token = newToken,
                refreshToken = newRefreshToken
            )
        } catch (e: Exception) {
            return AuthResponse(
                success = false,
                message = "Failed to refresh token: ${e.message}"
            )
        }
    }

    private fun createUserDTO(user: User): UserDTO {
        return UserDTO(
            id = user.id,
            email = user.email,
            firstName = user.firstName,
            lastName = user.lastName,
            phone = user.phone,
            role = user.role,
            isActive = user.isActive,
            emailVerified = user.emailVerified,
            profileImage = user.profileImage,
            // Temporarily simplified until relationships are fixed
            student = null,
            teacher = null,
            parent = null
        )
    }
    
    fun logout(token: String) {
        // In a JWT system, logout is typically handled client-side by discarding the token
        // For enhanced security, you could maintain a token blacklist
        // For now, this is a placeholder
    }
    
    fun getCurrentUser(token: String): UserDTO {
        if (!jwtService.validateToken(token)) {
            throw IllegalArgumentException("Invalid token")
        }
        
        val email = jwtService.getUsernameFromToken(token)
        val user = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("User not found")
            
        return createUserDTO(user)
    }
    
    fun forgotPassword(email: String) {
        val user = userRepository.findByEmail(email)
            ?: throw IllegalArgumentException("User not found")
        
        // TODO: Implement password reset email functionality
        // For now, this is a placeholder
    }
    
    fun resetPassword(token: String, newPassword: String) {
        // TODO: Implement password reset functionality using the reset token
        // For now, this is a placeholder
        throw UnsupportedOperationException("Password reset not implemented yet")
    }
} 