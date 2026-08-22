#!/bin/bash

echo "🚀 Starting Elite Trading Hub on http://localhost:3000 ..."

# 1. Kill any process occupying port 3000
PORT=3000
PIDS=$(lsof -ti:$PORT 2>/dev/null)

if [ -n "$PIDS" ]; then
  echo "⚠️ Port $PORT is busy by PID(s): $PIDS. Terminating process..."
  kill -9 $PIDS 2>/dev/null || true
  sleep 1
fi

# Kill any other lingering next dev processes
pkill -9 -f "next-server" 2>/dev/null || true

# 2. Clear corrupted .next build cache
echo "🧹 Cleaning .next build cache..."
rm -rf .next

# 3. Launch Next.js dev server on port 3000
echo "✅ Launching Next.js dev server on http://localhost:3000..."
PORT=3000 npm run dev
