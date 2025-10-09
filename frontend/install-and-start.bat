@echo off
cd /d "%~dp0"
echo Installing dependencies...
npm install
echo.
echo Starting React app...
npm start
