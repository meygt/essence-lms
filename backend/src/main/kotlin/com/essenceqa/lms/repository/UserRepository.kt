package com.essenceqa.lms.repository

import com.essenceqa.lms.model.User
import com.essenceqa.lms.model.UserRole
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Repository
interface UserRepository : JpaRepository<User, String> {
    
    fun findByEmail(email: String): User?
    
    fun findByGoogleId(googleId: String): User?
    
    fun existsByEmail(email: String): Boolean
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.lastLoginAt = :loginTime WHERE u.id = :userId")
    fun updateLastLoginAt(@Param("userId") userId: String, @Param("loginTime") loginTime: LocalDateTime)
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isActive = true")
    fun findActiveUsersByRole(@Param("role") role: String): List<User>
    
    @Query("SELECT u FROM User u WHERE u.isActive = true")
    fun findActiveUsers(): List<User>
    
    // Additional methods for analytics and user management
    fun countByIsActiveTrue(): Long
    
    fun countByRole(role: UserRole): Long
    
    fun countByRoleAndIsActiveTrue(role: UserRole): Long
    
    fun countByCreatedAtAfter(date: LocalDateTime): Long
    
    fun findByRole(role: UserRole, pageable: Pageable): Page<User>
    
    fun findByRoleAndIsActiveTrue(role: UserRole, pageable: Pageable): Page<User>
    
    fun findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        firstName: String, 
        lastName: String, 
        email: String, 
        pageable: Pageable
    ): Page<User>
    
    fun findTop5ByRoleOrderByCreatedAtDesc(role: UserRole): List<User>
}