package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "payments")
@EntityListeners(AuditingEntityListener::class)
data class Payment(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "student_id", nullable = false)
    val studentId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val student: Student,
    
    @Column(name = "course_id")
    val courseId: String? = null,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val course: Course? = null,
    
    @Column(precision = 10, scale = 2, nullable = false)
    val amount: BigDecimal,
    
    @Column(nullable = false)
    val currency: String = "USD",
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status: PaymentStatus,
    
    @Column(name = "payment_method")
    val paymentMethod: String? = null,
    
    @Column(name = "square_payment_id", unique = true)
    val squarePaymentId: String? = null,
    
    val description: String? = null,
    
    @Column(columnDefinition = "TEXT")
    val notes: String? = null,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "completed_at")
    val completedAt: LocalDateTime? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Payment
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Payment(id='$id', studentId='$studentId', amount=$amount, status=$status, createdAt=$createdAt)"
    }
}

enum class PaymentStatus {
    PENDING, COMPLETED, FAILED, REFUNDED
}