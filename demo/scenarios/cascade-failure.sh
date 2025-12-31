#!/bin/bash

echo "Starting Cascade Failure Scenario..."
echo "This simulates a cascade of failures across services"
echo ""

# Introduce failures in sequence
echo "1. Slowing down database..."
docker-compose exec -d redis redis-cli CONFIG SET timeout 10

sleep 10

echo "2. Stopping user-service..."
docker-compose stop user-service

sleep 5

echo "3. Overloading api-gateway..."
for i in {1..100}; do
  docker-compose exec -d api-gateway sh -c "yes > /dev/null &"
done

echo ""
echo "Cascade failure initiated!"
echo "Monitor at: http://localhost:3000/cloudsentinel"
echo ""
echo "CloudSentinel will:"
echo "1. Detect correlated anomalies across services"
echo "2. Identify root cause (database slowdown)"
echo "3. Isolate affected services"
echo "4. Remediate in correct order"
echo ""
echo "Full recovery expected in 2-3 minutes"
