package com.essenceqa.lms.service

import com.essenceqa.lms.model.User
import com.essenceqa.lms.model.UserRole
import com.essenceqa.lms.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class UserService(
    private val userRepository: UserRepository
) {

    fun getTotalUsersCount(): Long {
        return userRepository.count()
    }

    fun getActiveUsersCount(): Long {
        return userRepository.countByIsActiveTrue()
    }

    fun getUserCountsByRole(): Map<String, Long> {
        val roles = UserRole.values()
        return roles.associate { role ->
            role.name to userRepository.countByRole(role)
        }
    }

    fun getRecentUsersCount(): Long {
        val thirtyDaysAgo = LocalDateTime.now().minusDays(30)
        return userRepository.countByCreatedAtAfter(thirtyDaysAgo)
    }

    fun getAllUsers(pageable: Pageable): Page<User> {
        return userRepository.findAll(pageable)
    }

    fun searchUsers(search: String, pageable: Pageable): Page<User> {
        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            search, search, search, pageable
        )
    }

    fun getUsersByRole(role: String, pageable: Pageable): Page<User> {
        val userRole = UserRole.valueOf(role.uppercase())
        return userRepository.findByRole(userRole, pageable)
    }

    fun getUserById(id: String): User? {
        return userRepository.findById(id).orElse(null)
    }

    fun getActiveTeachers(pageable: Pageable): Page<User> {
        return userRepository.findByRoleAndIsActiveTrue(UserRole.TEACHER, pageable)
    }

    fun getActiveStudents(pageable: Pageable): Page<User> {
        return userRepository.findByRoleAndIsActiveTrue(UserRole.STUDENT, pageable)
    }

    fun updateUserStatus(id: String, isActive: Boolean): User? {
        val user = userRepository.findById(id).orElse(null) ?: return null
        // Since User is a JPA entity with var fields, we need to use reflection or create a custom update method
        // For now, let's use the repository's native update capabilities
        return if (user.isActive != isActive) {
            userRepository.save(
                User(
                    id = user.id,
                    email = user.email,
                    password = user.password,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    phone = user.phone,
                    profileImage = user.profileImage,
                    googleId = user.googleId,
                    authProvider = user.authProvider,
                    role = user.role,
                    isActive = isActive,
                    emailVerified = user.emailVerified,
                    lastLoginAt = user.lastLoginAt,
                    createdAt = user.createdAt,
                    updatedAt = LocalDateTime.now()
                )
            )
        } else {
            user
        }
    }

    fun isCurrentUser(userId: String): Boolean {
        val authentication = SecurityContextHolder.getContext().authentication
        val currentUserEmail = authentication?.name
        val user = userRepository.findById(userId).orElse(null)
        return user?.email == currentUserEmail
    }
}
