package com.essenceqa.lms.service

import com.essenceqa.lms.model.User
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*

@Service
class JwtService {
    
    @Value("\${app.jwt.secret}")
    private lateinit var jwtSecret: String
    
    @Value("\${app.jwt.access-token-expiration:86400000}") // 24 hours default
    private var accessTokenExpiration: Long = 86400000
    
    @Value("\${app.jwt.refresh-token-expiration:2592000000}") // 30 days default
    private var refreshTokenExpiration: Long = 2592000000
    
    private fun getSigningKey(): Key {
        return Keys.hmacShaKeyFor(jwtSecret.toByteArray())
    }
    
    fun generateToken(user: User): String {
        val claims = mutableMapOf<String, Any>()
        claims["userId"] = user.id
        claims["email"] = user.email
        claims["role"] = user.role.name
        claims["firstName"] = user.firstName
        claims["lastName"] = user.lastName
        
        return createToken(claims, user.email, accessTokenExpiration)
    }
    
    fun generateRefreshToken(user: User): String {
        val claims = mutableMapOf<String, Any>()
        claims["userId"] = user.id
        claims["type"] = "refresh"
        
        return createToken(claims, user.email, refreshTokenExpiration)
    }
    
    private fun createToken(
        claims: Map<String, Any>,
        subject: String,
        expiration: Long
    ): String {
        val now = Date()
        val expiryDate = Date(now.time + expiration)
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact()
    }
    
    fun extractUserIdFromToken(token: String): String {
        val claims = extractAllClaims(token)
        return claims["userId"] as String
    }
    
    fun extractUserIdFromRefreshToken(token: String): String {
        val claims = extractAllClaims(token)
        if (claims["type"] != "refresh") {
            throw IllegalArgumentException("Not a refresh token")
        }
        return claims["userId"] as String
    }
    
    fun extractEmailFromToken(token: String): String {
        return extractAllClaims(token).subject
    }
    
    fun extractRoleFromToken(token: String): String {
        val claims = extractAllClaims(token)
        return claims["role"] as String
    }
    
    fun isTokenValid(token: String): Boolean {
        try {
            extractAllClaims(token)
            return true
        } catch (e: Exception) {
            return false
        }
    }
    
    fun isValidRefreshToken(token: String): Boolean {
        try {
            val claims = extractAllClaims(token)
            return claims["type"] == "refresh"
        } catch (e: Exception) {
            return false
        }
    }
    
    fun isTokenExpired(token: String): Boolean {
        return try {
            val expiration = extractAllClaims(token).expiration
            expiration.before(Date())
        } catch (e: Exception) {
            true
        }
    }
    
    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }
    }
    
    private fun extractAllClaims(token: String): Claims {
        return Jwts.parser()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .body
    }

    fun getUsernameFromToken(token: String): String {
        return extractAllClaims(token).subject
    }
} 