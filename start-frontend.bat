@echo off
echo ========================================
echo   Starting Frontend Server
echo ========================================
cd /d "%~dp0frontend"
echo Current directory: %CD%
echo.
echo Starting React frontend on port 3001...
echo Browser will open automatically at http://localhost:3001
echo.
npm start
