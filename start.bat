@echo off
echo =====================================
echo PDF RAG System - Quick Start
echo =====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js 14 or higher.
    pause
    exit /b 1
)

echo Python and Node.js are installed
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
echo Installing Python dependencies...
pip install -r requirements.txt --break-system-packages -q

echo Backend setup complete
echo.

REM Setup Frontend
echo Setting up Frontend...
cd ..\frontend

if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install -q
)

echo Frontend setup complete
echo.

REM Start servers
echo Starting servers...
echo.

echo Starting Backend on http://localhost:5000...
cd ..\backend
call venv\Scripts\activate.bat
start "PDF RAG Backend" cmd /k python app.py

timeout /t 3 /nobreak >nul

echo Starting Frontend on http://localhost:3000...
cd ..\frontend
start "PDF RAG Frontend" cmd /k npm start

echo.
echo =====================================
echo PDF RAG System is running!
echo =====================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Close the terminal windows to stop the servers
echo.
pause
