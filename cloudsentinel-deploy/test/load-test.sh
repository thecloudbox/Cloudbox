#!/bin/bash

# CloudSentinel Load Testing Script

echo "======================================"
echo "CloudSentinel Load Test"
echo "======================================"
echo ""

BASE_URL="http://localhost:3000"
DURATION=60  # seconds
RPS=100      # requests per second

echo "Configuration:"
echo "  Duration: ${DURATION}s"
echo "  Target RPS: $RPS"
echo "  Total Requests: $((DURATION * RPS))"
echo ""

echo "Starting load test..."
START_TIME=$(date +%s)

# Generate metrics at target RPS
for ((i=0; i<DURATION; i++)); do
    for ((j=0; j<RPS; j++)); do
        SERVICE="service-$((RANDOM % 10))"
        VALUE=$((RANDOM % 1000))
        
        curl -s -X POST "$BASE_URL/api/metrics" \
            -H "Content-Type: application/json" \
            -d '{
              "service": "'$SERVICE'",
              "metric": "response_time",
              "value": '$VALUE',
              "timestamp": '$(date +%s)'
            }' > /dev/null &
        
        # Occasionally inject anomalies (5% of requests)
        if [ $((RANDOM % 20)) -eq 0 ]; then
            curl -s -X POST "$BASE_URL/api/metrics" \
                -H "Content-Type: application/json" \
                -d '{
                  "service": "'$SERVICE'",
                  "metric": "response_time",
                  "value": 9500,
                  "timestamp": '$(date +%s)'
                }' > /dev/null &
        fi
    done
    
    # Progress indicator
    echo -n "."
    sleep 1
done

wait
echo ""

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo ""
echo "Load test completed!"
echo "  Duration: ${ELAPSED}s"
echo "  Actual RPS: $(( (DURATION * RPS) / ELAPSED ))"
echo ""
echo "Check results in dashboard: $BASE_URL/cloudsentinel"
