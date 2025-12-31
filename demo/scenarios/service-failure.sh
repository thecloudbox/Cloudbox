#!/bin/bash

echo "Starting Service Failure Scenario..."
echo ""

# Stop payment service
docker-compose stop payment-service

echo "payment-service has been stopped"
echo "Monitor at: http://localhost:3000/cloudsentinel"
echo ""
echo "CloudSentinel will:"
echo "1. Detect service down immediately"
echo "2. Create critical incident"
echo "3. Attempt auto-restart"
echo ""
echo "Service will auto-restart in ~60 seconds"
sleep 60
docker-compose start payment-service
echo "Service restarted by CloudSentinel"
