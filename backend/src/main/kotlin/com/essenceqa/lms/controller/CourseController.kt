package com.essenceqa.lms.controller

import com.essenceqa.lms.model.Course
import com.essenceqa.lms.service.CourseService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5173"])
class CourseController(private val courseService: CourseService) {
    
    // Get all courses with pagination and filtering
    @GetMapping
    fun getCourses(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(defaultValue = "title") sortBy: String,
        @RequestParam(defaultValue = "asc") sortDir: String,
        @RequestParam(required = false) search: String?,
        @RequestParam(required = false) teacherId: String?,
        @RequestParam(required = false) minPrice: BigDecimal?,
        @RequestParam(required = false) maxPrice: BigDecimal?
    ): ResponseEntity<Map<String, Any>> {
        try {
            val direction = if (sortDir.lowercase() == "desc") Sort.Direction.DESC else Sort.Direction.ASC
            val pageable = PageRequest.of(page, size, Sort.by(direction, sortBy))
            
            val coursePage = when {
                !search.isNullOrBlank() -> courseService.searchCourses(search, pageable)
                !teacherId.isNullOrBlank() -> courseService.getCoursesByTeacher(teacherId, pageable)
                minPrice != null && maxPrice != null -> courseService.getCoursesByPriceRange(minPrice, maxPrice, pageable)
                else -> courseService.getAllCourses(pageable)
            }
            
            val response = mapOf(
                "content" to coursePage.content,
                "totalElements" to coursePage.totalElements,
                "totalPages" to coursePage.totalPages,
                "size" to coursePage.size,
                "number" to coursePage.number,
                "first" to coursePage.isFirst,
                "last" to coursePage.isLast,
                "numberOfElements" to coursePage.numberOfElements,
                "empty" to coursePage.isEmpty
            )
            
            return ResponseEntity.ok(response)
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch courses: ${e.message}"))
        }
    }
    
    // Get course by ID
    @GetMapping("/{id}")
    fun getCourseById(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val course = courseService.getCourseById(id)
            if (course != null) {
                ResponseEntity.ok(course)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch course: ${e.message}"))
        }
    }
    
    // Create new course
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun createCourse(@RequestBody courseRequest: CreateCourseRequest): ResponseEntity<Any> {
        return try {
            // Validate required fields
            if (courseRequest.title.isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(mapOf("error" to "Course title is required"))
            }
            
            if (courseRequest.description.isNullOrBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(mapOf("error" to "Course description is required"))
            }
            
            if (courseRequest.teacherId.isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(mapOf("error" to "Teacher selection is required"))
            }
            
            val savedCourse = courseService.createCourse(
                title = courseRequest.title,
                description = courseRequest.description,
                teacherId = courseRequest.teacherId,
                startDate = courseRequest.startDate,
                endDate = courseRequest.endDate,
                meetingLink = courseRequest.meetingLink,
                price = courseRequest.price ?: BigDecimal.ZERO,
                maxStudents = courseRequest.maxStudents,
                isBrowseable = courseRequest.isBrowseable ?: false
            )
            ResponseEntity.status(HttpStatus.CREATED).body(savedCourse)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(mapOf("error" to "Failed to create course: ${e.message}"))
        }
    }
    
