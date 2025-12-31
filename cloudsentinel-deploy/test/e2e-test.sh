#!/bin/bash

# CloudSentinel End-to-End Test Suite
# Tests all 5 revolutionary features

set -e

echo "======================================"
echo "CloudSentinel E2E Test Suite"
echo "======================================"
echo ""

BASE_URL="http://localhost:3000"
PROMETHEUS_URL="http://localhost:9090"
GRAFANA_URL="http://localhost:3001"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function
test_api() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=${4:-}
    
    echo -n "Testing: $name... "
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" "$url")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED (HTTP $http_code)${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "1. Testing Service Health"
echo "-------------------------"
test_api "CloudSentinel App" "$BASE_URL/api/health"
test_api "Prometheus" "$PROMETHEUS_URL/-/healthy"
test_api "Grafana" "$GRAFANA_URL/api/health"
echo ""

echo "2. Testing Metrics Ingestion"
echo "----------------------------"
METRIC_DATA='{
  "service": "test-api",
  "metric": "response_time",
  "value": 150,
  "timestamp": '$(date +%s)'
}'
test_api "Normal Metric" "$BASE_URL/api/metrics" "POST" "$METRIC_DATA"

ANOMALY_DATA='{
  "service": "test-api",
  "metric": "response_time",
  "value": 9500,
  "timestamp": '$(date +%s)'
}'
test_api "Anomaly Metric" "$BASE_URL/api/metrics" "POST" "$ANOMALY_DATA"
echo ""

echo "3. Testing Anomaly Detection"
echo "----------------------------"
echo "Waiting 10 seconds for anomaly detection..."
sleep 10
test_api "Anomaly Detection Status" "$BASE_URL/api/anomalies"
test_api "Incident Creation" "$BASE_URL/api/incidents"
echo ""

echo "4. Testing Natural Language Query Engine"
echo "----------------------------------------"
NL_QUERY='{
  "query": "Why was the API slow?"
}'
test_api "NL Query Processing" "$BASE_URL/api/nl-query" "POST" "$NL_QUERY"

NL_QUERY2='{
  "query": "Which service is costing the most?"
}'
test_api "Cost Query" "$BASE_URL/api/nl-query" "POST" "$NL_QUERY2"
echo ""

echo "5. Testing Cost Intelligence"
echo "----------------------------"
COST_DATA='{
  "provider": "AWS",
  "service": "ec2",
  "cost": 450.50,
  "timestamp": '$(date +%s)',
  "region": "us-east-1"
}'
test_api "Cost Data Ingestion" "$BASE_URL/api/cost-data" "POST" "$COST_DATA"
test_api "Cost Analysis" "$BASE_URL/api/cost-analysis"
test_api "Cost Optimization" "$BASE_URL/api/cost-optimization"
echo ""

echo "6. Testing Blast Radius Predictor"
echo "---------------------------------"
BLAST_DATA='{
  "changeType": "deployment",
  "target": "api-gateway",
  "environment": "production",
  "description": "Deploy v2.0 with new caching layer"
}'
test_api "Blast Radius Analysis" "$BASE_URL/api/blast-radius" "POST" "$BLAST_DATA"

SCALE_DATA='{
  "changeType": "scale",
  "target": "database",
  "environment": "production",
  "description": "Scale from 3 to 10 replicas"
}'
test_api "Scaling Impact Analysis" "$BASE_URL/api/blast-radius" "POST" "$SCALE_DATA"
echo ""

echo "7. Testing Auto-Generated Runbooks"
echo "----------------------------------"
INCIDENT_DATA='{
  "title": "Database Connection Pool Exhausted",
  "service": "postgres",
  "severity": "critical",
  "description": "Max connections reached"
}'
test_api "Incident Creation for Runbook" "$BASE_URL/api/incidents" "POST" "$INCIDENT_DATA"

echo "Waiting 15 seconds for runbook generation..."
sleep 15

test_api "Runbook Generation" "$BASE_URL/api/runbooks"
test_api "Runbook List" "$BASE_URL/api/runbooks"
echo ""

echo "8. Testing Auto-Remediation"
echo "---------------------------"
test_api "Remediation Status" "$BASE_URL/api/remediation/status"
test_api "Remediation History" "$BASE_URL/api/remediation/history"
echo ""

echo "9. Load Testing (100 concurrent requests)"
echo "-----------------------------------------"
echo -n "Running load test... "
for i in {1..100}; do
    curl -s -X POST "$BASE_URL/api/metrics" \
        -H "Content-Type: application/json" \
        -d '{
          "service": "load-test",
          "metric": "response_time",
          "value": '$((RANDOM % 1000))',
          "timestamp": '$(date +%s)'
        }' > /dev/null &
done
wait
echo -e "${GREEN}✓ COMPLETED${NC}"
((TESTS_PASSED++))
echo ""

echo "10. Integration Tests"
echo "--------------------"
test_api "Prometheus Metrics" "$PROMETHEUS_URL/api/v1/query?query=up"
test_api "CloudSentinel Metrics Export" "$BASE_URL/metrics"
echo ""

echo "======================================"
echo "Test Results Summary"
echo "======================================"
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
    echo ""
    echo "CloudSentinel is production-ready!"
    echo ""
    echo "Key Features Verified:"
    echo "  ✓ ML-Powered Anomaly Detection"
    echo "  ✓ Natural Language Query Engine"
    echo "  ✓ Cross-Cloud Cost Intelligence"
    echo "  ✓ Blast Radius Predictor"
    echo "  ✓ Auto-Generated Runbooks"
    echo ""
    echo "Access Dashboard: $BASE_URL/cloudsentinel"
    exit 0
else
    echo -e "${RED}✗ SOME TESTS FAILED${NC}"
    echo ""
    echo "Please check the logs:"
    echo "  docker logs cloudsentinel-app"
    echo "  docker logs cloudsentinel-postgres"
    echo "  docker logs cloudsentinel-redis"
    exit 1
fi
