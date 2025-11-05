# 🚀 Quick Deployment Reference

## ✅ Files Ready for Railway Deployment

Your project is now configured for Docker deployment on Railway:

### 📁 Docker Files
- ✅ `backend/Dockerfile` - Updated with health checks
- ✅ `docker-compose.yml` - For local testing
- ✅ `backend/.dockerignore` - Optimized build
- ✅ `railway.json` - Railway configuration

### 📚 Documentation
- ✅ `RAILWAY_DEPLOYMENT.md` - Complete step-by-step guide
- ✅ `deploy.ps1` - Helper script for preparation

---

## 🎯 Quick Deploy Steps

### 1️⃣ **Prepare (Run This First)**
```powershell
# Run the deployment helper
.\deploy.ps1
```

### 2️⃣ **Deploy Backend + Database on Railway**

**Visit: https://railway.app**

1. New Project → Deploy from GitHub
2. Select your repository
3. Add PostgreSQL: `+ New → Database → PostgreSQL`
4. Deploy Backend: `+ New → GitHub Repo → backend folder`

**Environment Variables (Backend Service):**
```env
PORT=5000
NODE_ENV=production
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
FRONTEND_URL=https://your-app.vercel.app
```

5. Initialize Database:
```powershell
railway run npm run init-db
```

6. Generate Domain & Copy URL

### 3️⃣ **Deploy Frontend on Vercel**

**Visit: https://vercel.com**

1. New Project → Import from GitHub
2. **Settings:**
   - Root Directory: `frontend`
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

3. **Environment Variable:**
```env
VITE_API_URL=https://your-backend.up.railway.app/api
```

4. Deploy!

### 4️⃣ **Update CORS**

Go back to Railway → Backend → Variables:
```env
FRONTEND_URL=https://your-app.vercel.app
```

---

## 💡 Railway CLI Commands

```powershell
# Install
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run commands
railway run npm run init-db

# Open dashboard
railway open
```

---

## 💰 Cost Estimate

**Railway (Backend + Database):**
- Free: $5 credit
- Typical: ~$5-10/month

**Vercel (Frontend):**
- Free forever (hobby plan)

**Total: ~$5-10/month** (after free credit)

---

## 🔍 Testing Checklist

After deployment:

- [ ] Visit frontend URL
- [ ] Complete an assessment
- [ ] Check results page displays
- [ ] Verify data saves to database
- [ ] Test waitlist modal
- [ ] Check CSV export works
- [ ] Monitor Railway logs for errors

---

## 🐛 Common Issues

**Database Connection Error:**
```
✅ Check Postgres variable references: ${{Postgres.PGHOST}}
✅ Ensure database service is running
✅ Wait 30 seconds after deployment
```

**CORS Error:**
```
✅ Verify FRONTEND_URL matches Vercel domain
✅ No trailing slash in URL
✅ Check Railway logs for details
```

**Build Failed:**
```
✅ Check Dockerfile syntax
✅ Ensure package.json is in backend folder
✅ Review Railway build logs
```

---

## 📞 Need Help?

1. Check `RAILWAY_DEPLOYMENT.md` for detailed guide
2. Railway Docs: https://docs.railway.app
3. Vercel Docs: https://vercel.com/docs

---

**Ready to deploy? Run `.\deploy.ps1` to start!** 🚀
