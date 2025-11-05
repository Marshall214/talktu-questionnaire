# TalkTu Deployment Helper Script

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TalkTu Railway Deployment Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git not initialized. Initializing..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "📝 Uncommitted changes detected:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""
    
    $commit = Read-Host "Do you want to commit these changes? (y/n)"
    if ($commit -eq "y") {
        $message = Read-Host "Enter commit message"
        git add .
        git commit -m $message
        Write-Host "✅ Changes committed" -ForegroundColor Green
    }
}

# Check if remote is set
$remote = git remote -v
if (-not $remote) {
    Write-Host ""
    Write-Host "❌ No Git remote found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow these steps:" -ForegroundColor Yellow
    Write-Host "1. Create a repository on GitHub" -ForegroundColor White
    Write-Host "2. Run: git remote add origin <your-repo-url>" -ForegroundColor White
    Write-Host "3. Run: git push -u origin main" -ForegroundColor White
    Write-Host ""
    exit
}

Write-Host ""
Write-Host "✅ Git repository is ready" -ForegroundColor Green
Write-Host ""

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push
    Write-Host "✅ Pushed to GitHub successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Push failed. You may need to push manually" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps for Railway Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to https://railway.app" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Click 'New Project' → 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "4. Select your repository" -ForegroundColor White
Write-Host "5. Add PostgreSQL database (+ New → Database → PostgreSQL)" -ForegroundColor White
Write-Host "6. Configure environment variables (see RAILWAY_DEPLOYMENT.md)" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full guide: RAILWAY_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to install Railway CLI
$installCli = Read-Host "Do you want to install Railway CLI for easier management? (y/n)"
if ($installCli -eq "y") {
    Write-Host ""
    Write-Host "Installing Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
    Write-Host ""
    Write-Host "✅ Railway CLI installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now use:" -ForegroundColor White
    Write-Host "  railway login     - Login to Railway" -ForegroundColor Gray
    Write-Host "  railway link      - Link to your project" -ForegroundColor Gray
    Write-Host "  railway logs      - View logs" -ForegroundColor Gray
    Write-Host "  railway open      - Open dashboard" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "Good luck with your deployment! 🚀" -ForegroundColor Green
Write-Host ""
