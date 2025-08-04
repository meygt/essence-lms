# LMS Backend - Spring Boot Kotlin Application

This is the backend service for the Learning Management System (LMS) built with Spring Boot and Kotlin.

## Technology Stack

- **Framework**: Spring Boot 3.2
- **Language**: Kotlin 1.9
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT
- **File Storage**: AWS S3
- **Payment**: Square API
- **Documentation**: OpenAPI 3 (Swagger)
- **Build Tool**: Gradle 8.5
- **Container**: Docker

## Features

- User authentication and authorization with JWT
- Role-based access control (Admin, Teacher, Student)
- Course management and enrollment
- Calendar and scheduling system
- Attendance tracking
- Payment processing with Square
- Messaging system
- Certificate generation
- File upload to AWS S3
- Email notifications
- RESTful API with OpenAPI documentation
- Database migrations with Flyway
- Comprehensive logging and monitoring

## Prerequisites

- Java 17 or higher
- Docker and Docker Compose
- PostgreSQL 15 (if running locally)
- Redis 7 (if running locally)
- AWS Account (for S3 file storage)
- Square Developer Account (for payments)

## Quick Start with Docker

1. **Clone and navigate to the project**:
   ```bash
   cd /path/to/LMS/MAIN
   ```

2. **Copy environment file**:
   ```bash
   cp shared/.env.example shared/.env
   ```

3. **Update environment variables** in `shared/.env`:
   - Database credentials
   - JWT secret key
   - AWS credentials and S3 bucket
   - Square API credentials
   - Email configuration

4. **Start all services**:
   ```bash
   docker-compose up -d
   ```

5. **Check service health**:
   ```bash
   docker-compose ps
   curl http://localhost:8080/actuator/health
   ```

## Local Development Setup

### 1. Database Setup

**Option A: Using Docker**
```bash
docker run --name lms-postgres \
  -e POSTGRES_DB=lms_db \
  -e POSTGRES_USER=lms_user \
  -e POSTGRES_PASSWORD=lms_password \
  -p 5432:5432 \
  -d postgres:15-alpine
```

**Option B: Local PostgreSQL**
```sql
CREATE DATABASE lms_db;
CREATE USER lms_user WITH PASSWORD 'lms_password';
GRANT ALL PRIVILEGES ON DATABASE lms_db TO lms_user;
```

### 2. Redis Setup

```bash
docker run --name lms-redis -p 6379:6379 -d redis:7-alpine
```

### 3. Environment Configuration

Create `src/main/resources/application-local.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/lms_db
    username: lms_user
    password: lms_password
  redis:
    host: localhost
    port: 6379

app:
  jwt:
    secret: your-local-jwt-secret-key
  aws:
    access-key-id: your-aws-access-key
    secret-access-key: your-aws-secret-key
    s3:
      bucket: your-s3-bucket
```

### 4. Build and Run

```bash
# Build the project
./gradlew build

# Run with local profile
./gradlew bootRun --args='--spring.profiles.active=local'

# Or run the JAR
java -jar build/libs/lms-backend-*.jar --spring.profiles.active=local
```

## API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs
- **Health Check**: http://localhost:8080/actuator/health
- **Metrics**: http://localhost:8080/actuator/metrics

## API Endpoints Overview

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (Admin only)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Teacher/Admin)
- `GET /api/courses/{id}` - Get course by ID
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course
- `POST /api/courses/{id}/enroll` - Enroll in course
- `DELETE /api/courses/{id}/unenroll` - Unenroll from course

### Calendar & Events
- `GET /api/calendar/events` - Get calendar events
- `POST /api/calendar/events` - Create event (Teacher/Admin)
- `GET /api/calendar/events/{id}` - Get event by ID
- `PUT /api/calendar/events/{id}` - Update event
- `DELETE /api/calendar/events/{id}` - Delete event

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/checkin` - Check in to event
- `POST /api/attendance/checkout` - Check out from event
- `PUT /api/attendance/{id}` - Update attendance (Teacher/Admin)

### Payments
- `GET /api/payments` - Get payment history
- `POST /api/payments/process` - Process payment
- `GET /api/payments/{id}` - Get payment details
- `POST /api/payments/{id}/refund` - Process refund (Admin)

### Messages
- `GET /api/conversations` - Get conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/{id}/messages` - Get messages
- `POST /api/conversations/{id}/messages` - Send message
- `PUT /api/messages/{id}` - Edit message
- `DELETE /api/messages/{id}` - Delete message

### Certificates
- `GET /api/certificates` - Get certificates
- `POST /api/certificates/generate` - Generate certificate
- `GET /api/certificates/{id}/download` - Download certificate
- `GET /api/certificates/verify/{code}` - Verify certificate

### File Upload
- `POST /api/files/upload` - Upload file to S3
- `DELETE /api/files/{key}` - Delete file from S3

## Database Migrations

The application uses Flyway for database migrations. Migration files are located in:
- `src/main/resources/db/migration/`
- `database/migrations/` (for Docker initialization)

To create a new migration:
1. Create a new SQL file: `V{version}__Description.sql`
2. Place it in the migrations directory
3. Restart the application

## Testing

```bash
# Run all tests
./gradlew test

# Run specific test class
./gradlew test --tests "UserServiceTest"

# Run tests with coverage
./gradlew test jacocoTestReport
```

## Monitoring and Logging

### Application Logs
Logs are written to:
- Console (development)
- `logs/application.log` (production)
- Docker volume: `/app/logs`

### Health Checks
- Application: `/actuator/health`
- Database: `/actuator/health/db`
- Redis: `/actuator/health/redis`

### Metrics
- Prometheus metrics: `/actuator/prometheus`
- Application metrics: `/actuator/metrics`

## Security

### JWT Configuration
- Access token expiration: 24 hours
- Refresh token expiration: 7 days
- Algorithm: HS256

### CORS Configuration
- Allowed origins: Frontend applications
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Credentials: Enabled

### Rate Limiting
- 60 requests per minute per IP
- 1000 requests per hour per user

## Deployment

### Production Environment

1. **Update environment variables**:
   ```bash
   export SPRING_PROFILES_ACTIVE=production
   export DB_PASSWORD=secure-production-password
   export JWT_SECRET=secure-production-jwt-secret
   ```

2. **Build production image**:
   ```bash
   docker build -t lms-backend:latest .
   ```

3. **Deploy with Docker Compose**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### AWS Deployment

1. **ECS/Fargate**: Use the provided Dockerfile
2. **Elastic Beanstalk**: Deploy the JAR file
3. **EC2**: Use Docker or direct JAR deployment

## Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Check PostgreSQL is running
   - Verify connection credentials
   - Ensure database exists

2. **Redis Connection Failed**:
   - Check Redis is running
   - Verify Redis host and port

3. **JWT Token Invalid**:
   - Check JWT secret configuration
   - Verify token expiration settings

4. **File Upload Failed**:
   - Check AWS credentials
   - Verify S3 bucket permissions
   - Check file size limits

### Debug Mode

```bash
# Enable debug logging
export LOGGING_LEVEL_COM_ESSENCEQA_LMS=DEBUG

# Run with debug profile
./gradlew bootRun --args='--spring.profiles.active=debug'
```

## Contributing

1. Follow Kotlin coding conventions
2. Write unit tests for new features
3. Update API documentation
4. Run tests before committing
5. Use meaningful commit messages

## License

This project is proprietary software for EssenceQA LMS.