    // Update course
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun updateCourse(@PathVariable id: String, @RequestBody courseRequest: UpdateCourseRequest): ResponseEntity<Any> {
        return try {
            val existingCourse = courseService.getCourseById(id)
            if (existingCourse == null) {
                return ResponseEntity.notFound().build()
            }
            
            val updatedCourse = existingCourse.copy(
                title = courseRequest.title ?: existingCourse.title,
                description = courseRequest.description ?: existingCourse.description,
                startDate = courseRequest.startDate ?: existingCourse.startDate,
                endDate = courseRequest.endDate ?: existingCourse.endDate,
                meetingLink = courseRequest.meetingLink ?: existingCourse.meetingLink,
                price = courseRequest.price ?: existingCourse.price,
                maxStudents = courseRequest.maxStudents ?: existingCourse.maxStudents,
                isBrowseable = courseRequest.isBrowseable ?: existingCourse.isBrowseable,
                updatedAt = LocalDateTime.now()
            )
            
            val savedCourse = courseService.updateCourse(id, updatedCourse)
            if (savedCourse != null) {
                ResponseEntity.ok(savedCourse)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(mapOf("error" to "Failed to update course: ${e.message}"))
        }
    }
    
    // Delete course
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun deleteCourse(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val deleted = courseService.deleteCourse(id)
            if (deleted) {
                ResponseEntity.ok(mapOf("message" to "Course deleted successfully"))
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to delete course: ${e.message}"))
        }
    }
    
    // Search courses
    @GetMapping("/search")
    fun searchCourses(
        @RequestParam search: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val coursePage = courseService.searchCourses(search, pageable)
            
            val response = mapOf(
                "content" to coursePage.content,
                "totalElements" to coursePage.totalElements,
                "totalPages" to coursePage.totalPages,
                "size" to coursePage.size,
                "number" to coursePage.number,
                "first" to coursePage.isFirst,
                "last" to coursePage.isLast,
                "numberOfElements" to coursePage.numberOfElements,
                "empty" to coursePage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to search courses: ${e.message}"))
        }
    }
    
    // Get courses by teacher
    @GetMapping("/teacher/{teacherId}")
    fun getCoursesByTeacher(
        @PathVariable teacherId: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val coursePage = courseService.getCoursesByTeacher(teacherId, pageable)
            
            val response = mapOf(
                "content" to coursePage.content,
                "totalElements" to coursePage.totalElements,
                "totalPages" to coursePage.totalPages,
                "size" to coursePage.size,
                "number" to coursePage.number,
                "first" to coursePage.isFirst,
                "last" to coursePage.isLast,
                "numberOfElements" to coursePage.numberOfElements,
                "empty" to coursePage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch teacher courses: ${e.message}"))
        }
    }
    
    // Get courses by student
    @GetMapping("/student/{studentId}")
    fun getCoursesByStudent(
        @PathVariable studentId: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val coursePage = courseService.getCoursesByStudent(studentId, pageable)
            
            val response = mapOf(
                "content" to coursePage.content,
                "totalElements" to coursePage.totalElements,
                "totalPages" to coursePage.totalPages,
                "size" to coursePage.size,
                "number" to coursePage.number,
                "first" to coursePage.isFirst,
                "last" to coursePage.isLast,
                "numberOfElements" to coursePage.numberOfElements,
                "empty" to coursePage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch student courses: ${e.message}"))
        }
    }
    
    // Get published courses
    @GetMapping("/published")
    fun getPublishedCourses(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val coursePage = courseService.getPublishedCourses(pageable)
            
            val response = mapOf(
                "content" to coursePage.content,
                "totalElements" to coursePage.totalElements,
                "totalPages" to coursePage.totalPages,
                "size" to coursePage.size,
                "number" to coursePage.number,
                "first" to coursePage.isFirst,
                "last" to coursePage.isLast,
                "numberOfElements" to coursePage.numberOfElements,
                "empty" to coursePage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch published courses: ${e.message}"))
        }
    }
    
    // Get recent courses
    @GetMapping("/recent")
    fun getRecentCourses(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val pageable = PageRequest.of(page, size)
            val coursePage = courseService.getRecentCourses(pageable)
            
            val response = mapOf(
                "content" to coursePage.content,
                "totalElements" to coursePage.totalElements,
                "totalPages" to coursePage.totalPages,
                "size" to coursePage.size,
                "number" to coursePage.number,
                "first" to coursePage.isFirst,
                "last" to coursePage.isLast,
                "numberOfElements" to coursePage.numberOfElements,
                "empty" to coursePage.isEmpty
            )
            
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch recent courses: ${e.message}"))
        }
    }
    
    // Publish course
    @PatchMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun publishCourse(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val course = courseService.publishCourse(id)
            if (course != null) {
                ResponseEntity.ok(course)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to publish course: ${e.message}"))
        }
    }
    
    // Unpublish course
    @PatchMapping("/{id}/unpublish")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun unpublishCourse(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val course = courseService.unpublishCourse(id)
            if (course != null) {
                ResponseEntity.ok(course)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to unpublish course: ${e.message}"))
        }
    }
    
    // Archive course
    @PatchMapping("/{id}/archive")
    @PreAuthorize("hasRole('ADMIN')")
    fun archiveCourse(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val course = courseService.archiveCourse(id)
            if (course != null) {
                ResponseEntity.ok(course)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to archive course: ${e.message}"))
        }
    }
    
    // Get course statistics
    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun getCourseStatistics(): ResponseEntity<Map<String, Any>> {
        return try {
            val statistics = courseService.getCourseStatistics()
            ResponseEntity.ok(statistics)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch course statistics: ${e.message}"))
        }
    }
    
    // Get course progress
    @GetMapping("/progress")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun getCourseProgress(): ResponseEntity<List<Map<String, Any>>> {
        return try {
            val progress = courseService.getCourseProgress()
            ResponseEntity.ok(progress)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(emptyList())
        }
    }
}

// Request DTOs
data class CreateCourseRequest(
    val title: String,
    val description: String?,
    val teacherId: String,
    val startDate: LocalDateTime,
    val endDate: LocalDateTime,
    val meetingLink: String?,
    val price: BigDecimal?,
    val maxStudents: Int?,
    val isBrowseable: Boolean?
)

data class UpdateCourseRequest(
    val title: String?,
    val description: String?,
    val startDate: LocalDateTime?,
    val endDate: LocalDateTime?,
    val meetingLink: String?,
    val price: BigDecimal?,
    val maxStudents: Int?,
    val isBrowseable: Boolean?
)