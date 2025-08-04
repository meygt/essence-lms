package com.essenceqa.lms.controller

import com.essenceqa.lms.dto.*
import com.essenceqa.lms.service.AuthService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = ["\${app.cors.allowed-origins}"])
class AuthController {

    @Autowired
    private lateinit var authService: AuthService

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        return try {
            val response = authService.login(request)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(AuthResponse(success = false, message = e.message ?: "Authentication failed"))
        }
    }

    @PostMapping("/signup")
    fun signup(@Valid @RequestBody request: SignupRequest): ResponseEntity<AuthResponse> {
        return try {
            val response = authService.signup(request)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(AuthResponse(success = false, message = e.message ?: "Signup failed"))
        }
    }

    @PostMapping("/refresh")
    fun refreshToken(@RequestBody request: RefreshTokenRequest): ResponseEntity<AuthResponse> {
        return try {
            val response = authService.refreshToken(request)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(AuthResponse(success = false, message = e.message ?: "Token refresh failed"))
        }
    }

    @PostMapping("/logout")
    fun logout(@RequestHeader("Authorization") authHeader: String): ResponseEntity<AuthResponse> {
        return try {
            val token = authHeader.removePrefix("Bearer ")
            authService.logout(token)
            ResponseEntity.ok(AuthResponse(success = true, message = "Logged out successfully"))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(AuthResponse(success = false, message = e.message ?: "Logout failed"))
        }
    }

    @GetMapping("/me")
    fun getCurrentUser(@RequestHeader("Authorization") authHeader: String): ResponseEntity<UserDTO> {
        return try {
            val token = authHeader.removePrefix("Bearer ")
            val user = authService.getCurrentUser(token)
            ResponseEntity.ok(user)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }

    @PostMapping("/forgot-password")
    fun forgotPassword(@RequestBody request: ForgotPasswordRequest): ResponseEntity<AuthResponse> {
        return try {
            authService.forgotPassword(request.email)
            ResponseEntity.ok(AuthResponse(success = true, message = "Password reset email sent"))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(AuthResponse(success = false, message = e.message ?: "Failed to send reset email"))
        }
    }

    @PostMapping("/reset-password")
    fun resetPassword(@RequestBody request: ResetPasswordRequest): ResponseEntity<AuthResponse> {
        return try {
            authService.resetPassword(request.token, request.newPassword)
            ResponseEntity.ok(AuthResponse(success = true, message = "Password reset successfully"))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(AuthResponse(success = false, message = e.message ?: "Password reset failed"))
        }
    }
}

data class GoogleAuthRequest(
    val idToken: String
)

// Compatibility classes for existing Google auth - will be refactored later
sealed class AuthResult {
    data class Success(val user: Any) : AuthResult()
    data class Error(val message: String) : AuthResult()
}

data class UserResponse(
    val id: String,
    val email: String,
    val firstName: String,
    val lastName: String
) {
    companion object {
        fun fromUser(user: Any): UserResponse {
            // Placeholder implementation
            return UserResponse("", "", "", "")
        }
    }
}