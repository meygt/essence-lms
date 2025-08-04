package com.essenceqa.lms.controller

import com.essenceqa.lms.model.User
import com.essenceqa.lms.service.UserService
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5173"])
class UserController(private val userService: UserService) {

    // Get user statistics
    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    fun getUserStatistics(): ResponseEntity<Map<String, Any>> {
        return try {
            val totalUsers = userService.getTotalUsersCount()
            val activeUsers = userService.getActiveUsersCount()
            val usersByRole = userService.getUserCountsByRole()
            val recentUsers = userService.getRecentUsersCount()

            val statistics = mapOf(
                "totalUsers" to totalUsers,
                "activeUsers" to activeUsers,
                "totalStudents" to (usersByRole["STUDENT"] ?: 0),
                "totalTeachers" to (usersByRole["TEACHER"] ?: 0),
                "totalParents" to (usersByRole["PARENT"] ?: 0),
                "totalAdmins" to (usersByRole["ADMIN"] ?: 0),
                "recentUsers" to recentUsers,
                "userGrowthRate" to 0, // Calculate growth rate based on last month
                "studentGrowthRate" to 0,
                "quranStudents" to (usersByRole["STUDENT"] ?: 0), // All students for now
                "quranStudentGrowthRate" to 0,
                "certificatesIssued" to 0, // Will implement when certificate system is ready
                "certificateGrowthRate" to 0
            )

            ResponseEntity.ok(statistics)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch user statistics: ${e.message}"))
        }
    }

    // Get all users with pagination
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    fun getUsers(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(defaultValue = "firstName") sortBy: String,
        @RequestParam(defaultValue = "asc") sortDir: String,
        @RequestParam(required = false) role: String?,
        @RequestParam(required = false) search: String?
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val direction = if (sortDir.lowercase() == "desc") Sort.Direction.DESC else Sort.Direction.ASC
            val pageable = PageRequest.of(page, size, Sort.by(direction, sortBy))
            
            val usersPage = when {
                !search.isNullOrBlank() -> userService.searchUsers(search, pageable)
                !role.isNullOrBlank() -> userService.getUsersByRole(role, pageable)
                else -> userService.getAllUsers(pageable)
            }
            
            val response = mapOf(
                "content" to usersPage.content,
                "totalElements" to usersPage.totalElements,
                "totalPages" to usersPage.totalPages,
                "size" to usersPage.size,
                "number" to usersPage.number,
                "first" to usersPage.isFirst,
                "last" to usersPage.isLast,
                "numberOfElements" to usersPage.numberOfElements,
                "empty" to usersPage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch users: ${e.message}"))
        }
    }

    // Get user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#id)")
    fun getUserById(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val user = userService.getUserById(id)
            if (user != null) {
                ResponseEntity.ok(user)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch user: ${e.message}"))
        }
    }

    // Get users by role
    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    fun getUsersByRole(
        @PathVariable role: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val usersPage = userService.getUsersByRole(role, pageable)
            
            val response = mapOf(
                "content" to usersPage.content,
                "totalElements" to usersPage.totalElements,
                "totalPages" to usersPage.totalPages,
                "size" to usersPage.size,
                "number" to usersPage.number,
                "first" to usersPage.isFirst,
                "last" to usersPage.isLast,
                "numberOfElements" to usersPage.numberOfElements,
                "empty" to usersPage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch users by role: ${e.message}"))
        }
    }

    // Get active teachers
    @GetMapping("/active-teachers")
    fun getActiveTeachers(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val teachersPage = userService.getActiveTeachers(pageable)
            
            val response = mapOf(
                "content" to teachersPage.content,
                "totalElements" to teachersPage.totalElements,
                "totalPages" to teachersPage.totalPages,
                "size" to teachersPage.size,
                "number" to teachersPage.number,
                "first" to teachersPage.isFirst,
                "last" to teachersPage.isLast,
                "numberOfElements" to teachersPage.numberOfElements,
                "empty" to teachersPage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch active teachers: ${e.message}"))
        }
    }

    // Get active students
    @GetMapping("/active-students")
    fun getActiveStudents(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val studentsPage = userService.getActiveStudents(pageable)
            
            val response = mapOf(
                "content" to studentsPage.content,
                "totalElements" to studentsPage.totalElements,
                "totalPages" to studentsPage.totalPages,
                "size" to studentsPage.size,
                "number" to studentsPage.number,
                "first" to studentsPage.isFirst,
                "last" to studentsPage.isLast,
                "numberOfElements" to studentsPage.numberOfElements,
                "empty" to studentsPage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch active students: ${e.message}"))
        }
    }

    // Update user status
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    fun updateUserStatus(
        @PathVariable id: String,
        @RequestParam status: String
    ): ResponseEntity<Any> {
        return try {
            val isActive = status.lowercase() == "active"
            val updatedUser = userService.updateUserStatus(id, isActive)
            if (updatedUser != null) {
                ResponseEntity.ok(updatedUser)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(mapOf("error" to "Failed to update user status: ${e.message}"))
        }
    }
}
