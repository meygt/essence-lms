package com.essenceqa.lms.repository

import com.essenceqa.lms.model.Student
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface StudentRepository : JpaRepository<Student, String> {
    
    fun findByUserId(userId: String): Student?
    
    // Simplified query without user join since we removed the user field
    @Query("SELECT s FROM Student s")
    fun findActiveStudents(): List<Student>
    
    @Query("SELECT s FROM Student s WHERE s.gradeLevel = :gradeLevel")
    fun findByGradeLevel(gradeLevel: String): List<Student>
} 