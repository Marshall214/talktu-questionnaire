# 🎨 Render.com Deployment Guide

## 🌐 Why Render?

- ✅ Free tier available (750 hours/month)
- ✅ Automatic HTTPS
- ✅ Easy Docker deployment
- ✅ Built-in PostgreSQL
- ✅ Auto-deploys from GitHub
- ✅ Great for full-stack apps

**Cost**: Free tier available, then $7/month per service

---

## 🚀 Deploy to Render (Backend + Database + Frontend)

### Step 1: Create Render Account

1. Go to **[render.com](https://render.com)**
2. Sign up with **GitHub**
3. Authorize Render to access your repositories

---

### Step 2: Deploy PostgreSQL Database

1. From Render Dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Configure:
   ```
   Name: talktu-db
   Database: talktu_questionnaire
   User: talktu_user
   Region: Choose closest to you
   ```
4. Select **Free** tier (or Starter $7/month for production)
5. Click **"Create Database"**
6. **Important**: Copy the **Internal Database URL** (starts with `postgresql://`)

---

### Step 3: Deploy Backend Web Service

#### Option A: Using Dockerfile (Recommended)

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   ```
   Name: talktu-backend
   Region: Same as database
   Branch: main
   Root Directory: backend
   Runtime: Docker
   ```

4. **Build & Deploy Settings:**
   - Render auto-detects the Dockerfile ✅
   - Docker Command: `node server.js` (or leave default)

5. **Add Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=<from Internal Database URL>
   DB_PORT=5432
   DB_NAME=talktu_questionnaire
   DB_USER=<from database>
   DB_PASSWORD=<from database>
   FRONTEND_URL=<will update after frontend deploy>
   ```

   **Pro Tip**: Use the full Internal Database URL:
   ```
   DATABASE_URL=<paste Internal Database URL here>
   ```

6. Select **Free** tier (or Starter $7/month)
7. Click **"Create Web Service"**

#### Option B: Using Node.js (Without Docker)

1. Click **"New +"** → **"Web Service"**
2. Connect repository
3. Configure:
   ```
   Name: talktu-backend
   Runtime: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && node server.js
   ```
4. Add environment variables (same as above)

---

### Step 4: Initialize Database

After backend deploys successfully:

#### Method 1: Using Render Shell (Recommended)

1. Go to your **talktu-backend** service
2. Click **"Shell"** tab (top right)
3. Run:
   ```bash
   npm run init-db
   ```

#### Method 2: Using Render Deploy Hook

1. Temporarily update **Start Command** to:
   ```bash
   npm run init-db && node server.js
   ```
2. Let it deploy once
3. Change back to: `node server.js`

---

### Step 5: Get Backend URL

1. In your backend service, look for **"Your service is live at"**
2. Copy the URL (e.g., `https://talktu-backend.onrender.com`)
3. This is your backend API URL

---

### Step 6: Deploy Frontend

#### Option A: Deploy on Render (All-in-One)

1. Click **"New +"** → **"Static Site"**
2. Connect your repository
3. Configure:
   ```
   Name: talktu-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: frontend/dist
   ```

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://talktu-backend.onrender.com/api
   ```

5. Click **"Create Static Site"**

#### Option B: Deploy on Vercel (Recommended for Frontend)

1. Go to **[vercel.com](https://vercel.com)**
2. New Project → Import from GitHub
3. Configure:
   ```
   Root Directory: frontend
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
4. Add Environment Variable:
   ```
   VITE_API_URL=https://talktu-backend.onrender.com/api
   ```
5. Deploy

---

### Step 7: Update Backend CORS

1. Go to Render → **talktu-backend** → **Environment**
2. Add/Update:
   ```
   FRONTEND_URL=https://talktu-frontend.onrender.com
   # OR if using Vercel:
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Save changes (Render will auto-redeploy)

---

## 📝 Complete Environment Variables Reference

### Backend Service (`talktu-backend`)

```bash
# Server
PORT=5000
NODE_ENV=production

# Database (Option 1: Individual variables)
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=talktu_questionnaire
DB_USER=talktu_user
DB_PASSWORD=<from Render database>

# Database (Option 2: Connection URL - Easier!)
DATABASE_URL=postgresql://talktu_user:password@host:5432/talktu_questionnaire

# CORS
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (Static Site or Vercel)

```bash
VITE_API_URL=https://talktu-backend.onrender.com/api
```

---

## 🔧 Using DATABASE_URL (Recommended)

Update `backend/config/database.js` to support DATABASE_URL:

```javascript
const { Pool } = require('pg');
require('dotenv').config();

// Support both DATABASE_URL and individual variables
const pool = process.env.DATABASE_URL 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'talktu_questionnaire',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
```

---

## ⚡ Render-Specific Features

### Auto-Deploy from GitHub
- Render auto-deploys when you push to GitHub
- No manual deployments needed!

### Custom Domains
1. Go to service → **Settings** → **Custom Domains**
2. Add your domain
3. Update DNS records as shown

### Environment Groups
1. Create environment groups for shared variables
2. Link to multiple services
3. Update once, apply everywhere

### Health Checks
Render automatically uses your `/health` endpoint

---

## 💰 Render Pricing

### Free Tier
- **750 hours/month** per service
- Services spin down after 15 min inactivity
- Spins up on request (cold start ~30s)
- **Perfect for testing/demos**

### Starter Plan ($7/month per service)
- Always on (no cold starts)
- Better performance
- **Recommended for production**

### Database
- **Free**: 90 days, then $7/month
- **Starter**: $7/month, 1GB storage

**Total Cost Examples:**
- **Free tier**: $0 (90 days free DB)
- **Production**: $21/month (Backend $7 + DB $7 + Frontend $7)
- **Hybrid**: $7/month (Backend on Render, Frontend on Vercel free)

---

## 🐛 Troubleshooting

### Service Won't Start
```bash
# Check logs in Render Dashboard
# Common issues:
1. Missing environment variables
2. Port not set to 5000
3. Database not initialized
```

### Database Connection Error
```bash
# Use Internal Database URL (not External)
# Add SSL configuration for production
ssl: { rejectUnauthorized: false }
```

### CORS Errors
```bash
# Ensure FRONTEND_URL matches exactly
# No trailing slash
FRONTEND_URL=https://your-app.vercel.app
```

### Cold Starts (Free Tier)
```bash
# Free tier spins down after 15 min
# First request takes ~30s
# Upgrade to Starter ($7) for always-on
```

---

## 🔄 Continuous Deployment

Render auto-deploys on every push:

```powershell
git add .
git commit -m "Update feature"
git push origin main
# Render automatically deploys! ✅
```

---

## 📊 Monitoring

### Logs
- Real-time logs in dashboard
- Filter by service
- Download logs for debugging

### Metrics
- CPU usage
- Memory usage
- Request count
- Response times

### Alerts
- Set up email/Slack notifications
- Monitor service health
- Get deployment status

---

## ✅ Deployment Checklist

- [ ] Database created and running
- [ ] Backend deployed successfully
- [ ] Database initialized (`npm run init-db`)
- [ ] Backend URL copied
- [ ] Frontend deployed with correct API URL
- [ ] Backend CORS updated with frontend URL
- [ ] Test complete assessment flow
- [ ] Check logs for errors
- [ ] Verify data persistence
- [ ] Test waitlist modal
- [ ] Monitor performance

---

## 🎯 Best Practices

1. **Use DATABASE_URL** for easier configuration
2. **Enable SSL** for database in production
3. **Monitor logs** regularly
4. **Set up health checks** (already included)
5. **Use environment groups** for shared configs
6. **Upgrade to paid tier** for production (no cold starts)

---

## 🚀 Quick Deploy Commands

```bash
# If using Render CLI (optional)
npm install -g render-cli

# Login
render login

# Deploy from CLI
render deploy

# View logs
render logs
```

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

---

## 🎉 Next Steps After Deployment

1. ✅ Test your live app thoroughly
2. ✅ Set up custom domain (optional)
3. ✅ Configure backups for database
4. ✅ Set up monitoring/alerts
5. ✅ Consider upgrading to paid tier for production

---

**Ready to deploy? Follow the steps above!** 🚀
