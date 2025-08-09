#!/usr/bin/env bash

# Start Django backend on port 8000
cd /home/runner/workspace
python manage.py runserver 0.0.0.0:8000 &

# Wait a moment for Django to start
sleep 3

# Keep the script running
wait