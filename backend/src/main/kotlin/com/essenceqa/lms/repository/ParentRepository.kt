package com.essenceqa.lms.repository

import com.essenceqa.lms.model.Parent
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ParentRepository : JpaRepository<Parent, String> {
    
    fun findByUserId(userId: String): Parent?
    
    @Query("SELECT p FROM Parent p JOIN p.user u WHERE u.isActive = true")
    fun findActiveParents(): List<Parent>
} 