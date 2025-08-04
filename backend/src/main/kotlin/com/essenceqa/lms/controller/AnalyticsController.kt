package com.essenceqa.lms.controller

import com.essenceqa.lms.service.AnalyticsService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5173"])
class AnalyticsController(private val analyticsService: AnalyticsService) {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun getDashboardAnalytics(): ResponseEntity<Map<String, Any>> {
        return try {
            val analytics = analyticsService.getDashboardAnalytics()
            ResponseEntity.ok(analytics)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch analytics: ${e.message}"))
        }
    }

    @GetMapping("/teacher/{teacherId}")
    @PreAuthorize("hasRole('ADMIN') or @analyticsService.isCurrentTeacher(#teacherId)")
    fun getTeacherAnalytics(@PathVariable teacherId: String): ResponseEntity<Map<String, Any>> {
        return try {
            val analytics = analyticsService.getTeacherAnalytics(teacherId)
            ResponseEntity.ok(analytics)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch teacher analytics: ${e.message}"))
        }
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    fun getCourseAnalytics(@PathVariable courseId: String): ResponseEntity<Map<String, Any>> {
        return try {
            val analytics = analyticsService.getCourseAnalytics(courseId)
            ResponseEntity.ok(analytics)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to fetch course analytics: ${e.message}"))
        }
    }
}
