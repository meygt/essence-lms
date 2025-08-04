# 🔧 Fixing Local Development Issues

## The "Page Switching Stops App" Problem

This is **NOT** related to your VPS database. It's a frontend-backend connection issue.

### Root Causes:
1. **Authentication Token Issues**: Admin panel loses auth tokens when navigating
2. **API Connection Failures**: Frontend can't reach backend API
3. **CORS Problems**: Browser blocks requests between different origins
4. **Development Server Restart**: One of the dev servers crashed

## ✅ Quick Fixes

### 1. Check All Services Are Running
```bash
# Check if all 3 services are running:
lsof -i :8080  # Backend
lsof -i :3000  # Client Side  
lsof -i :3001  # Admin Panel
```

### 2. Test Backend API Directly
```bash
# Test if backend responds:
curl http://localhost:8080/api/auth/signup

# Should return a method not allowed error (this is good!)
```

### 3. Check Browser Console
1. Open Admin Panel (http://localhost:3001)
2. Press F12 → Console tab
3. Look for red error messages
4. Common errors:
   - `Failed to fetch` = Backend not running
   - `401 Unauthorized` = Authentication problem
   - `CORS error` = Cross-origin request blocked

### 4. Clear Browser Storage
```javascript
// Run this in browser console to clear auth data:
localStorage.clear();
sessionStorage.clear();
```

### 5. Restart All Services
```bash
cd /Users/mey/Desktop/EssenceQA/LMS/MAIN
./start-dev.sh
```

## 🎯 Permanent Solution

The real fix is deploying to Render where all services have stable URLs and proper HTTPS. 