package com.essenceqa.lms.model

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "students")
@EntityListeners(AuditingEntityListener::class)
data class Student(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "user_id", unique = true, nullable = false)
    val userId: String,
    
    @Column(name = "date_of_birth", nullable = false)
    val dateOfBirth: LocalDate,
    
    @Column(nullable = false)
    val gender: String,
    
    @Column(name = "student_phone")
    val studentPhone: String? = null,
    
    @Column(name = "grade_level")
    val gradeLevel: String? = null,
    
    @Column(columnDefinition = "TEXT")
    val notes: String? = null,
    
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
        other as Student
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Student(id='$id', userId='$userId', dateOfBirth=$dateOfBirth, gender='$gender', gradeLevel=$gradeLevel)"
    }
} 