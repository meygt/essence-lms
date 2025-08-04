package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "teachers")
@EntityListeners(AuditingEntityListener::class)
data class Teacher(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "user_id", unique = true, nullable = false)
    val userId: String,
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val user: User,
    
    @Column(columnDefinition = "TEXT")
    val bio: String? = null,
    
    @Column(name = "name_tag")
    val nameTag: String? = null, // e.g., "Arabic Teacher"
    
    @Column(name = "google_calendar_id")
    val googleCalendarId: String? = null,
    
    @Column(name = "google_calendar_token", columnDefinition = "TEXT")
    val googleCalendarToken: String? = null,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now(),
    
    // Relationships
    @OneToMany(mappedBy = "teacher", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val courses: MutableList<Course> = mutableListOf(),
    
    @OneToMany(mappedBy = "teacher", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val calendarEvents: MutableList<CalendarEvent> = mutableListOf()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Teacher
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Teacher(id='$id', userId='$userId', nameTag=$nameTag, bio=${bio?.take(50)})"
    }
} 