#!/bin/bash

echo "Starting High CPU Scenario..."
echo "This will simulate CPU spike on user-service"
echo "Watch CloudSentinel detect and remediate the issue"
echo ""

# Stress CPU on user-service
docker-compose exec -d user-service sh -c "yes > /dev/null &"
docker-compose exec -d user-service sh -c "yes > /dev/null &"
docker-compose exec -d user-service sh -c "yes > /dev/null &"

echo "CPU stress started on user-service"
echo "Monitor at: http://localhost:3000/cloudsentinel"
echo ""
echo "CloudSentinel will:"
echo "1. Detect CPU anomaly in ~30 seconds"
echo "2. Create incident"
echo "3. Auto-remediate by killing stress processes"
echo ""
echo "To stop manually: docker-compose restart user-service"
