package com.essenceqa.lms.model

import jakarta.persistence.*
import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotNull
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(
    name = "course_enrollments",
    uniqueConstraints = [UniqueConstraint(columnNames = ["student_id", "course_id"])]
)
@EntityListeners(AuditingEntityListener::class)
data class CourseEnrollment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @NotNull(message = "Student is required")
    val student: User,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @NotNull(message = "Course is required")
    val course: Course,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status: EnrollmentStatus = EnrollmentStatus.PENDING,
    
    @Column(name = "enrollment_date", nullable = false)
    val enrollmentDate: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "completion_date")
    val completionDate: LocalDateTime? = null,
    
    @Column(name = "progress_percentage", precision = 5, scale = 2)
    @DecimalMin(value = "0.0", message = "Progress must be at least 0%")
    @DecimalMax(value = "100.0", message = "Progress cannot exceed 100%")
    val progressPercentage: BigDecimal = BigDecimal.ZERO,
    
    @Column(name = "final_grade", precision = 5, scale = 2)
    @DecimalMin(value = "0.0", message = "Grade must be at least 0")
    @DecimalMax(value = "100.0", message = "Grade cannot exceed 100")
    val finalGrade: BigDecimal? = null,
    
    @Column(columnDefinition = "TEXT")
    val notes: String? = null,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now()
) {
    val isActive: Boolean
        get() = status == EnrollmentStatus.ACTIVE
    
    val isCompleted: Boolean
        get() = status == EnrollmentStatus.COMPLETED
    
    val isPending: Boolean
        get() = status == EnrollmentStatus.PENDING
    
    val isDropped: Boolean
        get() = status == EnrollmentStatus.DROPPED
    
    fun canComplete(): Boolean {
        return isActive && progressPercentage >= BigDecimal("80.0")
    }
    
    fun getDurationInDays(): Long? {
        return if (completionDate != null) {
            java.time.Duration.between(enrollmentDate, completionDate).toDays()
        } else {
            java.time.Duration.between(enrollmentDate, LocalDateTime.now()).toDays()
        }
    }
    
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as CourseEnrollment
        return id == other.id
    }
    
    override fun hashCode(): Int {
        return id.hashCode()
    }
    
    override fun toString(): String {
        return "CourseEnrollment(id=$id, studentId=${student.id}, courseId=${course.id}, status=$status, progress=$progressPercentage%)"
    }
}

enum class EnrollmentStatus {
    PENDING,
    ACTIVE,
    COMPLETED,
    DROPPED,
    SUSPENDED
}