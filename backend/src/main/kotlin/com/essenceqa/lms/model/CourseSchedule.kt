package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "course_schedules")
@EntityListeners(AuditingEntityListener::class)
data class CourseSchedule(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "course_id", nullable = false)
    val courseId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val course: Course,
    
    @Column(name = "day_of_week", nullable = false)
    val dayOfWeek: Int, // 0-6 (Sunday-Saturday)
    
    @Column(name = "start_time", nullable = false)
    val startTime: String, // HH:mm format
    
    @Column(name = "end_time", nullable = false)
    val endTime: String, // HH:mm format
    
    @Column(nullable = false)
    val timezone: String = "America/Chicago",
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as CourseSchedule
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "CourseSchedule(id='$id', courseId='$courseId', dayOfWeek=$dayOfWeek, startTime='$startTime', endTime='$endTime')"
    }
} 