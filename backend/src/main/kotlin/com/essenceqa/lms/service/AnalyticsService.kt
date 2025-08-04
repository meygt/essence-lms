package com.essenceqa.lms.service

import com.essenceqa.lms.model.UserRole
import com.essenceqa.lms.repository.CourseRepository
import com.essenceqa.lms.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AnalyticsService(
    private val userRepository: UserRepository,
    private val courseRepository: CourseRepository,
    private val userService: UserService,
    private val courseService: CourseService
) {

    fun getDashboardAnalytics(): Map<String, Any> {
        val totalUsers = userRepository.count()
        val totalStudents = userRepository.countByRole(UserRole.STUDENT)
        val totalTeachers = userRepository.countByRole(UserRole.TEACHER)
        val totalCourses = courseRepository.count()
        val activeCourses = courseRepository.countByIsActiveTrue()
        
        // Get courses with basic info
        val allCourses = courseRepository.findAll()
        val coursesData = allCourses.map { course ->
            mapOf(
                "id" to course.id,
                "title" to course.title,
                "students" to 0, // Will implement enrollment count later
                "revenue" to course.price.toDouble()
            )
        }

        // Get top courses (for now, just first 5)
        val topCourses = coursesData.take(5)

        // Get recent users as top students for now
        val recentUsers = userRepository.findTop5ByRoleOrderByCreatedAtDesc(UserRole.STUDENT)
        val topStudents = recentUsers.map { user ->
            mapOf(
                "id" to user.id,
                "name" to "${user.firstName} ${user.lastName}",
                "email" to user.email,
                "coursesCompleted" to 0, // Will implement when enrollment system is ready
                "totalSpent" to 0
            )
        }

        return mapOf(
            // Overview stats
            "totalRevenue" to 0, // Will implement when payment system is ready
            "totalStudents" to totalStudents,
            "totalCourses" to totalCourses,
            "totalPayments" to 0, // Will implement when payment system is ready
            "revenueGrowth" to 0,
            "studentGrowth" to 0, // Calculate based on last month
            "courseGrowth" to 0, // Calculate based on last month
            "paymentGrowth" to 0,
            
            // Admin specific
            "courses" to coursesData,
            "topCourses" to topCourses,
            "topStudents" to topStudents,
            "recentActivities" to emptyList<Map<String, Any>>(), // Will implement activity tracking
            
            // Additional metrics
            "activeStudents" to userRepository.countByRoleAndIsActiveTrue(UserRole.STUDENT),
            "activeCourses" to activeCourses,
            "avgCompletionRate" to 0, // Will implement when completion tracking is ready
            "completionGrowth" to 0,
            
            // Teacher specific (for when teacher views analytics)
            "myStudents" to 0, // Will implement based on teacher's courses
            "myCourses" to 0, // Will implement based on teacher's courses
            "totalAssignments" to 0, // Will implement when assignment system is ready
            "assignmentGrowth" to 0,
            "myCoursesList" to emptyList<Map<String, Any>>(),
            "myTopStudents" to emptyList<Map<String, Any>>(),
            "monthlyRevenue" to emptyList<Map<String, Any>>(),
            "courseEnrollments" to emptyList<Map<String, Any>>()
        )
    }

    fun getTeacherAnalytics(teacherId: String): Map<String, Any> {
        // Get teacher's courses
        val teacherCourses = courseRepository.findByTeacherId(teacherId)
        
        val myCoursesList = teacherCourses.map { course ->
            mapOf(
                "id" to course.id,
                "title" to course.title,
                "students" to 0, // Will implement enrollment count
                "completionRate" to 0, // Will implement completion tracking
                "revenue" to course.price.toDouble()
            )
        }

        return mapOf(
            "myStudents" to 0, // Total students across all teacher's courses
            "activeStudents" to 0, // Active students in teacher's courses
            "myCourses" to teacherCourses.size,
            "totalAssignments" to 0, // Will implement assignment system
            "assignmentGrowth" to 0,
            "avgCompletionRate" to 0,
            "completionGrowth" to 0,
            "myCoursesList" to myCoursesList,
            "myTopStudents" to emptyList<Map<String, Any>>(),
            "recentActivities" to emptyList<Map<String, Any>>(),
            "monthlyRevenue" to emptyList<Map<String, Any>>(),
            "courseEnrollments" to emptyList<Map<String, Any>>()
        )
    }

    fun getCourseAnalytics(courseId: String): Map<String, Any> {
        val course = courseRepository.findById(courseId).orElse(null)
        
        return if (course != null) {
            mapOf(
                "courseId" to course.id,
                "title" to course.title,
                "students" to 0, // Will implement enrollment count
                "completionRate" to 0, // Will implement completion tracking
                "averageGrade" to 0, // Will implement grading system
                "revenue" to course.price.toDouble(),
                "enrollmentTrend" to emptyList<Map<String, Any>>(),
                "completionTrend" to emptyList<Map<String, Any>>(),
                "studentPerformance" to emptyList<Map<String, Any>>()
            )
        } else {
            emptyMap()
        }
    }

    fun isCurrentTeacher(teacherId: String): Boolean {
        val authentication = SecurityContextHolder.getContext().authentication
        val currentUserEmail = authentication?.name
        val teacher = userRepository.findById(teacherId).orElse(null)
        return teacher?.email == currentUserEmail && teacher.role == UserRole.TEACHER
    }
}
