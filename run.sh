#!/usr/bin/env bash

# Start Django backend on port 8000
cd /home/runner/workspace
echo "Starting Django backend on port 8000..."
python manage.py runserver 0.0.0.0:8000 --noreload > django.log 2>&1 &
DJANGO_PID=$!

# Wait for Django to start
sleep 3

# Check if Django started successfully
if curl -s http://localhost:8000/api/profile/ > /dev/null 2>&1 || curl -s http://localhost:8000/api/auth/login/ > /dev/null 2>&1; then
    echo "✓ Django backend running successfully on port 8000"
else
    echo "✗ Django backend failed to start, check django.log"
    cat django.log
fi

# Keep the script running
wait $DJANGO_PID