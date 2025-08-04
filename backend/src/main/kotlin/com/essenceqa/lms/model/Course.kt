package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "courses")
@EntityListeners(AuditingEntityListener::class)
data class Course(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(nullable = false)
    @NotBlank(message = "Course title is required")
    val title: String,
    
    @Column(columnDefinition = "TEXT")
    val description: String? = null,
    
    @Column(name = "teacher_id", nullable = false)
    val teacherId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val teacher: Teacher,
    
    @Column(name = "start_date", nullable = false)
    val startDate: LocalDateTime,
    
    @Column(name = "end_date", nullable = false)
    val endDate: LocalDateTime,
    
    @Column(name = "meeting_link")
    val meetingLink: String? = null, // e.g., Zoom link
    
    @Column(precision = 10, scale = 2)
    @DecimalMin(value = "0.0", message = "Price must be positive")
    val price: BigDecimal = BigDecimal.ZERO,
    
    @Column(name = "max_students")
    val maxStudents: Int? = null,
    
    @Column(name = "is_active")
    val isActive: Boolean = true,
    
    @Column(name = "is_browseable")
    val isBrowseable: Boolean = false,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now(),
    
    // Relationships
    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val schedules: MutableList<CourseSchedule> = mutableListOf(),
    
    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val enrollments: MutableList<Enrollment> = mutableListOf(),
    
    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val attendance: MutableList<Attendance> = mutableListOf(),
    
    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val certificates: MutableList<Certificate> = mutableListOf(),
    
    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val calendarEvents: MutableList<CalendarEvent> = mutableListOf(),
    
    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val payments: MutableList<Payment> = mutableListOf()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Course
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Course(id='$id', title='$title', teacherId='$teacherId', startDate=$startDate, endDate=$endDate, isActive=$isActive)"
    }
}