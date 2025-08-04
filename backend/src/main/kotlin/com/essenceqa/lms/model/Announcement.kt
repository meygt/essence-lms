package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "announcements")
@EntityListeners(AuditingEntityListener::class)
data class Announcement(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(nullable = false)
    val title: String,
    
    @Column(columnDefinition = "TEXT", nullable = false)
    val content: String,
    
    @Column(name = "target_groups", nullable = false)
    val targetGroups: String, // Comma-separated: TEACHER,PARENT,STUDENT
    
    @Column(name = "scheduled_for", nullable = false)
    val scheduledFor: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "created_by_id", nullable = false)
    val createdById: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val createdBy: User,
    
    @Column(name = "is_active")
    val isActive: Boolean = true,
    
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
        other as Announcement
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Announcement(id='$id', title='$title', targetGroups='$targetGroups', createdById='$createdById', isActive=$isActive)"
    }
} 