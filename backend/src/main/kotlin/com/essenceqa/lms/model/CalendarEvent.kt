package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "calendar_events")
@EntityListeners(AuditingEntityListener::class)
data class CalendarEvent(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(nullable = false)
    val title: String,
    
    val description: String? = null,
    
    @Column(name = "start_time", nullable = false)
    val startTime: String,
    
    @Column(name = "end_time", nullable = false)
    val endTime: String,
    
    @Column(nullable = false)
    val date: LocalDateTime,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val type: CalendarEventType,
    
    @Column(name = "course_id")
    val courseId: String? = null,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val course: Course? = null,
    
    @Column(name = "teacher_id")
    val teacherId: String? = null,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val teacher: Teacher? = null,
    
    val location: String? = null,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as CalendarEvent
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "CalendarEvent(id='$id', title='$title', type=$type, date=$date, startTime='$startTime')"
    }
}

enum class CalendarEventType {
    CLASS, MEETING, EVENT, HOLIDAY
}