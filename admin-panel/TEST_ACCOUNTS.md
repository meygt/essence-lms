# Test Accounts Documentation

## Overview
This LMS admin panel includes built-in test accounts for easy testing of different user roles without requiring a backend or database. The test accounts are implemented using local storage and mock authentication.

## Available Test Accounts

### 1. Admin Account
- **Name:** Sarah Johnson
- **Email:** admin@test.com
- **Role:** ADMIN
- **Permissions:** Full system access including user management, course management, reports, and system settings
- **Avatar:** Professional headshot

### 2. Teacher Account
- **Name:** Michael Chen
- **Email:** teacher@test.com
- **Role:** TEACHER
- **Permissions:** Course management, student attendance, grading, and communication
- **Avatar:** Professional headshot

### 3. Student Account
- **Name:** Alex Thompson
- **Email:** student@test.com
- **Role:** STUDENT
- **Permissions:** View courses, submit assignments, view grades, and basic communication
- **Avatar:** Student photo

### 4. Parent Account
- **Name:** Emily Rodriguez
- **Email:** parent@test.com
- **Role:** PARENT
- **Permissions:** View children's progress, communicate with teachers, manage payments
- **Avatar:** Parent photo

## How to Use Test Accounts

### Method 1: Quick Login Buttons
1. Navigate to the login page
2. Scroll down to the "Quick Test Accounts" section
3. Click any of the four test account buttons:
   - "Login as Admin" (Orange)
   - "Login as Teacher" (Blue)
   - "Login as Student" (Green)
   - "Login as Parent" (Purple)
4. You will be instantly logged in as that role

### Method 2: Manual Email Entry
1. Navigate to the login page
2. Enter any email containing the role keyword:
   - Any email with "admin" → Admin account
   - Any email with "teacher" → Teacher account
   - Any email with "parent" → Parent account
   - Any other email → Student account
3. Password field can be left empty (not validated in test mode)
4. Click "Sign In"

## Features Included

- **Persistent Sessions:** Test accounts use localStorage to maintain login state
- **Role-Based Permissions:** Each account has appropriate permissions for testing
- **Realistic User Data:** Accounts include realistic names and profile pictures
- **Visual Indicators:** Different colored buttons and role-specific icons
- **Instant Access:** No need to remember credentials or set up accounts

## Technical Implementation

- **Authentication:** Mock authentication in `UserContextProvider.tsx`
- **User Data:** Defined in `context/UserContextProvider.tsx`
- **Permissions:** Based on `constants/permissions.ts`
- **UI Components:** Enhanced login page in `pages/Login.tsx`

## Benefits for Testing

1. **No Backend Required:** Works completely offline
2. **Quick Role Switching:** Test different user experiences rapidly
3. **Realistic Data:** Proper names and avatars for better testing
4. **Permission Testing:** Each role has appropriate access levels
5. **Easy Demo:** Perfect for demonstrations and presentations

This system allows developers, testers, and stakeholders to quickly explore the application from different user perspectives without complex setup procedures.