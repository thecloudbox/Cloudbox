#!/bin/bash

set -e

echo "======================================"
echo "CloudSentinel Deployment Tests"
echo "======================================"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

BASE_URL="http://localhost:3000"
PROMETHEUS_URL="http://localhost:9090"
GRAFANA_URL="http://localhost:3001"

PASSED=0
FAILED=0

test_endpoint() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}
    
    echo -n "Testing $name... "
    
    response_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response_code" -eq "$expected_code" ]; then
        echo -e "${GREEN}✓ PASSED${NC} (HTTP $response_code)"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $response_code, expected $expected_code)"
        ((FAILED++))
    fi
}

test_json_endpoint() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=${4:-""}
    
    echo -n "Testing $name... "
    
    if [ "$method" == "POST" ]; then
        response=$(curl -s -X POST "$url" -H "Content-Type: application/json" -d "$data")
    else
        response=$(curl -s "$url")
    fi
    
    if echo "$response" | jq . &> /dev/null; then
        echo -e "${GREEN}✓ PASSED${NC} (Valid JSON)"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC} (Invalid JSON)"
        ((FAILED++))
    fi
}

echo "1. Service Health Checks"
echo "------------------------"
test_endpoint "CloudSentinel Health" "$BASE_URL/api/health"
test_endpoint "Prometheus Health" "$PROMETHEUS_URL/-/healthy"
test_endpoint "Grafana Health" "$GRAFANA_URL/api/health"
echo ""

echo "2. CloudSentinel API Tests"
echo "--------------------------"
test_json_endpoint "NL Query API" "$BASE_URL/api/query" "POST" '{"query":"Why was the API slow?"}'
test_json_endpoint "Blast Radius API" "$BASE_URL/api/blast-radius" "POST" '{"service":"api-gateway","changeType":"deployment"}'
test_json_endpoint "Cost Analysis API" "$BASE_URL/api/cost-analysis"
test_json_endpoint "Runbooks API" "$BASE_URL/api/runbooks"
echo ""

echo "3. Database Tests"
echo "-----------------"
echo -n "Testing PostgreSQL connection... "
if docker exec cloudsentinel-db pg_isready -U sentinel &> /dev/null; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi

echo -n "Testing Redis connection... "
if docker exec cloudsentinel-redis redis-cli ping &> /dev/null; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi
echo ""

echo "4. Container Health"
echo "-------------------"
containers=("cloudsentinel-web" "cloudsentinel-db" "cloudsentinel-redis" "cloudsentinel-prometheus" "cloudsentinel-grafana")

for container in "${containers[@]}"; do
    echo -n "Testing $container... "
    if docker ps --filter "name=$container" --filter "status=running" | grep -q "$container"; then
        echo -e "${GREEN}✓ RUNNING${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ NOT RUNNING${NC}"
        ((FAILED++))
    fi
done
echo ""

echo "5. Performance Tests"
echo "--------------------"
echo -n "Testing response time... "
start_time=$(date +%s%N)
curl -s "$BASE_URL/api/health" > /dev/null
end_time=$(date +%s%N)
response_time=$(( (end_time - start_time) / 1000000 ))

if [ "$response_time" -lt 1000 ]; then
    echo -e "${GREEN}✓ PASSED${NC} (${response_time}ms)"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ SLOW${NC} (${response_time}ms)"
    ((PASSED++))
fi
echo ""

echo "======================================"
echo "Test Results"
echo "======================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "Total:  $((PASSED + FAILED))"
echo ""

if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed! ✗${NC}"
    exit 1
fi
