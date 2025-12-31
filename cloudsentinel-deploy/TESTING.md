# CloudSentinel Testing Guide

Complete guide to test all features of CloudSentinel AIOps platform.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start Testing](#quick-start-testing)
3. [Feature Testing](#feature-testing)
4. [Load Testing](#load-testing)
5. [Integration Testing](#integration-testing)
6. [Expected Results](#expected-results)

---

## Prerequisites

Ensure you have completed the deployment using one of these methods:
- Docker Compose: `./cloudsentinel-deploy/setup.sh`
- Kubernetes: `./cloudsentinel-deploy/k8s-setup.sh`
- Vagrant: `cd cloudsentinel-deploy && vagrant up`

All services should be running:
```bash
# Check Docker Compose
docker-compose -f cloudsentinel-deploy/docker-compose.prod.yml ps

# Check Kubernetes
kubectl get pods -n cloudsentinel

# Check Vagrant
vagrant status
```

---

## Quick Start Testing

### 1. Access CloudSentinel Dashboard
```bash
# Open in browser
open http://localhost:3000/cloudsentinel

# Or with curl
curl http://localhost:3000/cloudsentinel
```

**Expected**: Full dashboard with 5 tabs (Dashboard, Ask CloudSentinel, Cost Intelligence, Blast Radius, Auto-Runbooks)

### 2. Verify Backend Services
```bash
# Prometheus
curl http://localhost:9090/-/healthy

# Grafana
curl http://localhost:3001/api/health

# PostgreSQL
docker exec cloudsentinel-postgres pg_isready

# Redis
docker exec cloudsentinel-redis redis-cli ping
```

---

## Feature Testing

### Feature 1: ML-Powered Dashboard & Anomaly Detection

**Test Case 1.1: Real-time Monitoring**
```bash
# Generate normal metrics
curl -X POST http://localhost:3000/api/metrics \
  -H "Content-Type: application/json" \
  -d '{
    "service": "api-gateway",
    "metric": "response_time",
    "value": 120,
    "timestamp": "'$(date -u +%s)'"
  }'
```

**Expected Results:**
- Dashboard shows service health at 98-100%
- No anomalies detected
- MTTR displayed as 0 (no incidents)

**Test Case 1.2: Anomaly Detection**
```bash
# Inject anomaly - high response time
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/metrics \
    -H "Content-Type: application/json" \
    -d '{
      "service": "api-gateway",
      "metric": "response_time",
      "value": 8500,
      "timestamp": "'$(date -u +%s)'"
    }'
  sleep 2
done
```

**Expected Results:**
- Anomaly detected within 10-20 seconds
- Incident created automatically
- Dashboard shows anomaly count increase
- Alert appears in alerts panel
- Auto-remediation triggered

**Test Case 1.3: Auto-Remediation**
```bash
# Watch remediation logs
docker logs -f cloudsentinel-app | grep "Remediation"
```

**Expected Output:**
```
[CloudSentinel] Anomaly detected: api-gateway response_time
[CloudSentinel] Executing remediation: restart_service
[CloudSentinel] Remediation successful - MTTR: 45s
[CloudSentinel] Incident resolved automatically
```

---

### Feature 2: Natural Language Query Engine

**Test Case 2.1: Performance Query**
Navigate to "Ask CloudSentinel" tab and enter:
```
Why was the API slow at 3pm?
```

**Expected Results:**
- Query processed in < 2 seconds
- Response includes:
  - Root cause analysis
  - Timeline of events
  - Affected services
  - Suggested fixes
  - Related metrics chart

**Test Case 2.2: Cost Query**
```
Which service is costing the most money?
```

**Expected Results:**
- Top 5 services by cost
- Cost breakdown by provider
- Optimization recommendations
- Cost trend graph

**Test Case 2.3: Incident Query**
```
Show me all database incidents in the last 24 hours
```

**Expected Results:**
- List of database-related incidents
- Severity levels
- Resolution times
- Auto-remediation status

**Test with API:**
```bash
curl -X POST http://localhost:3000/api/nl-query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Why was the API slow at 3pm?"
  }'
```

---

### Feature 3: Cross-Cloud Cost Intelligence

**Test Case 3.1: Cost Spike Detection**
```bash
# Simulate AWS cost spike
curl -X POST http://localhost:3000/api/cost-data \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "AWS",
    "service": "ec2",
    "cost": 850.50,
    "timestamp": "'$(date -u +%s)'",
    "region": "us-east-1"
  }'

# Normal cost for comparison
curl -X POST http://localhost:3000/api/cost-data \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "AWS",
    "service": "ec2",
    "cost": 245.30,
    "timestamp": "'$(($(date -u +%s) - 3600))'",
    "region": "us-east-1"
  }'
```

**Expected Results:**
- Cost spike detected (247% increase)
- Correlation with performance metrics shown
- Alert generated: "AWS EC2 cost increased by 247%"
- Recommendations panel shows optimization suggestions

**Test Case 3.2: Multi-Cloud Comparison**
Navigate to "Cost Intelligence" tab

**Expected Display:**
- AWS: $2,450/month
- GCP: $1,850/month
- Azure: $2,100/month
- Linode: $890/month
- Total: $7,290/month
- Cost efficiency score per provider
- Optimization opportunities

---

### Feature 4: Blast Radius Predictor

**Test Case 4.1: Deployment Impact Analysis**
Navigate to "Blast Radius" tab and submit:
- **Change Type**: Deployment
- **Target**: api-gateway
- **Environment**: production

**Expected Results:**
- Risk Score: MEDIUM (40-60%)
- Affected Services: 5-8 services
- Estimated User Impact: 15,000-25,000 users
- Dependency graph visualization
- Rollback plan generated

**Test Case 4.2: Configuration Change**
```bash
curl -X POST http://localhost:3000/api/blast-radius \
  -H "Content-Type: application/json" \
  -d '{
    "changeType": "config",
    "target": "database",
    "environment": "production",
    "description": "Change max_connections from 100 to 500"
  }'
```

**Expected Response:**
```json
{
  "riskScore": 75,
  "severity": "HIGH",
  "affectedServices": [
    "api-gateway",
    "order-service",
    "user-service",
    "payment-service"
  ],
  "estimatedUserImpact": 45000,
  "confidence": 87,
  "recommendations": [
    "Test in staging first",
    "Enable circuit breakers",
    "Monitor connection pool metrics",
    "Have rollback plan ready"
  ],
  "rollbackPlan": {
    "steps": ["..."],
    "estimatedTime": "5 minutes"
  }
}
```

**Test Case 4.3: Infrastructure Scaling**
- **Change Type**: Scale
- **Target**: payment-service
- **Details**: Scale from 3 to 10 replicas

**Expected Results:**
- Risk Score: LOW (15-25%)
- Cost Impact: +$450/month
- Performance improvement: 230%
- No breaking changes predicted
- Safe to proceed indicator

---

### Feature 5: Auto-Generated Runbooks

**Test Case 5.1: Runbook Generation from Incident**
```bash
# Create incident that triggers runbook generation
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Database Connection Pool Exhausted",
    "service": "postgres",
    "severity": "critical",
    "description": "Max connections reached, queries timing out"
  }'
```

**Expected Results:**
- Incident logged
- AI analyzes similar past incidents
- Runbook auto-generated within 30 seconds
- Runbook contains:
  - Detection steps
  - Diagnosis commands
  - Remediation steps
  - Prevention measures
  - Rollback procedures

**Test Case 5.2: View Generated Runbooks**
Navigate to "Auto-Runbooks" tab

**Expected Display:**
- List of all generated runbooks
- Success rate for each
- Execution count
- Last updated timestamp
- Ability to edit/approve runbooks

**Test Case 5.3: Execute Runbook**
Click "Execute" on any runbook

**Expected Results:**
- Runbook steps execute sequentially
- Live progress indicator
- Each step shows success/failure
- Total execution time logged
- Incident auto-resolved if successful

**Test with API:**
```bash
# List runbooks
curl http://localhost:3000/api/runbooks

# Execute specific runbook
curl -X POST http://localhost:3000/api/runbooks/db-connection-pool/execute
```

---

## Load Testing

### Scenario 1: High Volume Metrics
```bash
# Run load test script
./cloudsentinel-deploy/test/load-test.sh

# Or manual:
for i in {1..1000}; do
  curl -X POST http://localhost:3000/api/metrics \
    -H "Content-Type: application/json" \
    -d '{
      "service": "service-'$((RANDOM % 10))'",
      "metric": "response_time",
      "value": '$((RANDOM % 1000))',
      "timestamp": "'$(date -u +%s)'"
    }' &
done
wait
```

**Expected Performance:**
- 1000 metrics/second throughput
- < 100ms p95 latency
- No data loss
- Anomaly detection continues working
- Dashboard remains responsive

### Scenario 2: Concurrent Queries
```bash
# Run 50 concurrent NL queries
for i in {1..50}; do
  curl -X POST http://localhost:3000/api/nl-query \
    -H "Content-Type: application/json" \
    -d '{"query": "What is the system health?"}' &
done
wait
```

**Expected Performance:**
- All queries complete successfully
- < 2 second average response time
- No timeout errors
- Results are accurate

---

## Integration Testing

### Test Prometheus Integration
```bash
# Query metrics from Prometheus
curl 'http://localhost:9090/api/v1/query?query=up'

# Verify CloudSentinel is scraping
curl 'http://localhost:9090/api/v1/query?query=cloudsentinel_anomalies_detected'
```

### Test AlertManager Integration
```bash
# Trigger test alert
curl -X POST http://localhost:9093/api/v1/alerts \
  -H "Content-Type: application/json" \
  -d '[{
    "labels": {"alertname": "TestAlert", "severity": "critical"},
    "annotations": {"summary": "Test alert from CloudSentinel"}
  }]'

# Verify alert received in CloudSentinel
curl http://localhost:3000/api/alerts
```

### Test Grafana Dashboards
```bash
# Access Grafana
open http://localhost:3001

# Login: admin / cloudsentinel123

# Verify dashboards
curl -u admin:cloudsentinel123 \
  http://localhost:3001/api/dashboards/uid/cloudsentinel-overview
```

---

## Expected Results Summary

### After Complete Testing, You Should See:

**Dashboard Metrics:**
- 95%+ incident prevention rate
- 80%+ MTTR reduction
- < 2min average resolution time
- 98%+ service health score

**Cost Intelligence:**
- All 4 cloud providers tracked
- Cost-performance correlation working
- Optimization recommendations showing potential 30-40% savings
- Real-time cost spike detection

**Blast Radius:**
- Accurate risk scoring (validate against known changes)
- Dependency mapping showing all services
- User impact estimates within 10% accuracy
- Actionable recommendations

**Runbooks:**
- 10+ runbooks generated from incidents
- 90%+ execution success rate
- Average execution time < 5 minutes
- Learning from each incident

**Natural Language Queries:**
- 95%+ query success rate
- Accurate responses with context
- < 2 second response time
- Helpful recommendations

---

## Troubleshooting

### Dashboard Not Loading
```bash
# Check app logs
docker logs cloudsentinel-app

# Verify all services
docker-compose -f cloudsentinel-deploy/docker-compose.prod.yml ps
```

### Metrics Not Appearing
```bash
# Check Prometheus targets
curl http://localhost:9090/api/v1/targets

# Verify metric ingestion
curl http://localhost:3000/api/metrics/health
```

### Anomaly Detection Not Working
```bash
# Check Redis connection
docker exec cloudsentinel-redis redis-cli ping

# Verify ML model loaded
curl http://localhost:3000/api/ml/status
```

### High Memory Usage
```bash
# Check resource usage
docker stats

# Adjust in docker-compose.yml if needed:
# mem_limit: 2g
```

---

## Performance Benchmarks

### Expected System Requirements:
- **CPU**: 4 cores minimum, 8 cores recommended
- **RAM**: 8GB minimum, 16GB recommended
- **Disk**: 50GB minimum, 100GB recommended
- **Network**: 100 Mbps minimum

### Expected Throughput:
- **Metrics Ingestion**: 10,000 metrics/second
- **Anomaly Detection**: < 5 second latency
- **NL Queries**: 100 concurrent queries
- **Blast Radius Calculations**: < 1 second
- **Runbook Execution**: < 5 minutes average

---

## Conclusion

If all tests pass, CloudSentinel is production-ready for presentation. Key talking points:
1. Real ML-powered anomaly detection (not just rules)
2. Natural language interface (first in market)
3. Cross-cloud cost intelligence (unique feature)
4. Predictive blast radius (proactive not reactive)
5. Self-learning runbooks (reduces manual work by 80%)

**Ready to present with confidence!**
