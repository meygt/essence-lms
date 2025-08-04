package com.essenceqa.lms.controller

import com.essenceqa.lms.model.User
import com.essenceqa.lms.model.UserRole
import com.essenceqa.lms.model.AuthProvider
import com.essenceqa.lms.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/test")
class TestController {
    
    @Autowired
    private lateinit var userRepository: UserRepository
    
    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder
    
    @PostMapping("/create-admin")
    fun createTestAdmin(): Map<String, Any> {
        return try {
            val admin = User(
                email = "admin@lms.com",
                password = passwordEncoder.encode("admin123"),
                firstName = "Admin",
                lastName = "User",
                role = UserRole.ADMIN,
                authProvider = AuthProvider.LOCAL,
                isActive = true,
                emailVerified = true,
                sentMessages = mutableListOf(),
                receivedMessages = mutableListOf(),
                notifications = mutableListOf(),
                announcements = mutableListOf(),
                personalEvents = mutableListOf()
            )
            
            val saved = userRepository.save(admin)
            mapOf("success" to true, "message" to "Admin created", "id" to saved.id)
        } catch (e: Exception) {
            mapOf("success" to false, "message" to (e.message ?: "Unknown error"))
        }
    }
    
    @PostMapping("/create-teacher")
    fun createTestTeacher(): Map<String, Any> {
        return try {
            val teacher = User(
                email = "teacher@lms.com",
                password = passwordEncoder.encode("teacher123"),
                firstName = "Jane",
                lastName = "Smith",
                role = UserRole.TEACHER,
                authProvider = AuthProvider.LOCAL,
                isActive = true,
                emailVerified = true,
                sentMessages = mutableListOf(),
                receivedMessages = mutableListOf(),
                notifications = mutableListOf(),
                announcements = mutableListOf(),
                personalEvents = mutableListOf()
            )
            
            val saved = userRepository.save(teacher)
            mapOf("success" to true, "message" to "Teacher created", "id" to saved.id)
        } catch (e: Exception) {
            mapOf("success" to false, "message" to (e.message ?: "Unknown error"))
        }
    }
    
    @PostMapping("/create-student")
    fun createTestStudent(): Map<String, Any> {
        return try {
            val email = "student@lms.com"
            
            // Check if user already exists
            val existingUser = userRepository.findByEmail(email)
            if (existingUser != null) {
                return mapOf(
                    "success" to true,
                    "message" to "Test student account already exists",
                    "credentials" to mapOf(
                        "email" to email,
                        "password" to "student123",
                        "role" to "STUDENT"
                    )
                )
            }
            
            // Create new user without explicitly setting MutableList fields
            val user = User(
                email = email,
                password = passwordEncoder.encode("student123"),
                firstName = "Test",
                lastName = "Student",
                role = UserRole.STUDENT,
                authProvider = AuthProvider.LOCAL,
                isActive = true,
                emailVerified = true
            )
            
            val savedUser = userRepository.save(user)
            
            mapOf(
                "success" to true,
                "message" to "Test student account created successfully",
                "credentials" to mapOf(
                    "email" to email,
                    "password" to "student123",
                    "role" to "STUDENT"
                ),
                "userId" to savedUser.id
            )
        } catch (e: Exception) {
            mapOf(
                "success" to false,
                "message" to "Error creating test student: ${e.message}"
            )
        }
    }
    
    @GetMapping("/simple")
    fun simpleTest(): Map<String, Any> {
        return mapOf("status" to "working", "message" to "Test endpoint is functional")
    }
    
    @PostMapping("/create-parent")
    fun createTestParent(): Map<String, Any> {
        return try {
            val parent = User(
                email = "parent@lms.com",
                password = passwordEncoder.encode("parent123"),
                firstName = "Mary",
                lastName = "Parent",
                role = UserRole.PARENT,
                authProvider = AuthProvider.LOCAL,
                isActive = true,
                emailVerified = true,
                sentMessages = mutableListOf(),
                receivedMessages = mutableListOf(),
                notifications = mutableListOf(),
                announcements = mutableListOf(),
                personalEvents = mutableListOf()
            )
            
            val saved = userRepository.save(parent)
            mapOf("success" to true, "message" to "Parent created", "id" to saved.id)
        } catch (e: Exception) {
            mapOf("success" to false, "message" to (e.message ?: "Unknown error"))
        }
    }
    
    @GetMapping("/users")
    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }
}