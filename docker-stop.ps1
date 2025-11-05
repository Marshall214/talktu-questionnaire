# Stop all TalkTu Docker containers

Write-Host ""
Write-Host "Stopping TalkTu containers..." -ForegroundColor Yellow
docker-compose down

Write-Host ""
Write-Host "✓ All containers stopped" -ForegroundColor Green
Write-Host ""
