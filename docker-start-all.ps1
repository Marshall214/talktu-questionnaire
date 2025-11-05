# TalkTu Questionnaire - Full Docker Start
# Runs EVERYTHING in Docker (Backend + Database + Frontend)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TalkTu - Full Docker Start" -ForegroundColor Cyan
Write-Host "  (All services containerized)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "[1/5] Checking Docker..." -ForegroundColor Yellow
try {
    docker ps > $null 2>&1
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Stop any existing containers
Write-Host ""
Write-Host "[2/5] Cleaning up old containers..." -ForegroundColor Yellow
docker-compose down 2>$null
Write-Host "✓ Cleaned up" -ForegroundColor Green

# Build and start all services
Write-Host ""
Write-Host "[3/5] Building and starting all services..." -ForegroundColor Yellow
Write-Host "    (This may take a few minutes on first run)" -ForegroundColor Gray
docker-compose up -d --build

# Wait for services to be ready
Write-Host ""
Write-Host "[4/5] Waiting for services to initialize (30 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30
Write-Host "✓ Services ready" -ForegroundColor Green

# Initialize database
Write-Host ""
Write-Host "[5/5] Initializing database..." -ForegroundColor Yellow
docker-compose exec backend npm run init-db
Write-Host "✓ Database initialization complete" -ForegroundColor Green

Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🎉 TalkTu is Running!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:   http://localhost:5000" -ForegroundColor Cyan
Write-Host "Database:  PostgreSQL in Docker" -ForegroundColor Cyan
Write-Host ""
Write-Host "View logs:       docker-compose logs -f" -ForegroundColor Yellow
Write-Host "Stop services:   docker-compose down" -ForegroundColor Yellow
Write-Host "View containers: docker-compose ps" -ForegroundColor Yellow
Write-Host ""
