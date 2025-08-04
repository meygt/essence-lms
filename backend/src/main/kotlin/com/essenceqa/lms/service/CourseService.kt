package com.essenceqa.lms.service

import com.essenceqa.lms.model.Course
import com.essenceqa.lms.model.Teacher
import com.essenceqa.lms.repository.CourseRepository
import com.essenceqa.lms.repository.TeacherRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
@Transactional
class CourseService(
    private val courseRepository: CourseRepository,
    private val teacherRepository: TeacherRepository
) {
    
    // Get all courses with pagination
    fun getAllCourses(pageable: Pageable): Page<Course> {
        return courseRepository.findActiveCourses(pageable)
    }
    
    // Get course by ID
    fun getCourseById(id: String): Course? {
        return courseRepository.findById(id).orElse(null)
    }
    
    // Create new course
    fun createCourse(course: Course): Course {
        return courseRepository.save(course)
    }
    
    // Create new course with parameters
    fun createCourse(
        title: String,
        description: String?,
        teacherId: String,
        startDate: LocalDateTime,
        endDate: LocalDateTime,
        meetingLink: String?,
        price: BigDecimal,
        maxStudents: Int?,
        isBrowseable: Boolean
    ): Course {
        val teacher = teacherRepository.findById(teacherId)
            .orElseThrow { IllegalArgumentException("Teacher not found with id: $teacherId") }
        
        val course = Course(
            title = title,
            description = description,
            teacherId = teacherId,
            teacher = teacher,
            startDate = startDate,
            endDate = endDate,
            meetingLink = meetingLink,
            price = price,
            maxStudents = maxStudents,
            isActive = true,
            isBrowseable = isBrowseable
        )
        
        return courseRepository.save(course)
    }
    
    // Update course
    fun updateCourse(id: String, updatedCourse: Course): Course? {
        return if (courseRepository.existsById(id)) {
            courseRepository.save(updatedCourse.copy(id = id))
        } else {
            null
        }
    }
    
    // Delete course (soft delete by setting isActive to false)
    fun deleteCourse(id: String): Boolean {
        return courseRepository.findById(id).map { course ->
            courseRepository.save(course.copy(isActive = false))
            true
        }.orElse(false)
    }
    
    // Search courses
    fun searchCourses(search: String, pageable: Pageable): Page<Course> {
        return if (search.isBlank()) {
            courseRepository.findActiveCourses(pageable)
        } else {
            courseRepository.searchCourses(search, pageable)
        }
    }
    
    // Get courses by teacher
    fun getCoursesByTeacher(teacherId: String, pageable: Pageable): Page<Course> {
        return courseRepository.findByTeacherIdAndIsActive(teacherId, true, pageable)
    }
    
    // Get courses by student (enrolled courses)
    fun getCoursesByStudent(studentId: String, pageable: Pageable): Page<Course> {
        return courseRepository.findCoursesByStudentId(studentId, pageable)
    }
    
    // Get published courses
    fun getPublishedCourses(pageable: Pageable): Page<Course> {
        return courseRepository.findBrowseableCourses(pageable)
    }
    
    // Get recent courses (last 30 days)
    fun getRecentCourses(pageable: Pageable): Page<Course> {
        val thirtyDaysAgo = LocalDateTime.now().minusDays(30)
        return courseRepository.findRecentCourses(thirtyDaysAgo, pageable)
    }
    
    // Get courses by price range
    fun getCoursesByPriceRange(minPrice: BigDecimal, maxPrice: BigDecimal, pageable: Pageable): Page<Course> {
        return courseRepository.findByPriceRange(minPrice, maxPrice, pageable)
    }
    
    // Publish course
    fun publishCourse(id: String): Course? {
        return courseRepository.findById(id).map { course ->
            courseRepository.save(course.copy(isBrowseable = true))
        }.orElse(null)
    }
    
    // Unpublish course
    fun unpublishCourse(id: String): Course? {
        return courseRepository.findById(id).map { course ->
            courseRepository.save(course.copy(isBrowseable = false))
        }.orElse(null)
    }
    
    // Archive course
    fun archiveCourse(id: String): Course? {
        return courseRepository.findById(id).map { course ->
            courseRepository.save(course.copy(isActive = false))
        }.orElse(null)
    }
    
    // Get course statistics
    fun getCourseStatistics(): Map<String, Any> {
        val totalCourses = courseRepository.countActiveCourses()
        val publishedCourses = courseRepository.countPublishedCourses()
        val draftCourses = courseRepository.countDraftCourses()
        val totalEnrollments = courseRepository.countTotalEnrollments()
        val thirtyDaysAgo = LocalDateTime.now().minusDays(30)
        val recentCourses = courseRepository.countRecentCourses(thirtyDaysAgo)
        
        return mapOf(
            "totalCourses" to totalCourses,
            "activeCourses" to totalCourses,
            "publishedCourses" to publishedCourses,
            "draftCourses" to draftCourses,
            "totalEnrollments" to totalEnrollments,
            "averageCompletionRate" to 0.0, // TODO: Calculate from actual data
            "averageRating" to 0.0, // TODO: Calculate from actual data
            "recentCourses" to recentCourses,
            "courseGrowthRate" to 0.0 // TODO: Calculate growth rate
        )
    }
    
    // Get course progress (placeholder for now)
    fun getCourseProgress(): List<Map<String, Any>> {
        // TODO: Implement actual course progress calculation
        return emptyList()
    }
}