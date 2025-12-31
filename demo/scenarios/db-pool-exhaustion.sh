#!/bin/bash

echo "Starting DB Pool Exhaustion Scenario..."
echo ""

# Simulate connection pool exhaustion
docker-compose exec -d redis sh -c '
  for i in $(seq 1 100); do
    redis-cli -h localhost -p 6379 <<EOF &
      CLIENT SETNAME connection_$i
      SUBSCRIBE test_channel
EOF
  done
'

echo "Database connections being exhausted..."
echo "Monitor at: http://localhost:3000/cloudsentinel"
echo ""
echo "CloudSentinel will:"
echo "1. Detect increasing connection wait times"
echo "2. Predict pool exhaustion"
echo "3. Scale connection pool or restart service"
