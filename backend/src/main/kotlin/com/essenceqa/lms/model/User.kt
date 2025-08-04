package com.essenceqa.lms.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener::class)
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String = "",
    
    @Column(unique = true, nullable = false)
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    val email: String,
    
    @Column(nullable = true)
    @JsonIgnore
    @Size(min = 8, message = "Password must be at least 8 characters")
    var password: String? = null,
    
    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is required")
    val firstName: String,
    
    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "Last name is required")
    val lastName: String,
    
    @Column(name = "phone")
    val phone: String? = null,
    
    @Column(name = "profile_image")
    val profileImage: String? = null,
    
    @Column(name = "google_id", unique = true)
    val googleId: String? = null,
    
    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider", nullable = false)
    val authProvider: AuthProvider = AuthProvider.LOCAL,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val role: UserRole,
    
    @Column(name = "is_active")
    val isActive: Boolean = true,
    
    @Column(name = "email_verified")
    val emailVerified: Boolean = false,
    
    @Column(name = "last_login_at")
    val lastLoginAt: LocalDateTime? = null,
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    val updatedAt: LocalDateTime = LocalDateTime.now(),
    
    // Relationships
    // @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    // @JsonIgnore
    // val student: Student? = null,
    
    // @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    // @JsonIgnore
    // val teacher: Teacher? = null,
    
    // @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    // @JsonIgnore
    // val parent: Parent? = null,
    
    @OneToMany(mappedBy = "sender", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val sentMessages: MutableList<Message> = mutableListOf(),
    
    @OneToMany(mappedBy = "receiver", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val receivedMessages: MutableList<Message> = mutableListOf(),
    
    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val notifications: MutableList<Notification> = mutableListOf(),
    
    @OneToMany(mappedBy = "createdBy", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val announcements: MutableList<Announcement> = mutableListOf(),
    
    @OneToMany(mappedBy = "createdBy", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonIgnore
    val personalEvents: MutableList<PersonalEvent> = mutableListOf()
) {
    val fullName: String
        get() = "$firstName $lastName"
    
    fun isAdmin(): Boolean = role == UserRole.ADMIN
    fun isTeacher(): Boolean = role == UserRole.TEACHER
    fun isStudent(): Boolean = role == UserRole.STUDENT
    fun isParent(): Boolean = role == UserRole.PARENT
    
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as User
        return id == other.id
    }
    
    override fun hashCode(): Int {
        return id.hashCode()
    }
    
    override fun toString(): String {
        return "User(id='$id', email='$email', firstName='$firstName', lastName='$lastName', role=$role, isActive=$isActive)"
    }
}

enum class UserRole {
    ADMIN, TEACHER, PARENT, STUDENT
}

enum class AuthProvider {
    LOCAL, GOOGLE
}