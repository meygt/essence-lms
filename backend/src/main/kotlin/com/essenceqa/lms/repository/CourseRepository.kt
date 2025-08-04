package com.essenceqa.lms.repository

import com.essenceqa.lms.model.Course
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.math.BigDecimal
import java.time.LocalDateTime

@Repository
interface CourseRepository : JpaRepository<Course, String> {
    
    // Find courses by teacher
    fun findByTeacherId(teacherId: String, pageable: Pageable): Page<Course>
    
    // Find courses by teacher (without pagination)
    fun findByTeacherId(teacherId: String): List<Course>
    
    // Count active courses
    fun countByIsActiveTrue(): Long
    
    // Find active courses
    @Query("SELECT c FROM Course c WHERE c.isActive = true")
    fun findActiveCourses(pageable: Pageable): Page<Course>
    
    // Find browseable courses (published)
    @Query("SELECT c FROM Course c WHERE c.isBrowseable = true AND c.isActive = true")
    fun findBrowseableCourses(pageable: Pageable): Page<Course>
    
    // Search courses by title or description
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND (LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    fun searchCourses(@Param("search") search: String, pageable: Pageable): Page<Course>
    
    // Find courses by price range
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND c.price BETWEEN :minPrice AND :maxPrice")
    fun findByPriceRange(@Param("minPrice") minPrice: BigDecimal, @Param("maxPrice") maxPrice: BigDecimal, pageable: Pageable): Page<Course>
    
    // Find recent courses (created in last 30 days)
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND c.createdAt >= :since ORDER BY c.createdAt DESC")
    fun findRecentCourses(@Param("since") since: LocalDateTime, pageable: Pageable): Page<Course>
    
    // Count total courses
    fun countByIsActive(isActive: Boolean): Long
    
    // Count browseable courses
    fun countByIsBrowseableAndIsActive(isBrowseable: Boolean, isActive: Boolean): Long
    
    // Find courses by teacher and active status
    fun findByTeacherIdAndIsActive(teacherId: String, isActive: Boolean, pageable: Pageable): Page<Course>
    
    // Find courses that a student is enrolled in
    @Query("SELECT c FROM Course c JOIN c.enrollments e WHERE e.student.id = :studentId AND c.isActive = true")
    fun findCoursesByStudentId(@Param("studentId") studentId: String, pageable: Pageable): Page<Course>
    
    // Get course statistics
    @Query("SELECT COUNT(c) FROM Course c WHERE c.isActive = true")
    fun countActiveCourses(): Long
    
    @Query("SELECT COUNT(c) FROM Course c WHERE c.isBrowseable = true AND c.isActive = true")
    fun countPublishedCourses(): Long
    
    @Query("SELECT COUNT(c) FROM Course c WHERE c.isBrowseable = false AND c.isActive = true")
    fun countDraftCourses(): Long
    
    @Query("SELECT COUNT(e) FROM Enrollment e JOIN e.course c WHERE c.isActive = true")
    fun countTotalEnrollments(): Long
    
    @Query("SELECT COUNT(c) FROM Course c WHERE c.isActive = true AND c.createdAt >= :since")
    fun countRecentCourses(@Param("since") since: LocalDateTime): Long
}