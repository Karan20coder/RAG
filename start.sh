#!/bin/bash

echo "====================================="
echo "PDF RAG System - Quick Start"
echo "====================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

echo "✅ Python and Node.js are installed"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "Installing Python dependencies..."
pip install -r requirements.txt --break-system-packages -q

echo "✅ Backend setup complete"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install -q
fi

echo "✅ Frontend setup complete"
echo ""

# Start servers
echo "🚀 Starting servers..."
echo ""
echo "Starting Backend on http://localhost:5000..."
cd ../backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend on http://localhost:3000..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "====================================="
echo "✅ PDF RAG System is running!"
echo "====================================="
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
wait

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
