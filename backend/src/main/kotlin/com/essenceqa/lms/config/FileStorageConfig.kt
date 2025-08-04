package com.essenceqa.lms.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.io.File
import jakarta.annotation.PostConstruct

@Configuration
class FileStorageConfig : WebMvcConfigurer {
    
    @Value("\${app.file-storage.upload-dir:/var/www/uploads}")
    private lateinit var uploadDir: String
    
    @Value("\${app.file-storage.max-file-size:10MB}")
    private lateinit var maxFileSize: String
    
    @Value("\${app.file-storage.allowed-extensions:jpg,jpeg,png,gif,pdf,doc,docx,txt}")
    private lateinit var allowedExtensions: String
    
    @PostConstruct
    fun init() {
        // Create upload directory if it doesn't exist
        val uploadPath = File(uploadDir)
        if (!uploadPath.exists()) {
            uploadPath.mkdirs()
        }
    }
    
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/uploads/**")
            .addResourceLocations("file:$uploadDir/")
    }
    
    fun getUploadDir(): String = uploadDir
    fun getMaxFileSize(): String = maxFileSize
    fun getAllowedExtensions(): List<String> = allowedExtensions.split(",").map { it.trim() }
} 