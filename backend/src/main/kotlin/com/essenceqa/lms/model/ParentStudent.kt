package com.essenceqa.lms.model

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(
    name = "parent_students",
    uniqueConstraints = [UniqueConstraint(columnNames = ["parent_id", "student_id"])]
)
@EntityListeners(AuditingEntityListener::class)
data class ParentStudent(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "parent_id", nullable = false)
    val parentId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", referencedColumnName = "id", insertable = false, updatable = false)
    val parent: Parent,
    
    @Column(name = "student_id", nullable = false)
    val studentId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "id", insertable = false, updatable = false)
    val student: Student,
    
    val relationship: String? = null, // e.g., "Mother", "Father", "Guardian"
    
    @Column(name = "is_primary")
    val isPrimary: Boolean = false,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as ParentStudent
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "ParentStudent(id='$id', parentId='$parentId', studentId='$studentId', relationship=$relationship, isPrimary=$isPrimary)"
    }
} 