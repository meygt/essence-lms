package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(
    name = "attendance",
    uniqueConstraints = [UniqueConstraint(columnNames = ["student_id", "course_id", "date"])]
)
@EntityListeners(AuditingEntityListener::class)
data class Attendance(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "student_id", nullable = false)
    val studentId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val student: Student,
    
    @Column(name = "course_id", nullable = false)
    val courseId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val course: Course,
    
    @Column(nullable = false)
    val date: LocalDateTime,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status: AttendanceStatus,
    
    val notes: String? = null,
    
    @CreatedDate
    @Column(name = "marked_at", nullable = false, updatable = false)
    val markedAt: LocalDateTime = LocalDateTime.now()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Attendance
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Attendance(id='$id', studentId='$studentId', courseId='$courseId', date=$date, status=$status)"
    }
}

enum class AttendanceStatus {
    PRESENT, ABSENT, LATE, EXCUSED
}