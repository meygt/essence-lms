# EssenceQA Learning Management System (LMS)

A comprehensive Learning Management System built with modern technologies for educational institutions and training organizations.

## Project Structure

```
MAIN/
├── admin-panel/          # React-based admin dashboard
├── backend/              # Kotlin Spring Boot API server
├── client-side/          # React-based student/teacher interface
├── database/             # PostgreSQL database configurations
├── shared/               # Common configurations and utilities
├── docker-compose.yml    # Multi-service container orchestration
└── README.md            # This file
```

## Technology Stack

### Frontend
- **Admin Panel**: React 18, TypeScript, Material-UI
- **Client Side**: React 18, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 3.2 with Kotlin
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT
- **File Storage**: Local VPS storage
- **Payment Processing**: Square API
- **Email**: Spring Mail
- **Documentation**: OpenAPI 3 (Swagger)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database Migrations**: Flyway
- **Reverse Proxy**: Nginx
- **Monitoring**: Spring Boot Actuator

## Features

### Core Functionality
- User management (Students, Teachers, Administrators)
- Course creation and management
- Enrollment and progress tracking
- Calendar and scheduling system
- Attendance tracking
- Payment processing
- Certificate generation
- Messaging system
- File upload and management

### Admin Panel Features
- User management dashboard
- Course analytics and reporting
- Payment and financial reports
- System configuration
- User role management

### Client-Side Features
- Course browsing and enrollment
- Personal dashboard
- Calendar integration
- Progress tracking
- Certificate downloads
- Messaging with instructors
- Payment processing

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Java 17+ (for local backend development)
- PostgreSQL 15+ (if running locally)

### Environment Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd LMS/MAIN
   ```

2. **Copy environment configuration**:
   ```bash
   cp shared/.env.example shared/.env
   ```

3. **Update environment variables** in `shared/.env`:
   - Database credentials
   - JWT secret key
   - File storage configuration
   - Square payment credentials
   - Email configuration

4. **Start all services**:
   ```bash
   docker-compose up -d
   ```

5. **Verify services are running**:
   ```bash
   docker-compose ps
   ```

### Service URLs

Once all services are running:

- **Client-Side Application**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Database**: localhost:5432

## Development

### Backend Development

```bash
cd backend
./gradlew bootRun --args='--spring.profiles.active=local'
```

See [backend/README.md](backend/README.md) for detailed setup instructions.

### Frontend Development

**Admin Panel:**
```bash
cd admin-panel
npm install
npm start
```

**Client-Side:**
```bash
cd client-side
npm install
npm start
```

### Database Management

See [database/README.md](database/README.md) for database setup and migration instructions.

## Backend Implementation Status

✅ **Completed Components:**

### Entity Models
- **User**: Complete user management with roles (Student, Teacher, Admin)
- **Course**: Course creation and management with metadata
- **CourseEnrollment**: Student enrollment tracking with progress
- **CalendarEvent**: Scheduling system with recurring events
- **Attendance**: Comprehensive attendance tracking
- **Payment**: Payment processing with Square integration
- **Conversation**: Messaging system foundation
- **Message**: Individual message handling with attachments
- **Certificate**: Course completion certificates with verification

### Configuration
- **Spring Boot Setup**: Main application class with JPA auditing
- **Database Configuration**: PostgreSQL with Flyway migrations
- **Security Configuration**: JWT authentication setup
- **File Upload**: Local VPS storage
- **Docker Support**: Multi-stage Dockerfile and Docker Compose

### Database
- **Schema**: Complete database schema with all tables
- **Migrations**: Flyway migration scripts
- **Indexes**: Performance-optimized database indexes
- **Triggers**: Automatic timestamp updates

🚧 **Next Steps:**
- Repository layer implementation
- Service layer business logic
- REST API controllers
- Security configuration
- Integration tests

## API Documentation

The backend provides comprehensive API documentation:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

### Key API Endpoints

- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Courses**: `/api/courses/*`
- **Calendar**: `/api/calendar/*`
- **Payments**: `/api/payments/*`
- **Messages**: `/api/conversations/*`
- **Files**: `/api/files/*`

## Deployment

### Production Deployment

1. **Update production environment**:
   ```bash
   cp shared/.env.example shared/.env.production
   # Edit .env.production with production values
   ```

2. **Build and deploy**:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

- **VPS**: Use Hostinger VPS with PostgreSQL
- **Google Cloud**: Use Cloud Run with Cloud SQL
- **Azure**: Use Container Instances with Azure Database

## Monitoring and Logging

### Health Checks
- Backend: http://localhost:8080/actuator/health
- Database: Included in backend health check
- Redis: Included in backend health check

### Logs
- Backend logs: `docker logs lms-backend`
- Database logs: `docker logs lms-postgres`
- Frontend logs: Browser developer console

## Security

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Secure password hashing with BCrypt
- Session management with Redis

### Data Protection
- HTTPS enforcement in production
- SQL injection prevention with JPA
- XSS protection with Content Security Policy
- CORS configuration for frontend integration

## Testing

### Backend Testing
```bash
cd backend
./gradlew test
```

### Frontend Testing
```bash
cd admin-panel
npm test

cd client-side
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Style
- **Kotlin**: Follow Kotlin coding conventions
- **TypeScript/React**: Use ESLint and Prettier
- **SQL**: Use consistent formatting and naming

## Troubleshooting

### Common Issues

1. **Database connection failed**:
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify network connectivity

2. **Frontend can't connect to backend**:
   - Check backend is running on port 8080
   - Verify CORS configuration
   - Check API URL in frontend environment

3. **File upload fails**:
   - Verify file upload permissions
- Check VPS storage space
   - Ensure file size limits

4. **Payment processing fails**:
   - Check Square API credentials
   - Verify webhook configuration
   - Check payment gateway status

### Getting Help

- Check service logs: `docker-compose logs [service-name]`
- Review API documentation: http://localhost:8080/swagger-ui.html
- Check database connectivity: `docker exec -it lms-postgres psql -U lms_user -d lms_db`

## License

This project is proprietary software for EssenceQA.

## Support

For technical support and questions, please contact the development team.