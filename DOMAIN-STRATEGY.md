# 🌐 Domain Strategy for Multiple Render Services

## The Challenge
You have 3 separate Render services but want one unified domain experience.

## 🎯 Recommended Solution: Subdomain Strategy

### Option 1: Subdomain Approach (Recommended)
Use **subdomains** for each service:

```
Main Domain: yourdomain.com
├── app.yourdomain.com     → Client Side (Main App)
├── admin.yourdomain.com   → Admin Panel  
└── api.yourdomain.com     → Backend API
```

### How to Set It Up:

1. **Buy your domain** (e.g., from Namecheap, GoDaddy)

2. **Configure DNS Records:**
   ```
   Type    Name     Value
   CNAME   app      lms-client-xyz.onrender.com
   CNAME   admin    lms-admin-xyz.onrender.com  
   CNAME   api      lms-backend-xyz.onrender.com
   ```

3. **Add Custom Domains in Render:**
   - Go to each service in Render Dashboard
   - Click "Settings" → "Custom Domains"
   - Add your subdomain (e.g., api.yourdomain.com)

4. **Update Environment Variables:**
   ```bash
   # Admin Panel
   VITE_API_BASE_URL=https://api.yourdomain.com/api
   
   # Client Side  
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   
   # Backend CORS
   CORS_ALLOWED_ORIGINS=https://app.yourdomain.com,https://admin.yourdomain.com
   ```

## 🔄 Alternative: Single Entry Point

### Option 2: Reverse Proxy (Advanced)
Use **one main domain** with path-based routing:

```
yourdomain.com/          → Client Side
yourdomain.com/admin/    → Admin Panel
yourdomain.com/api/      → Backend API
```

**Pros:** One domain, cleaner URLs
**Cons:** More complex setup, requires proxy service

## 💰 Cost Considerations

### Free Option:
- Use Render's free subdomains initially
- No custom domain costs
- URLs: `lms-client-xyz.onrender.com`

### Paid Option:
- Custom domain: ~$10-15/year
- Render services: Free tier initially
- Professional appearance

## 🎯 My Recommendation

**Start with Render's free URLs**, then add custom subdomains later:

1. **Phase 1:** Deploy to Render free URLs
2. **Phase 2:** Buy domain and set up subdomains
3. **Phase 3:** Consider SSL certificates (Render provides free SSL)

## 🔒 SSL Certificates
Render automatically provides SSL certificates for both:
- Default `.onrender.com` domains
- Custom domains you add

## Example Setup
```bash
# Your final URLs would be:
https://app.essenceacademy.com      # Main student/parent app
https://admin.essenceacademy.com    # Teacher/admin panel
https://api.essenceacademy.com      # Backend API
```

Would you like me to help you set up the subdomain approach? 