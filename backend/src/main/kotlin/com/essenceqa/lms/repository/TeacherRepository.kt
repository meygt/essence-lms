package com.essenceqa.lms.repository

import com.essenceqa.lms.model.Teacher
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface TeacherRepository : JpaRepository<Teacher, String> {
    
    fun findByUserId(userId: String): Teacher?
    
    @Query("SELECT t FROM Teacher t JOIN t.user u WHERE u.isActive = true")
    fun findActiveTeachers(): List<Teacher>
} 