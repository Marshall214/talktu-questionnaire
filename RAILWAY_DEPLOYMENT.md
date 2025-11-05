# 🚂 Railway Deployment Guide (Docker)

## 📋 Pre-Deployment Checklist

✅ Backend Dockerfile configured
✅ Docker Compose ready
✅ Environment variables documented
✅ Database initialization script ready

---

## 🚀 Deploy to Railway (Backend + Database via Docker)

### Step 1: Prepare Your Repository

1. **Commit all changes to GitHub:**
   ```powershell
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

---

### Step 2: Create Railway Project

1. **Go to [railway.app](https://railway.app)**
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `talktu-questionnaire` repository
6. Railway will detect your project

---

### Step 3: Add PostgreSQL Database

1. In your Railway project dashboard
2. Click **"+ New"**
3. Select **"Database"**
4. Choose **"PostgreSQL"**
5. Railway will automatically provision a PostgreSQL database
6. **Note**: Railway will generate these variables automatically:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

---

### Step 4: Deploy Backend Service

#### Option A: Automatic Detection
1. Click **"+ New"** → **"GitHub Repo"**
2. Select your repository
3. Railway will detect the Dockerfile in `/backend`

#### Option B: Manual Configuration
1. Click **"+ New"** → **"Empty Service"**
2. Connect to your GitHub repo
3. Set **Root Directory**: `backend`
4. Railway will use the Dockerfile automatically

---

### Step 5: Configure Backend Environment Variables

In the **Backend service** settings, add these variables:

```bash
# Port
PORT=5000

# Environment
NODE_ENV=production

# Database Connection (using Railway's PostgreSQL references)
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# CORS (will update after frontend is deployed)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important**: Use the variable references `${{Postgres.VARIABLENAME}}` - Railway will automatically inject the values!

---

### Step 6: Initialize Database

After the backend deploys successfully:

1. Go to your **Backend service** in Railway
2. Click on **"Settings"** → **"Deploy"** → **"Custom Start Command"**
3. Run database initialization:

#### Method 1: Via Railway CLI (Recommended)
```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run init command
railway run npm run init-db
```

#### Method 2: Via Service Settings
1. Temporarily change the **Start Command** to: `npm run init-db && node server.js`
2. Let it deploy once (this runs init-db)
3. Change back to: `node server.js`

---

### Step 7: Get Your Backend URL

1. In Railway, go to your **Backend service**
2. Click **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://talktu-backend.up.railway.app`)

---

### Step 8: Deploy Frontend on Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. **Configure:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variable:**
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.up.railway.app/api
   ```

6. Click **"Deploy"**

---

### Step 9: Update Backend CORS

1. Go back to Railway → **Backend service** → **Variables**
2. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Save (Railway will auto-redeploy)

---

## ✅ Deployment Complete!

Your app is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.up.railway.app`
- **Database**: Managed by Railway PostgreSQL

---

## 🔧 Useful Railway Commands

```powershell
# View logs
railway logs

# Run commands in Railway environment
railway run <command>

# Check service status
railway status

# Open dashboard
railway open
```

---

## 💰 Railway Pricing

- **Free Trial**: $5 credit
- **Starter Plan**: $5/month credit (usually enough)
- **Pay as you go**: ~$0.000231/GB-hour for usage
- **Typical cost**: $5-10/month for this app

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check if Postgres variables are properly referenced
# They should look like: ${{Postgres.PGHOST}}
```

### Backend Won't Start
```bash
# View logs in Railway dashboard
railway logs

# Common issues:
# 1. Missing environment variables
# 2. Database not initialized
# 3. Port mismatch (ensure PORT=5000)
```

### CORS Errors
```bash
# Ensure FRONTEND_URL matches your Vercel domain exactly
# No trailing slash!
FRONTEND_URL=https://your-app.vercel.app
```

---

## 🔄 Continuous Deployment

Railway automatically redeploys when you push to GitHub:

```powershell
git add .
git commit -m "Update feature"
git push origin main
# Railway automatically detects and deploys!
```

---

## 📊 Monitoring

1. **Railway Dashboard**: View logs, metrics, and deployments
2. **Health Check**: Backend has `/health` endpoint
3. **Database**: Monitor via Railway's PostgreSQL metrics

---

## 🎉 Next Steps

1. ✅ Test your live app
2. ✅ Set up custom domain (optional)
3. ✅ Enable Railway's monitoring
4. ✅ Set up backups for database
5. ✅ Configure environment-specific settings

---

**Need help?** Railway has excellent documentation at [docs.railway.app](https://docs.railway.app)
