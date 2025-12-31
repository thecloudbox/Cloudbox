#!/bin/bash

echo "Starting Memory Leak Scenario..."
echo "This simulates a gradual memory leak"
echo ""

# Allocate memory gradually
docker-compose exec -d order-service sh -c '
  i=0
  while [ $i -lt 100 ]; do
    dd if=/dev/zero of=/tmp/mem_$i bs=10M count=1 2>/dev/null
    sleep 5
    i=$((i+1))
  done
'

echo "Memory leak started on order-service"
echo "Monitor at: http://localhost:3000/cloudsentinel"
echo ""
echo "CloudSentinel will:"
echo "1. Detect increasing memory usage trend"
echo "2. Predict memory exhaustion 10-15 minutes in advance"
echo "3. Alert and prepare for remediation"
echo "4. Restart service before OOM occurs"
