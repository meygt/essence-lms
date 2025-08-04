-- Test Accounts Creation Script for LMS
-- Run this in PgAdmin or psql to create initial test accounts

-- Insert Admin User
INSERT INTO users (id, first_name, last_name, email, password, role, auth_provider, email_verified, is_active, created_at, updated_at)
VALUES (
    'admin-001',
    'Admin',
    'User',
    'admin@lms.com',
    '$2a$10$8K1p/a0jUrQdWZeGNbYYiOAnQr4RbmJD8VQVN5pTQ5QJ8RlGYAP8W', -- password: admin123
    'ADMIN',
    'LOCAL',
    true,
    true,
    NOW(),
    NOW()
);

-- Insert Teacher User
INSERT INTO users (id, first_name, last_name, email, password, role, auth_provider, email_verified, is_active, created_at, updated_at)
VALUES (
    'teacher-001',
    'Jane',
    'Smith',
    'teacher@lms.com',
    '$2a$10$8K1p/a0jUrQdWZeGNbYYiOAnQr4RbmJD8VQVN5pTQ5QJ8RlGYAP8W', -- password: teacher123
    'TEACHER',
    'LOCAL',
    true,
    true,
    NOW(),
    NOW()
);

-- Insert Student User
INSERT INTO users (id, first_name, last_name, email, password, role, auth_provider, email_verified, is_active, created_at, updated_at)
VALUES (
    'student-001',
    'John',
    'Doe',
    'student@lms.com',
    '$2a$10$8K1p/a0jUrQdWZeGNbYYiOAnQr4RbmJD8VQVN5pTQ5QJ8RlGYAP8W', -- password: student123
    'STUDENT',
    'LOCAL',
    true,
    true,
    NOW(),
    NOW()
);

-- Insert Parent User
INSERT INTO users (id, first_name, last_name, email, password, role, auth_provider, email_verified, is_active, created_at, updated_at)
VALUES (
    'parent-001',
    'Mary',
    'Johnson',
    'parent@lms.com',
    '$2a$10$8K1p/a0jUrQdWZeGNbYYiOAnQr4RbmJD8VQVN5pTQ5QJ8RlGYAP8W', -- password: parent123
    'PARENT',
    'LOCAL',
    true,
    true,
    NOW(),
    NOW()
);

-- Insert Teacher Profile
INSERT INTO teachers (id, user_id, bio, name_tag, created_at, updated_at)
VALUES (
    'teacher-profile-001',
    'teacher-001',
    'Experienced educator with 10+ years in teaching',
    'Ms. Smith',
    NOW(),
    NOW()
);

-- Insert Student Profile
INSERT INTO students (id, user_id, date_of_birth, gender, grade_level, notes, created_at, updated_at)
VALUES (
    'student-profile-001',
    'student-001',
    '2005-01-15',
    'Male',
    '10th Grade',
    'Active student with good academic performance',
    NOW(),
    NOW()
);

-- Insert Parent Profile
INSERT INTO parents (id, user_id, created_at, updated_at)
VALUES (
    'parent-profile-001',
    'parent-001',
    NOW(),
    NOW()
);

-- Link Parent to Student
INSERT INTO parent_students (id, parent_id, student_id, relationship, is_primary, created_at)
VALUES (
    'parent-student-001',
    'parent-profile-001',
    'student-profile-001',
    'Mother',
    true,
    NOW()
);

-- Test Login Credentials:
-- Admin:   admin@lms.com   / admin123
-- Teacher: teacher@lms.com / teacher123  
-- Student: student@lms.com / student123
-- Parent:  parent@lms.com  / parent123 