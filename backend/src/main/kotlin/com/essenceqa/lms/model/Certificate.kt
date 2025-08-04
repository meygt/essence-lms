package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "certificates")
@EntityListeners(AuditingEntityListener::class)
data class Certificate(
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
    
    @Column(name = "template_id")
    val templateId: String? = null,
    
    @Column(name = "certificate_number", unique = true, nullable = false)
    val certificateNumber: String,
    
    @CreatedDate
    @Column(name = "issued_date", nullable = false, updatable = false)
    val issuedDate: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "file_url")
    val fileUrl: String? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Certificate
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Certificate(id='$id', studentId='$studentId', courseId='$courseId', certificateNumber='$certificateNumber')"
    }
}