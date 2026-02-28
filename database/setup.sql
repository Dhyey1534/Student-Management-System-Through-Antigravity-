-- ============================================================
-- Student Management System - Database Setup Script
-- ============================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS student_management_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 2. Use the database
USE student_management_db;

-- 3. (Optional) Create a dedicated user
-- CREATE USER IF NOT EXISTS 'sms_user'@'localhost' IDENTIFIED BY 'sms_password';
-- GRANT ALL PRIVILEGES ON student_management_db.* TO 'sms_user'@'localhost';
-- FLUSH PRIVILEGES;

-- 4. The `students` table is auto-created by Hibernate (ddl-auto=update)
--    If you prefer to create it manually, use the script below:

CREATE TABLE IF NOT EXISTS students (
    id           BIGINT          NOT NULL AUTO_INCREMENT,
    first_name   VARCHAR(100)    NOT NULL,
    last_name    VARCHAR(100)    NOT NULL,
    email        VARCHAR(255)    NOT NULL UNIQUE,
    course       VARCHAR(150)    NOT NULL,
    phone_number VARCHAR(20)     NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Insert sample data
INSERT INTO students (first_name, last_name, email, course, phone_number) VALUES
    ('Alice',   'Johnson',  'alice.johnson@example.com',  'Computer Science',     '+1 555-0101'),
    ('Bob',     'Smith',    'bob.smith@example.com',      'Data Science',         '+1 555-0102'),
    ('Carol',   'Williams', 'carol.w@example.com',        'Software Engineering', '+91 9876543210'),
    ('David',   'Brown',    'david.brown@example.com',    'Cybersecurity',        '+44 7700 900321'),
    ('Eve',     'Davis',    'eve.davis@example.com',      'Information Technology','+1 555-0105');

-- 6. Verify
SELECT * FROM students;
