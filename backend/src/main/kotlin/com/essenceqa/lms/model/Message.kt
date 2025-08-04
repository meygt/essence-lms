package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "messages")
@EntityListeners(AuditingEntityListener::class)
data class Message(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(name = "sender_id", nullable = false)
    val senderId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val sender: User,
    
    @Column(name = "receiver_id", nullable = false)
    val receiverId: String,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    val receiver: User,
    
    @Column(columnDefinition = "TEXT", nullable = false)
    val content: String,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status: MessageStatus = MessageStatus.SENT,
    
    @CreatedDate
    @Column(name = "sent_at", nullable = false, updatable = false)
    val sentAt: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "read_at")
    val readAt: LocalDateTime? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as Message
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Message(id='$id', senderId='$senderId', receiverId='$receiverId', status=$status, sentAt=$sentAt)"
    }
}

enum class MessageStatus {
    SENT, READ, ARCHIVED
}