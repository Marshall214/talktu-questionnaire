# TalkTu Questionnaire - Docker Quick Start
# Runs Backend + Database in Docker, Frontend locally

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TalkTu - Docker Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "[1/6] Checking Docker..." -ForegroundColor Yellow
try {
    docker ps > $null 2>&1
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Stop any existing containers
Write-Host ""
Write-Host "[2/6] Cleaning up old containers..." -ForegroundColor Yellow
docker-compose down 2>$null
Write-Host "✓ Cleaned up" -ForegroundColor Green

# Start Backend + Database
Write-Host ""
Write-Host "[3/6] Starting Backend + Database in Docker..." -ForegroundColor Yellow
docker-compose up -d postgres backend

# Wait for database to be ready
Write-Host ""
Write-Host "[4/6] Waiting for database to initialize (15 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15
Write-Host "✓ Database ready" -ForegroundColor Green

# Initialize database
Write-Host ""
Write-Host "[5/6] Initializing database tables..." -ForegroundColor Yellow
docker-compose exec backend npm run init-db
Write-Host "✓ Database initialization complete" -ForegroundColor Green

# Install frontend dependencies if needed
Write-Host ""
Write-Host "[6/6] Starting Frontend..." -ForegroundColor Yellow
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Start Frontend
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 5

# Open browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🎉 TalkTu is Running!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:   http://localhost:5000" -ForegroundColor Cyan
Write-Host "Database:  PostgreSQL in Docker (port 5432)" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop:" -ForegroundColor Yellow
Write-Host "  1. Close the frontend terminal window" -ForegroundColor Yellow
Write-Host "  2. Run: docker-compose down" -ForegroundColor Yellow
Write-Host ""
