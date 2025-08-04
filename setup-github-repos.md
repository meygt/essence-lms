# 🚀 GitHub Repository Setup

## Repository Structure
The essenceqa GitHub account has 3 repositories:
- **lms-backend** - Spring Boot API
- **lms-admin-panel** - React/Vite Admin Interface  
- **lms-client-side** - Next.js Main App

## 📋 Steps to Push Changes

### 1. Initialize Git in Each Project

```bash
# Backend
cd MAIN/backend
git init
git remote add origin https://github.com/essenceqa/lms-backend.git

# Admin Panel  
cd ../admin-panel
git init
git remote add origin https://github.com/essenceqa/lms-admin-panel.git

# Client Side
cd ../client-side  
git init
git remote add origin https://github.com/essenceqa/lms-client-side.git
```

### 2. Create .gitignore Files

**Backend (.gitignore):**
```
build/
.gradle/
.idea/
*.log
application-*.yml
!application.yml
```

**Admin Panel (.gitignore):**
```
node_modules/
dist/
.env.local
.env.production
```

**Client Side (.gitignore):**
```
node_modules/
.next/
.env.local
.env.production
```

### 3. Commit and Push

```bash
# For each repository:
git add .
git commit -m "Initial commit: Complete LMS application"
git branch -M main
git push -u origin main
```

## 🔧 Environment Variables for Production

### Backend (application-prod.yml)
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

app:
  jwt:
    secret: ${JWT_SECRET}
  cors:
    allowed-origins: ${CORS_ALLOWED_ORIGINS}
```

### Admin Panel (.env.production)
```
VITE_API_BASE_URL=${VITE_API_BASE_URL}
VITE_NODE_ENV=production
```

### Client Side (.env.production)
```
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NODE_ENV=production
```

## 🔒 Security Notes
- Never commit sensitive credentials
- Use environment variables for all secrets
- Keep production configs separate from development 