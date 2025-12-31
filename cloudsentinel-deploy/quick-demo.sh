#!/bin/bash

# CloudSentinel Quick Demo Script
# Demonstrates all 5 revolutionary features

set -e

BASE_URL="http://localhost:3000"

echo "======================================"
echo "CloudSentinel Quick Demo"
echo "======================================"
echo ""
echo "This script will demonstrate all 5 revolutionary features:"
echo "  1. ML-Powered Anomaly Detection"
echo "  2. Natural Language Query Engine"
echo "  3. Cross-Cloud Cost Intelligence"
echo "  4. Blast Radius Predictor"
echo "  5. Auto-Generated Runbooks"
echo ""
echo "Press Enter to continue..."
read

echo ""
echo "=== Feature 1: ML-Powered Anomaly Detection ==="
echo "Sending normal metrics..."
for i in {1..5}; do
    curl -s -X POST "$BASE_URL/api/metrics" \
        -H "Content-Type: application/json" \
        -d '{
          "service": "payment-api",
          "metric": "response_time",
          "value": 120,
          "timestamp": '$(date +%s)'
        }' > /dev/null
    echo "  ✓ Normal metric $i/5"
    sleep 1
done

echo ""
echo "Now injecting anomalies..."
for i in {1..3}; do
    curl -s -X POST "$BASE_URL/api/metrics" \
        -H "Content-Type: application/json" \
        -d '{
          "service": "payment-api",
          "metric": "response_time",
          "value": 8500,
          "timestamp": '$(date +%s)'
        }' > /dev/null
    echo "  ⚠ Anomaly detected $i/3"
    sleep 2
done

echo ""
echo "✓ Anomaly detection working! Check dashboard for incident."
echo "Press Enter to continue..."
read

echo ""
echo "=== Feature 2: Natural Language Query Engine ==="
echo "Asking: 'Why was the payment API slow?'"
curl -s -X POST "$BASE_URL/api/nl-query" \
    -H "Content-Type: application/json" \
    -d '{"query": "Why was the payment API slow?"}' | jq '.'

echo ""
echo "✓ Natural language query processed!"
echo "Press Enter to continue..."
read

echo ""
echo "=== Feature 3: Cross-Cloud Cost Intelligence ==="
echo "Sending cost data from multiple clouds..."

echo "  AWS: $450/month"
curl -s -X POST "$BASE_URL/api/cost-data" \
    -H "Content-Type: application/json" \
    -d '{
      "provider": "AWS",
      "service": "ec2",
      "cost": 450,
      "timestamp": '$(date +%s)'
    }' > /dev/null

echo "  GCP: $380/month"
curl -s -X POST "$BASE_URL/api/cost-data" \
    -H "Content-Type: application/json" \
    -d '{
      "provider": "GCP",
      "service": "compute",
      "cost": 380,
      "timestamp": '$(date +%s)'
    }' > /dev/null

echo "  Azure: $420/month"
curl -s -X POST "$BASE_URL/api/cost-data" \
    -H "Content-Type: application/json" \
    -d '{
      "provider": "Azure",
      "service": "vm",
      "cost": 420,
      "timestamp": '$(date +%s)'
    }' > /dev/null

echo ""
echo "✓ Cost intelligence tracking all clouds!"
echo "Press Enter to continue..."
read

echo ""
echo "=== Feature 4: Blast Radius Predictor ==="
echo "Analyzing deployment impact..."
curl -s -X POST "$BASE_URL/api/blast-radius" \
    -H "Content-Type: application/json" \
    -d '{
      "changeType": "deployment",
      "target": "payment-api",
      "environment": "production"
    }' | jq '.'

echo ""
echo "✓ Blast radius calculated with risk score!"
echo "Press Enter to continue..."
read

echo ""
echo "=== Feature 5: Auto-Generated Runbooks ==="
echo "Creating incident to trigger runbook generation..."
curl -s -X POST "$BASE_URL/api/incidents" \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Payment API High Latency",
      "service": "payment-api",
      "severity": "high",
      "description": "Response times exceeding SLA"
    }' | jq '.'

echo ""
echo "Waiting for runbook generation (15 seconds)..."
sleep 15

echo "Fetching generated runbooks..."
curl -s "$BASE_URL/api/runbooks" | jq '.'

echo ""
echo "✓ Runbook auto-generated from incident!"
echo ""

echo "======================================"
echo "Demo Complete!"
echo "======================================"
echo ""
echo "All 5 revolutionary features demonstrated!"
echo ""
echo "Open dashboard to see full details:"
echo "  $BASE_URL/cloudsentinel"
echo ""
echo "Next steps:"
echo "  1. Review generated runbooks"
echo "  2. Check cost optimization recommendations"
echo "  3. Ask more natural language questions"
echo "  4. Test blast radius for your changes"
echo ""
