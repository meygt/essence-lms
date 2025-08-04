# LMS Database Configuration

This directory contains database-related configurations, migrations, and scripts for the Learning Management System.

## Structure

```
database/
├── migrations/           # Flyway migration scripts
│   └── V1__Create_initial_schema.sql
├── seeds/               # Sample data for development
├── scripts/             # Database utility scripts
└── README.md           # This file
```

## Database Schema

The LMS database consists of the following main tables:

### Core Tables

1. **users** - User accounts (students, teachers, admins)
2. **courses** - Course information and metadata
3. **course_enrollments** - Student course enrollments
4. **calendar_events** - Scheduled classes and events
5. **attendance** - Student attendance records
6. **payments** - Payment transactions
7. **conversations** - Message conversations
8. **messages** - Individual messages
9. **certificates** - Course completion certificates

### Relationships

- Users can have multiple roles (student, teacher, admin)
- Teachers can create and manage multiple courses
- Students can enroll in multiple courses
- Each course can have multiple calendar events
- Attendance is tracked per student per event
- Payments are linked to course enrollments
- Conversations can be direct or group-based
- Certificates are issued upon course completion

## Migration Management

### Flyway Migrations

Migrations are managed using Flyway and follow the naming convention:
```
V{version}__{description}.sql
```

Example:
- `V1__Create_initial_schema.sql`
- `V2__Add_user_preferences.sql`
- `V3__Update_course_structure.sql`

### Running Migrations

**With Docker Compose:**
```bash
docker-compose up postgres
```

**Manual Flyway:**
```bash
flyway -url=jdbc:postgresql://localhost:5432/lms_db \
       -user=lms_user \
       -password=lms_password \
       -locations=filesystem:./migrations \
       migrate
```

**Spring Boot (automatic):**
Migrations run automatically when the backend application starts.

## Database Setup

### Local Development

1. **Using Docker:**
   ```bash
   docker run --name lms-postgres \
     -e POSTGRES_DB=lms_db \
     -e POSTGRES_USER=lms_user \
     -e POSTGRES_PASSWORD=lms_password \
     -p 5432:5432 \
     -v $(pwd)/migrations:/docker-entrypoint-initdb.d \
     -d postgres:15-alpine
   ```

2. **Manual Setup:**
   ```sql
   -- Connect as postgres superuser
   CREATE DATABASE lms_db;
   CREATE USER lms_user WITH PASSWORD 'lms_password';
   GRANT ALL PRIVILEGES ON DATABASE lms_db TO lms_user;
   
   -- Connect to lms_db as lms_user
   \c lms_db lms_user
   
   -- Run migration scripts
   \i migrations/V1__Create_initial_schema.sql
   ```

### Production Setup

1. **Create database and user:**
   ```sql
   CREATE DATABASE lms_production;
   CREATE USER lms_prod_user WITH PASSWORD 'secure_production_password';
   GRANT ALL PRIVILEGES ON DATABASE lms_production TO lms_prod_user;
   ```

2. **Configure connection pooling:**
   ```yaml
   spring:
     datasource:
       hikari:
         maximum-pool-size: 20
         minimum-idle: 5
         connection-timeout: 30000
         idle-timeout: 600000
         max-lifetime: 1800000
   ```

3. **Enable SSL:**
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://your-db-host:5432/lms_production?sslmode=require
   ```

## Data Seeding

### Development Data

Create sample data for development:

```sql
-- Insert sample admin user
INSERT INTO users (email, password, first_name, last_name, role, status, email_verified)
VALUES ('admin@essenceqa.com', '$2a$10$...', 'Admin', 'User', 'ADMIN', 'ACTIVE', true);

-- Insert sample teacher
INSERT INTO users (email, password, first_name, last_name, role, status, email_verified)
VALUES ('teacher@essenceqa.com', '$2a$10$...', 'John', 'Teacher', 'TEACHER', 'ACTIVE', true);

-- Insert sample student
INSERT INTO users (email, password, first_name, last_name, role, status, email_verified)
VALUES ('student@essenceqa.com', '$2a$10$...', 'Jane', 'Student', 'STUDENT', 'ACTIVE', true);

