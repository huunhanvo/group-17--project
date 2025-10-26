@echo off
echo ========================================
echo   STARTING SERVICES FOR SCREENSHOTS
echo ========================================
echo.

REM Start Backend in new window
echo [1/2] Starting Backend (port 3000)...
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm start"
timeout /t 5 /nobreak >nul

REM Start Frontend in new window  
echo [2/2] Starting Frontend (port 3001)...
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && set PORT=3001 && npm start"

echo.
echo ========================================
echo   SERVICES STARTING...
echo ========================================
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
echo Wait 15-20 seconds for both servers to start
echo Then open browser to http://localhost:3001
echo.
pause
