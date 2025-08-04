package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "personal_events")
@EntityListeners(AuditingEntityListener::class)
data class PersonalEvent(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "user_id", nullable = false)
    val userId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val createdBy: User,
    
    @Column(nullable = false)
    val title: String,
    
    val description: String? = null,
    
    @Column(name = "start_time", nullable = false)
    val startTime: String,
    
    @Column(name = "end_time", nullable = false)
    val endTime: String,
    
    @Column(nullable = false)
    val date: LocalDateTime,
    
    @Column(name = "is_all_day")
    val isAllDay: Boolean = false,
    
    val location: String? = null,
    
    @Column(name = "reminder_minutes")
    val reminderMinutes: Int? = null, // minutes before event to remind
    
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
        other as PersonalEvent
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "PersonalEvent(id='$id', userId='$userId', title='$title', date=$date, isAllDay=$isAllDay)"
    }
} 