# 🔐 Test Accounts Information

## How the App Works

### 📋 **Login Process (Based on essence-academy)**
1. **Role Selection**: Users must first select their role (Student, Parent, or Staff)
2. **Role-Based Authentication**: Different roles have different access levels
3. **Signup Limitation**: Only students can signup directly, others must be created by admin

### 🧪 **Test Accounts**

Since the database is H2 in-memory, accounts are recreated each time the backend restarts.

#### Available Accounts (after manual creation via admin):
```
Admin Account:
📧 Email: admin@lms.com
🔑 Password: admin123
🎯 Role: ADMIN
✅ Can create/edit all users

Teacher Account:
📧 Email: teacher@lms.com  
🔑 Password: teacher123
🎯 Role: TEACHER
✅ Can manage courses and students

Parent Account:
📧 Email: parent@lms.com
🔑 Password: parent123
🎯 Role: PARENT
✅ Can view children's progress

Student Account (via signup):
📧 Email: [use signup form]
🔑 Password: [choose during signup]
🎯 Role: STUDENT
✅ Can browse courses and enroll
```

#### How to Create Test Accounts:
1. **Students**: Use the signup form on the login page
2. **Others**: Admin must create them through the admin panel
3. **Quick Setup**: Run the `create-admin-user.sql` script in H2 console

### 🚀 **Current Status**
- ✅ Backend is running with H2 database
- ⚠️ Student signup works
- ⚠️ Need to create admin/teacher/parent accounts manually
- ⚠️ Frontend needs to match essence-academy UI design
- ⚠️ Role-based routing needs implementation

### 🎯 **Next Steps**
1. Update admin panel and client-side login pages to match essence-academy design
2. Implement role selection tabs
3. Create admin user in database
4. Test full authentication flow
5. Connect to real PostgreSQL database later 