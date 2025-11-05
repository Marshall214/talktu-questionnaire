@echo off
echo.
echo ========================================
echo   TalkTu Questionnaire Platform
echo   Starting Development Servers...
echo ========================================
echo.

REM Check if PostgreSQL is running
echo [1/4] Checking PostgreSQL...
sc query postgresql-x64-15 > nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: PostgreSQL might not be running
    echo Please start PostgreSQL service first
    echo.
)

REM Start Backend
echo [2/4] Starting Backend Server...
start "TalkTu Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 > nul

REM Start Frontend
echo [3/4] Starting Frontend Server...
start "TalkTu Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 > nul

echo [4/4] Opening Browser...
timeout /t 5 > nul
start http://localhost:3000

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press any key to stop all servers...
pause > nul

REM Kill servers
taskkill /FI "WindowTitle eq TalkTu Backend*" /T /F > nul 2>&1
taskkill /FI "WindowTitle eq TalkTu Frontend*" /T /F > nul 2>&1

echo.
echo Servers stopped.
pause
