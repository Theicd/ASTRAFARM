@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title Astra Farm

cd /d "%~dp0"
set "GAME_URL=http://127.0.0.1:5187/"
set "PORT=5187"
set "ROOT=%~dp0"

echo.
echo  ========================================
echo   Astra Farm
echo   %GAME_URL%
echo  ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found - install from https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>&1
if errorlevel 1 (
  echo npm not found - reinstall Node.js
  pause
  exit /b 1
)

echo Closing old servers...
powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%scripts\free-port.ps1" -Port %PORT% -ProjectRoot "%ROOT%"
echo.

if not exist "node_modules\vite\package.json" goto install
if not exist "node_modules\three\package.json" goto install
goto ready

:install
echo Installing game files...
call npm install
if errorlevel 1 (
  echo Install failed.
  pause
  exit /b 1
)
echo.

:ready
powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%scripts\free-port.ps1" -Port %PORT% -ProjectRoot "%ROOT%" >nul
ping -n 2 127.0.0.1 >nul

start "" cmd /c "ping -n 4 127.0.0.1 >nul & start %GAME_URL%"

echo Starting...
echo Close this window to stop the game.
echo.

call npm run dev
set "EXIT_CODE=!ERRORLEVEL!"

if not "!EXIT_CODE!"=="0" (
  echo Retrying...
  powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%scripts\free-port.ps1" -Port %PORT% -ProjectRoot "%ROOT%" >nul
  ping -n 2 127.0.0.1 >nul
  start "" cmd /c "ping -n 4 127.0.0.1 >nul & start %GAME_URL%"
  call npm run dev
  set "EXIT_CODE=!ERRORLEVEL!"
)

if not "!EXIT_CODE!"=="0" (
  echo Could not start. Close other Astra Farm windows and try Play.bat again.
  pause
)
exit /b !EXIT_CODE!