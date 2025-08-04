#!/bin/bash

# LMS Development Environment Startup Script
echo "🚀 Starting LMS Development Environment..."

# Function to check if port is in use
check_port() {
    if lsof -i :$1 > /dev/null 2>&1; then
        echo "✅ Port $1 is already in use"
        return 0
    else
        echo "❌ Port $1 is available"
        return 1
    fi
}

# Check if backend is running
echo "Checking Backend (Port 8080)..."
if ! check_port 8080; then
    echo "🔄 Starting Backend..."
    cd backend
    ./gradlew bootRun --no-daemon &
    BACKEND_PID=$!
    echo "Backend PID: $BACKEND_PID"
    cd ..
    sleep 10
fi

# Start Admin Panel (React/Vite)
echo "🔄 Starting Admin Panel (Port 3001)..."
cd admin-panel
npm run dev -- --port 3001 &
ADMIN_PID=$!
echo "Admin Panel PID: $ADMIN_PID"
cd ..

# Start Client Side (Next.js)
echo "🔄 Starting Client Side (Port 3000)..."
cd client-side
npm run dev &
CLIENT_PID=$!
echo "Client Side PID: $CLIENT_PID"
cd ..

echo ""
echo "🎉 All services are starting..."
echo ""
echo "📱 Application URLs:"
echo "   🌐 Client Side (Main App):  http://localhost:3000"
echo "   🛠️  Admin Panel:            http://localhost:3001"
echo "   🔧 Backend API:             http://localhost:8080/api"
echo "   📊 Backend Health:          http://localhost:8080/actuator/health"
echo ""
echo "✋ To stop all services, press Ctrl+C"
echo ""

# Wait for interrupt
trap 'echo "🛑 Stopping all services..."; kill $BACKEND_PID $ADMIN_PID $CLIENT_PID 2>/dev/null; exit' INT

# Keep script running
wait 