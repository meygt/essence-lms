package com.essenceqa.lms.config

import com.essenceqa.lms.service.JwtService
import com.essenceqa.lms.repository.UserRepository
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter : OncePerRequestFilter() {

    @Autowired
    private lateinit var jwtService: JwtService

    @Autowired
    private lateinit var userRepository: UserRepository

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response)
            return
        }

        try {
            val token = authHeader.substring(7)
            
            if (jwtService.isTokenValid(token) && !jwtService.isTokenExpired(token)) {
                val email = jwtService.extractEmailFromToken(token)
                val role = jwtService.extractRoleFromToken(token)
                
                // Verify user still exists and is active
                val user = userRepository.findByEmail(email)
                if (user != null && user.isActive) {
                    val authorities = listOf(SimpleGrantedAuthority("ROLE_${role}"))
                    val authentication = UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        authorities
                    )
                    authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = authentication
                }
            }
        } catch (e: Exception) {
            // Invalid token, continue without authentication
            logger.debug("JWT token validation failed: ${e.message}")
        }

        filterChain.doFilter(request, response)
    }
}