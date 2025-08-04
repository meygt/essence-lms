# Local VPS Storage Setup Guide for LMS Backend (Hostinger)

This guide will walk you through setting up local VPS storage with Hostinger for your LMS backend application, including file uploads and local authentication.

## Prerequisites

- A Hostinger VPS account
- SSH access to your VPS
- Your LMS backend project ready
- Basic knowledge of Linux commands

## Step 1: VPS Storage Setup

### 1.1 Connect to Your VPS
```bash
ssh root@essenceqa-vps-ip
# or
ssh essenceqa@essenceqa-vps-ip
```

### 1.2 Create Storage Directories
```bash
# Create main storage directory
sudo mkdir -p /var/www/lms-storage

# Create subdirectories for different file types
sudo mkdir -p /var/www/lms-storage/uploads
sudo mkdir -p /var/www/lms-storage/course-materials
sudo mkdir -p /var/www/lms-storage/profile-pictures
sudo mkdir -p /var/www/lms-storage/documents
sudo mkdir -p /var/www/lms-storage/temp

# Set proper permissions
sudo chown -R www-data:www-data /var/www/lms-storage
sudo chmod -R 755 /var/www/lms-storage
```

### 1.3 Configure Nginx for File Serving
Create or update your Nginx configuration:

```nginx
# /etc/nginx/sites-available/lms-storage
server {
    listen 80;
    server_name learn.essenceqa.org;  # Replace with your actual domain
    
    # File storage location
    location /storage/ {
        alias /var/www/lms-storage/;
        
        # Security headers
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options DENY;
        add_header X-XSS-Protection "1; mode=block";
        
        # File size limits
        client_max_body_size 100M;
        
        # Cache settings for static files
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|doc|docx)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API endpoints (proxy to your Spring Boot app)
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/lms-storage /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 2: Backend Configuration

### 2.1 Environment Variables
Create or update your `.env` file:

```env
# Local Storage Configuration
STORAGE_TYPE=LOCAL
STORAGE_BASE_PATH=/var/www/lms-storage
STORAGE_BASE_URL=http://learn.essenceqa.org/storage
MAX_FILE_SIZE=100MB
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf,doc,docx,txt,mp4,mp3

# Local Authentication
JWT_SECRET=essenceqa-super-secret-jwt-key-2024
JWT_EXPIRATION=86400000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lms_database
DB_USERNAME=lms_user
DB_PASSWORD=essenceqa-secure-db-password

# Email Configuration (Optional - can be configured later)
# SMTP_HOST=smtp.hostinger.com
# SMTP_PORT=587
# SMTP_USERNAME=admin@essenceqa.com
# SMTP_PASSWORD=essenceqa-email-password
# SMTP_TLS=true
```

### 2.2 Spring Boot Dependencies
Add these dependencies to your `build.gradle.kts`:

```kotlin
// File handling
implementation("org.springframework.boot:spring-boot-starter-web")
implementation("commons-fileupload:commons-fileupload:1.5")
implementation("commons-io:commons-io:2.11.0")

// Image processing
implementation("org.imgscalr:imgscalr-lib:4.2")

// File type detection
implementation("org.apache.tika:tika-core:2.8.0")

// Local authentication
implementation("org.springframework.boot:spring-boot-starter-security")
implementation("io.jsonwebtoken:jjwt-api:0.11.5")
implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")
```

### 2.3 File Storage Service
Create a local file storage service:

```kotlin
@Service
class LocalFileStorageService {
    
    @Value("\${storage.base-path}")
    private lateinit var basePath: String
    
    @Value("\${storage.base-url}")
    private lateinit var baseUrl: String
    
    fun uploadFile(file: MultipartFile, directory: String, userId: Long): String {
        val fileName = generateUniqueFileName(file.originalFilename)
        val targetDir = Paths.get(basePath, directory, userId.toString())
        
        // Create directory if it doesn't exist
        Files.createDirectories(targetDir)
        
        val targetFile = targetDir.resolve(fileName)
        file.transferTo(targetFile.toFile())
        
        return "$baseUrl/$directory/$userId/$fileName"
    }
    
    fun deleteFile(filePath: String): Boolean {
        return try {
            val file = Paths.get(basePath, filePath.removePrefix(baseUrl))
            Files.deleteIfExists(file)
        } catch (e: Exception) {
            false
        }
    }
    
    private fun generateUniqueFileName(originalName: String?): String {
        val extension = originalName?.substringAfterLast('.', "") ?: ""
        val timestamp = System.currentTimeMillis()
        val random = UUID.randomUUID().toString().substring(0, 8)
        return "${timestamp}_${random}.$extension"
    }
}
```

## Step 3: Security Configuration

### 3.1 File Upload Security
```kotlin
@Configuration
class FileUploadConfig {
    
