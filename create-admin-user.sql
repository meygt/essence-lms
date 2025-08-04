-- Create Admin User for Testing
-- Password: admin123 (BCrypt hashed)

INSERT INTO users (
    id, 
    email, 
    password, 
    first_name, 
    last_name, 
    phone, 
    role, 
    auth_provider, 
    is_active, 
    email_verified, 
    created_at, 
    updated_at
) VALUES (
    'admin-001',
    'admin@lms.com',
    '$2a$10$dXJ3SW6G7P1YlIlOIlB9j.gp8/LvJ1TM/Q1Y1QhBJjgJ5p1hKJhq.',
    'Admin',
    'User',
    '+1234567890',
    'ADMIN',
    'LOCAL',
    true,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert a test teacher
INSERT INTO users (
    id, 
    email, 
    password, 
    first_name, 
    last_name, 
    role, 
    auth_provider, 
    is_active, 
    email_verified, 
    created_at, 
    updated_at
) VALUES (
    'teacher-001',
    'teacher@lms.com',
    '$2a$10$dXJ3SW6G7P1YlIlOIlB9j.gp8/LvJ1TM/Q1Y1QhBJjgJ5p1hKJhq.',
    'Jane',
    'Smith',
    'TEACHER',
    'LOCAL',
    true,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Create teacher profile
INSERT INTO teachers (
    id,
    user_id,
    bio,
    name_tag,
    created_at,
    updated_at
) VALUES (
    'teacher-profile-001',
    'teacher-001',
    'Experienced educator with 10+ years in teaching',
    'Ms. Smith',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert a test parent
INSERT INTO users (
    id, 
    email, 
    password, 
    first_name, 
    last_name, 
    role, 
    auth_provider, 
    is_active, 
    email_verified, 
    created_at, 
    updated_at
) VALUES (
    'parent-001',
    'parent@lms.com',
    '$2a$10$dXJ3SW6G7P1YlIlOIlB9j.gp8/LvJ1TM/Q1Y1QhBJjgJ5p1hKJhq.',
    'Mary',
    'Johnson',
    'PARENT',
    'LOCAL',
    true,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Create parent profile
INSERT INTO parents (
    id,
    user_id,
    created_at,
    updated_at
) VALUES (
    'parent-profile-001',
    'parent-001',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Test Login Credentials (all passwords: admin123, teacher123, parent123):
-- Admin:   admin@lms.com   / admin123
-- Teacher: teacher@lms.com / teacher123  
-- Parent:  parent@lms.com  / parent123
-- Students: Use signup to create 