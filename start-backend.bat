@echo off
echo ========================================
echo   Starting Backend Server
echo ========================================
cd /d "%~dp0backend"
echo Current directory: %CD%
echo.
echo Starting backend on port 3000...
echo.
npm start
