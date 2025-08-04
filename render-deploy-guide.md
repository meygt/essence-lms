# 🚀 Render Deployment Guide for LMS

## Overview
You have 3 separate services that need to be deployed on Render:
1. **Backend** (Spring Boot API)
2. **Admin Panel** (React/Vite)
3. **Client Side** (Next.js)

## 🏗️ Deployment Strategy: 3 Separate Services

Since you already have 3 GitHub repositories, deploy them as **3 separate Render services**:

### 1. 🔧 Backend Service (Web Service)

**Repository:** Your backend GitHub repo

**Build Command:**
```bash
./gradlew clean build -x test
```

**Start Command:**
```bash
java -jar build/libs/*.jar
```

**Environment Variables:**
```
PORT=8080
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=postgresql://username:password@hostname:port/database
JWT_SECRET=your-super-secure-jwt-secret-key-here
CORS_ALLOWED_ORIGINS=https://your-admin-panel.onrender.com,https://your-client-side.onrender.com
```

### 2. 🛠️ Admin Panel (Static Site)

**Repository:** Your admin-panel GitHub repo

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Environment Variables:**
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_NODE_ENV=production
```

### 3. 🌐 Client Side (Web Service)

**Repository:** Your client-side GitHub repo

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NODE_ENV=production
```

## 📋 Step-by-Step Deployment

### Step 1: Deploy Backend First
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your backend GitHub repo
4. Configure:
   - **Name:** `lms-backend`
   - **Environment:** `Docker` or `Native`
   - **Build Command:** `./gradlew clean build -x test`
   - **Start Command:** `java -jar build/libs/*.jar`
   - **Environment Variables:** (see above)

### Step 2: Deploy Admin Panel
1. Click "New +" → "Static Site"
2. Connect your admin-panel GitHub repo
3. Configure:
   - **Name:** `lms-admin-panel`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variables:** Update `VITE_API_BASE_URL` with your backend URL

### Step 3: Deploy Client Side
1. Click "New +" → "Web Service"
2. Connect your client-side GitHub repo
3. Configure:
   - **Name:** `lms-client-side`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:** Update `NEXT_PUBLIC_API_URL` with your backend URL

### Step 4: Update CORS
Update your backend's CORS configuration with the actual Render URLs.

## 🔒 Database Setup

### Option 1: Use Render PostgreSQL
1. Create a PostgreSQL database on Render
2. Use the connection string in your backend environment variables

### Option 2: Keep Your VPS Database
1. Ensure your VPS PostgreSQL accepts external connections
2. Update `pg_hba.conf` and `postgresql.conf`
3. Use your VPS database URL in backend environment variables

## 🌐 Final URLs
After deployment, you'll have:
- **Backend API:** `https://lms-backend.onrender.com/api`
- **Admin Panel:** `https://lms-admin-panel.onrender.com`
- **Client Side:** `https://lms-client-side.onrender.com`

## ⚡ Auto-Deploy Setup
Enable auto-deploy for all services so they redeploy when you push to GitHub.

## 💰 Cost Considerations
- **Free Tier:** All 3 services can run on Render's free tier initially
- **Paid Plans:** Consider upgrading for production use (no sleep, faster builds)

## 🔄 Alternative: Monorepo Approach
If you want everything in one repository:
1. Combine all 3 projects into one GitHub repo
2. Use a single Render service with multiple build/start commands
3. Configure different routes for each service

Would you like me to help you set up any of these deployment options? 