-- Insert sample course
INSERT INTO courses (title, description, price, teacher_id, status, level)
VALUES ('Introduction to QA', 'Learn the basics of Quality Assurance', 299.99, 2, 'PUBLISHED', 'BEGINNER');
```

## Database Maintenance

### Backup

```bash
# Full database backup
pg_dump -h localhost -U lms_user -d lms_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Schema only
pg_dump -h localhost -U lms_user -d lms_db --schema-only > schema_backup.sql

# Data only
pg_dump -h localhost -U lms_user -d lms_db --data-only > data_backup.sql
```

### Restore

```bash
# Restore from backup
psql -h localhost -U lms_user -d lms_db < backup_20231201_120000.sql
```

### Performance Monitoring

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('lms_db'));

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Index Optimization

```sql
-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```

## Security

### User Permissions

```sql
-- Create read-only user for reporting
CREATE USER lms_readonly WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE lms_db TO lms_readonly;
GRANT USAGE ON SCHEMA public TO lms_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lms_readonly;

-- Create backup user
CREATE USER lms_backup WITH PASSWORD 'backup_password';
GRANT CONNECT ON DATABASE lms_db TO lms_backup;
GRANT USAGE ON SCHEMA public TO lms_backup;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lms_backup;
```

### Row Level Security (RLS)

```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY user_policy ON users
    FOR ALL TO lms_user
    USING (id = current_setting('app.current_user_id')::bigint OR 
           current_setting('app.current_user_role') = 'ADMIN');
```

## Troubleshooting

### Common Issues

1. **Connection refused:**
   ```bash
   # Check if PostgreSQL is running
   sudo systemctl status postgresql
   
   # Check port availability
   netstat -an | grep 5432
   ```

2. **Permission denied:**
   ```sql
   -- Grant necessary permissions
   GRANT ALL PRIVILEGES ON DATABASE lms_db TO lms_user;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lms_user;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO lms_user;
   ```

3. **Migration failed:**
   ```bash
   # Check Flyway schema history
   SELECT * FROM flyway_schema_history ORDER BY installed_on DESC;
   
   # Repair failed migration
   flyway repair
   ```

### Performance Issues

1. **Slow queries:**
   ```sql
   -- Enable query logging
   ALTER SYSTEM SET log_statement = 'all';
   ALTER SYSTEM SET log_min_duration_statement = 1000;
   SELECT pg_reload_conf();
   ```

2. **High CPU usage:**
   ```sql
   -- Check active connections
   SELECT count(*) FROM pg_stat_activity WHERE state = 'active';
   
   -- Check long-running queries
   SELECT pid, now() - pg_stat_activity.query_start AS duration, query
   FROM pg_stat_activity
   WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';
   ```

## Environment Variables

```bash
# Database connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lms_db
DB_USER=lms_user
DB_PASSWORD=lms_password

# Connection pool
DB_POOL_SIZE=20
DB_POOL_MIN_IDLE=5
DB_CONNECTION_TIMEOUT=30000

# SSL
DB_SSL_MODE=require
DB_SSL_CERT=/path/to/client-cert.pem
DB_SSL_KEY=/path/to/client-key.pem
DB_SSL_ROOT_CERT=/path/to/ca-cert.pem
```

## Monitoring

### Health Checks

```sql
-- Database health check
SELECT 1;

-- Check replication lag (if using replication)
SELECT 
    client_addr,
    state,
    pg_wal_lsn_diff(pg_current_wal_lsn(), sent_lsn) as send_lag,
    pg_wal_lsn_diff(sent_lsn, flush_lsn) as receive_lag,
    pg_wal_lsn_diff(flush_lsn, replay_lsn) as replay_lag
FROM pg_stat_replication;
```

### Metrics Collection

```yaml
# Prometheus PostgreSQL exporter
postgres_exporter:
  image: prometheuscommunity/postgres-exporter
  environment:
    DATA_SOURCE_NAME: "postgresql://lms_user:lms_password@postgres:5432/lms_db?sslmode=disable"
  ports:
    - "9187:9187"
```

For more information, refer to the [PostgreSQL Documentation](https://www.postgresql.org/docs/) and [Flyway Documentation](https://flywaydb.org/documentation/).