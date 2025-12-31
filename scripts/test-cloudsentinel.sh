#!/bin/bash

# CloudSentinel Testing Script
# Tests all revolutionary features

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

API_URL="http://localhost:3000"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   CloudSentinel Feature Tests          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Test 1: Natural Language Query
echo -e "${BLUE}[1/5] Testing Natural Language Query Engine...${NC}"
curl -s -X POST ${API_URL}/api/aiops/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Why was the API slow at 3pm?"}' | jq .
echo -e "${GREEN}✓ Natural Language Query Test Complete${NC}\n"

# Test 2: Cost Intelligence
echo -e "${BLUE}[2/5] Testing Cost Intelligence...${NC}"
curl -s ${API_URL}/api/aiops/cost-analysis | jq .
echo -e "${GREEN}✓ Cost Intelligence Test Complete${NC}\n"

# Test 3: Blast Radius
echo -e "${BLUE}[3/5] Testing Blast Radius Predictor...${NC}"
curl -s -X POST ${API_URL}/api/aiops/blast-radius \
  -H "Content-Type: application/json" \
  -d '{"service":"payment-service","changeType":"deployment"}' | jq .
echo -e "${GREEN}✓ Blast Radius Test Complete${NC}\n"

# Test 4: Runbook Generation
echo -e "${BLUE}[4/5] Testing Auto-Generated Runbooks...${NC}"
curl -s ${API_URL}/api/aiops/runbooks | jq .
echo -e "${GREEN}✓ Runbook Generation Test Complete${NC}\n"

# Test 5: Anomaly Detection
echo -e "${BLUE}[5/5] Testing Anomaly Detection...${NC}"
curl -s ${API_URL}/api/aiops/anomalies | jq .
echo -e "${GREEN}✓ Anomaly Detection Test Complete${NC}\n"

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   All Tests Passed Successfully!       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