    @Bean
    fun multipartConfigElement(): MultipartConfigElement {
        val factory = MultipartConfigFactory()
        factory.setMaxFileSize(DataSize.ofMegabytes(100))
        factory.setMaxRequestSize(DataSize.ofMegabytes(100))
        return factory.createMultipartConfig()
    }
}
```

### 3.2 CORS Configuration
```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig {
    
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOriginPatterns = listOf("*")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowedHeaders = listOf("*")
        configuration.allowCredentials = true
        
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}
```

## Step 4: File Upload Endpoints

```kotlin
@RestController
@RequestMapping("/api/files")
class FileController(
    private val fileStorageService: LocalFileStorageService
) {
    
    @PostMapping("/upload")
    fun uploadFile(
        @RequestParam("file") file: MultipartFile,
        @RequestParam("directory") directory: String,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Map<String, String>> {
        
        // Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(mapOf("error" to "File is empty"))
        }
        
        // Validate file type
        if (!isAllowedFileType(file)) {
            return ResponseEntity.badRequest().body(mapOf("error" to "File type not allowed"))
        }
        
        val userId = getUserId(user)
        val fileUrl = fileStorageService.uploadFile(file, directory, userId)
        
        return ResponseEntity.ok(mapOf(
            "url" to fileUrl,
            "filename" to file.originalFilename ?: "unknown"
        ))
    }
    
    @DeleteMapping("/delete")
    fun deleteFile(
        @RequestParam("filePath") filePath: String,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Map<String, String>> {
        
        val success = fileStorageService.deleteFile(filePath)
        
        return if (success) {
            ResponseEntity.ok(mapOf("message" to "File deleted successfully"))
        } else {
            ResponseEntity.badRequest().body(mapOf("error" to "Failed to delete file"))
        }
    }
    
    private fun isAllowedFileType(file: MultipartFile): Boolean {
        val allowedTypes = listOf(
            "image/jpeg", "image/png", "image/gif",
            "application/pdf", "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain", "video/mp4", "audio/mpeg"
        )
        return file.contentType in allowedTypes
    }
}
```

## Step 5: Database Setup

### 5.1 Install PostgreSQL on VPS
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE lms_database;
CREATE USER lms_user WITH PASSWORD 'essenceqa-secure-db-password';
GRANT ALL PRIVILEGES ON DATABASE lms_database TO lms_user;
\q
```

## Step 6: SSL Configuration (Optional but Recommended)

### 6.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d essenceqa.com

# Auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 7: Backup Strategy

### 7.1 Create Backup Script
```bash
#!/bin/bash
# /home/backup-lms.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup files
tar -czf $BACKUP_DIR/lms-files-$DATE.tar.gz /var/www/lms-storage

# Backup database
pg_dump -h localhost -U lms_user lms_database > $BACKUP_DIR/lms-db-$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "lms-*" -mtime +7 -delete

echo "Backup completed: $DATE"
```

Make it executable and add to cron:
```bash
chmod +x /home/backup-lms.sh
crontab -e
# Add daily backup at 2 AM:
0 2 * * * /home/backup-lms.sh
```

## Step 8: Monitoring and Logging

### 8.1 Log Configuration
Add to your `application.yml`:

```yaml
logging:
  level:
    com.essenceqa.lms: DEBUG
  file:
    name: /var/log/lms/application.log
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

## Step 9: Testing

### Test File Upload
```bash
# Test file upload
curl -X POST \
  http://essenceqa.com/api/files/upload \
  -H 'Authorization: Bearer essenceqa-jwt-token' \
  -F 'file=@test-file.jpg' \
  -F 'directory=profile-pictures'
```

### Test File Access
```bash
# Test file access
curl -I http://essenceqa.com/storage/profile-pictures/1/filename.jpg
```

## Security Best Practices

1. **File Permissions**: Ensure proper file permissions (755 for directories, 644 for files)
2. **Input Validation**: Always validate file types and sizes
3. **Path Traversal Protection**: Sanitize file paths
4. **Regular Updates**: Keep your VPS and software updated
5. **Firewall**: Configure UFW or iptables
6. **Monitoring**: Set up log monitoring and alerts

## Troubleshooting

### Common Issues

1. **Permission denied errors**:
   ```bash
   sudo chown -R www-data:www-data /var/www/lms-storage
   sudo chmod -R 755 /var/www/lms-storage
   ```

2. **Nginx 413 error (file too large)**:
   ```nginx
   client_max_body_size 100M;
   ```

3. **Database connection issues**:
   ```bash
   sudo systemctl status postgresql
   sudo -u postgres psql -c "SELECT version();"
   ```

## Cost Benefits

- **No Firebase costs**: Avoid Firebase storage and authentication fees
- **Full control**: Complete control over your data and infrastructure
- **Scalability**: Easy to scale storage as needed
- **Privacy**: Data stays on your VPS

## Optional: Email Configuration (Can be done later)

When you're ready to set up email notifications, uncomment and configure these environment variables:

```env
# Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USERNAME=admin@essenceqa.com
SMTP_PASSWORD=essenceqa-email-password
SMTP_TLS=true
```

And add this dependency to your `build.gradle.kts`:
```kotlin
// Email support (when needed)
implementation("org.springframework.boot:spring-boot-starter-mail")
```

## Next Steps

1. **Implement user authentication** with JWT tokens
2. **Add file versioning** if needed
3. **Set up email notifications** (optional)
4. **Set up automated monitoring** with tools like Prometheus
5. **Implement CDN** for better performance (optional)
6. **Add virus scanning** for uploaded files
7. **Set up log rotation** to manage disk space

---

**Remember**: Always test your configuration in a development environment before deploying to production. Keep your VPS updated and monitor resource usage regularly.