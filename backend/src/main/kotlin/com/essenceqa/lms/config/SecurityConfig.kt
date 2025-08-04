package com.essenceqa.lms.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Autowired
    private lateinit var jwtAuthenticationFilter: JwtAuthenticationFilter

    @Value("\${app.cors.allowed-origins}")
    private lateinit var allowedOrigins: String

    @Value("\${app.cors.allowed-methods}")
    private lateinit var allowedMethods: String

    @Value("\${app.cors.allowed-headers}")
    private lateinit var allowedHeaders: String

    @Value("\${app.cors.allow-credentials}")
    private var allowCredentials: Boolean = true

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .cors { it.configurationSource(corsConfigurationSource()) }
            .csrf { it.disable() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authorizeHttpRequests { authz ->
                authz
                    // Public endpoints
                    .requestMatchers(
                        "/auth/**",
                        "/test/**",
                        "/actuator/health",
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html"
                    ).permitAll()
                    // File upload endpoints (you may want to secure these)
                    .requestMatchers("/files/upload/**").permitAll()
                    // Admin endpoints
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    // Teacher endpoints
                    .requestMatchers("/teacher/**").hasAnyRole("ADMIN", "TEACHER")
                    // Student endpoints
                    .requestMatchers("/student/**").hasAnyRole("ADMIN", "TEACHER", "STUDENT")
                    // All other endpoints require authentication
                    .anyRequest().authenticated()
            }
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
            .httpBasic { it.disable() }

        return http.build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        
        // Parse allowed origins
        val origins = allowedOrigins.split(",").map { it.trim() }
        configuration.allowedOrigins = origins
        
        // Parse allowed methods
        val methods = allowedMethods.split(",").map { it.trim() }
        configuration.allowedMethods = methods
        
        // Parse allowed headers
        if (allowedHeaders == "*") {
            configuration.allowedHeaders = listOf("*")
        } else {
            val headers = allowedHeaders.split(",").map { it.trim() }
            configuration.allowedHeaders = headers
        }
        
        configuration.allowCredentials = allowCredentials
        configuration.maxAge = 3600L // 1 hour
        
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        
        return source
    }
}