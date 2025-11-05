# Quick Start Guide - TalkTu Questionnaire

## 🚀 Fast Setup (5 minutes)

### Step 1: Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the 'postgres' user

### Step 2: Setup Backend

Open PowerShell and run:

```powershell
# Navigate to backend folder
cd "c:\Users\HP\work projects\talktu questionnaire\backend"

# Install dependencies
npm install

# Create .env file from example
Copy-Item .env.example .env

# Edit .env file with your PostgreSQL password
# Use Notepad or VS Code to edit the file
notepad .env
# Change: DB_PASSWORD=your_password_here
```

After editing .env, continue:

```powershell
# Initialize database (create tables)
npm run init-db

# Start backend server
npm run dev
```

✅ Backend should now be running at http://localhost:5000

### Step 3: Setup Frontend

Open a NEW PowerShell window:

```powershell
# Navigate to frontend folder
cd "c:\Users\HP\work projects\talktu questionnaire\frontend"

# Install dependencies
npm install

# Start frontend server
npm run dev
```

✅ Frontend should now be running at http://localhost:3000

### Step 4: Test the Application

Open your browser and go to: **http://localhost:3000**

You should see the TalkTu homepage!

---

## 🐳 Docker Setup (Alternative - Easiest)

If you have Docker Desktop installed:

```powershell
cd "c:\Users\HP\work projects\talktu questionnaire"

# Set database password (optional)
$env:DB_PASSWORD = "yourpassword"

# Start everything with one command
docker-compose up -d

# Wait 30 seconds for database initialization
Start-Sleep -Seconds 30

# Initialize database
docker-compose exec backend npm run init-db
```

Visit: **http://localhost:3000**

---

## 📝 Common Issues & Solutions

### Issue: "Port 5000 already in use"
**Solution:** 
```powershell
# Find and kill the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change the port in backend/.env
# PORT=5001
```

### Issue: "Database connection failed"
**Solution:**
1. Check PostgreSQL is running:
   - Open Services (services.msc)
   - Look for "postgresql" service
   - Start it if stopped

2. Verify credentials in backend/.env match your PostgreSQL setup

### Issue: "Module not found"
**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

---

## 🎯 Testing the Flow

1. **Homepage** → Click "Start Assessment"
2. **Parent Info** → Fill optional info → Click "Continue"
3. **Child Info** → Enter child's age (required) → Click "Start Questionnaire"
4. **Questionnaire** → Answer all 10 questions
5. **Results** → See color-coded report with recommendations!

---

## 📊 View Database Data

```powershell
# Connect to PostgreSQL
psql -U postgres -d talktu_questionnaire

# View assessments
SELECT * FROM assessments;

# View results
SELECT * FROM results;

# Exit
\q
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend + DB)
- **Frontend:** Push to GitHub → Connect to Vercel
- **Backend:** Push to GitHub → Connect to Railway
- **Database:** Railway provides PostgreSQL automatically

### Option 2: Heroku (All-in-One)
```powershell
heroku create talktu-backend
heroku addons:create heroku-postgresql:mini
git push heroku main
```

### Option 3: AWS/DigitalOcean
- Deploy Docker containers using docker-compose.yml
- Use managed PostgreSQL service

---

## 💾 Export Data

Visit: http://localhost:5000/api/assessment/export/csv

This downloads all assessment data as CSV for analysis.

---

## 🆘 Need Help?

1. Check the main README.md for detailed documentation
2. Review error messages in the terminal/console
3. Verify all environment variables in .env files
4. Ensure PostgreSQL is running and accessible

---

**Ready to deploy? Let me know which hosting option you prefer!**
