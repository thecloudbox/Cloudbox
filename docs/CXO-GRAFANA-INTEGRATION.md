# CXO Cost Intelligence: Grafana Integration

## Overview
Integrate CloudSentinel cost data with Grafana for real-time cost visualization and alerting.

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Cloud APIs     │────▶│ CloudSentinel│────▶│  PostgreSQL │
│ AWS/GCP/Azure   │     │  Cost Engine │     │   Database  │
└─────────────────┘     └──────────────┘     └──────┬──────┘
                                                     │
                        ┌────────────────────────────┘
                        │
                        ▼
                ┌───────────────┐
                │   Grafana     │
                │  Datasource   │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │   Dashboards  │
                │  - Cost/Hour  │
                │  - By Service │
                │  - Forecasts  │
                └───────────────┘
```

## Grafana Setup

### 1. PostgreSQL Data Source Configuration

```yaml
# grafana-datasources.yaml
apiVersion: 1
datasources:
  - name: CloudSentinel-Costs
    type: postgres
    access: proxy
    url: postgres:5432
    database: cloudsentinel
    user: grafana_reader
    secureJsonData:
      password: ${GRAFANA_DB_PASSWORD}
    jsonData:
      sslmode: require
      postgresVersion: 1400
      timescaledb: true
```

### 2. Custom Prometheus Metrics Export

Export cost metrics to Prometheus for Grafana:

```python
# app/api/cloudsentinel/prometheus/route.ts
from prometheus_client import Gauge, generate_latest

# Define metrics
cost_per_service = Gauge('cloudsentinel_cost_per_service_usd', 
                         'Cost per service in USD',
                         ['service_name', 'cost_type', 'cloud_provider'])

cpu_cost = Gauge('cloudsentinel_cpu_cost_usd',
                'CPU cost in USD',
                ['service_name'])

memory_cost = Gauge('cloudsentinel_memory_cost_usd',
                   'Memory cost in USD', 
                   ['service_name'])

storage_cost = Gauge('cloudsentinel_storage_cost_usd',
                    'Storage cost in USD',
                    ['service_name', 'storage_type'])

network_cost = Gauge('cloudsentinel_network_cost_usd',
                    'Network cost in USD',
                    ['service_name', 'direction'])

def update_metrics():
    # Fetch from database
    costs = get_current_costs()
    
    for cost in costs:
        cost_per_service.labels(
            service_name=cost.service,
            cost_type=cost.type,
            cloud_provider=cost.provider
        ).set(cost.amount)
        
        if cost.type == 'compute':
            cpu_cost.labels(service_name=cost.service).set(cost.cpu_cost)
            memory_cost.labels(service_name=cost.service).set(cost.memory_cost)

# Export endpoint
def metrics_endpoint():
    update_metrics()
    return generate_latest()
```

### 3. Prometheus Scrape Config

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'cloudsentinel-costs'
    scrape_interval: 5m
    static_configs:
      - targets: ['cloudsentinel:3030']
    metrics_path: '/api/cloudsentinel/prometheus'
```

## Grafana Dashboards

### Dashboard 1: CXO Cost Overview

```json
{
  "dashboard": {
    "title": "CXO Cost Intelligence",
    "panels": [
      {
        "title": "Total Cost (Last 30 Days)",
        "type": "stat",
        "targets": [{
          "rawSql": "SELECT SUM(cost_usd) FROM service_costs WHERE timestamp > NOW() - INTERVAL '30 days'"
        }]
      },
      {
        "title": "Cost by Service",
        "type": "piechart",
        "targets": [{
          "rawSql": "SELECT service_name, SUM(cost_usd) as cost FROM service_costs WHERE timestamp > NOW() - INTERVAL '7 days' GROUP BY service_name"
        }]
      },
      {
        "title": "Cost Trend (7 Days)",
        "type": "timeseries",
        "targets": [{
          "rawSql": "SELECT time_bucket('1 hour', timestamp) as time, service_name, SUM(cost_usd) as cost FROM service_costs WHERE timestamp > NOW() - INTERVAL '7 days' GROUP BY time, service_name ORDER BY time"
        }]
      },
      {
        "title": "Cost by Type",
        "type": "barchart",
        "targets": [{
          "rawSql": "SELECT cost_type, SUM(cost_usd) as cost FROM service_costs WHERE timestamp > NOW() - INTERVAL '24 hours' GROUP BY cost_type"
        }]
      }
    ]
  }
}
```

### Dashboard 2: Service Deep Dive

```json
{
  "dashboard": {
    "title": "Service Cost Breakdown: ${service}",
    "templating": {
      "list": [{
        "name": "service",
        "type": "query",
        "query": "SELECT DISTINCT service_name FROM service_costs"
      }]
    },
    "panels": [
      {
        "title": "CPU Cost",
        "type": "timeseries",
        "targets": [{
          "expr": "cloudsentinel_cpu_cost_usd{service_name='$service'}"
        }]
      },
      {
        "title": "Memory Cost",
        "type": "timeseries",
        "targets": [{
          "expr": "cloudsentinel_memory_cost_usd{service_name='$service'}"
        }]
      },
      {
        "title": "Storage Cost by Type",
        "type": "timeseries",
        "targets": [{
          "expr": "cloudsentinel_storage_cost_usd{service_name='$service'}"
        }]
      },
      {
        "title": "Network Cost (Ingress/Egress)",
        "type": "timeseries",
        "targets": [{
          "expr": "cloudsentinel_network_cost_usd{service_name='$service'}"
        }]
      }
    ]
  }
}
```

### Dashboard 3: Shared Infrastructure Allocation

```json
{
  "dashboard": {
    "title": "Shared Infrastructure Cost Allocation",
    "panels": [
      {
        "title": "Kubernetes Cluster Costs",
        "type": "table",
        "targets": [{
          "rawSql": "SELECT service_name, cluster_name, cpu_allocation_percent, memory_allocation_percent, allocated_cost_usd FROM shared_infrastructure_allocation WHERE resource_type = 'kubernetes' ORDER BY allocated_cost_usd DESC"
        }]
      },
      {
        "title": "Shared Storage Allocation",
        "type": "barchart",
        "targets": [{
          "rawSql": "SELECT service_name, SUM(allocated_cost_usd) as cost FROM shared_infrastructure_allocation WHERE resource_type = 'storage' GROUP BY service_name"
        }]
      },
      {
        "title": "Load Balancer Cost Split",
        "type": "piechart",
        "targets": [{
          "rawSql": "SELECT service_name, SUM(allocated_cost_usd) as cost FROM shared_infrastructure_allocation WHERE resource_type = 'load_balancer' GROUP BY service_name"
        }]
      }
    ]
  }
}
```

### Dashboard 4: Cost Anomaly Detection

```json
{
  "dashboard": {
    "title": "Cost Anomalies & Alerts",
    "panels": [
      {
        "title": "Cost Anomalies (Z-Score > 3)",
        "type": "table",
        "targets": [{
          "rawSql": "SELECT timestamp, service_name, cost_usd, expected_cost, zscore FROM cost_anomalies WHERE zscore > 3 ORDER BY timestamp DESC LIMIT 20"
        }]
      },
      {
        "title": "Unexpected Cost Spikes",
        "type": "timeseries",
        "targets": [{
          "rawSql": "SELECT time_bucket('1 hour', timestamp) as time, service_name, AVG(cost_usd) as actual, AVG(expected_cost) as expected FROM cost_anomalies GROUP BY time, service_name"
        }]
      }
    ]
  }
}
```

## SQL Queries for Grafana

### Query 1: Hourly Cost by Service
```sql
SELECT 
  time_bucket('1 hour', timestamp) AS time,
  service_name,
  SUM(cost_usd) as cost
FROM service_costs
WHERE timestamp > $__timeFrom() AND timestamp < $__timeTo()
GROUP BY time, service_name
ORDER BY time;
```

### Query 2: Cost Per Pod (Kubernetes)
```sql
SELECT 
  pod_name,
  namespace,
  service_name,
  cpu_cost_usd + memory_cost_usd + storage_cost_usd as total_cost
FROM pod_costs
WHERE timestamp > NOW() - INTERVAL '1 day'
ORDER BY total_cost DESC
LIMIT 50;
```

### Query 3: Network Cost by Direction
```sql
SELECT 
  time_bucket('1 hour', timestamp) AS time,
  service_name,
  SUM(CASE WHEN direction = 'ingress' THEN cost_usd ELSE 0 END) as ingress_cost,
  SUM(CASE WHEN direction = 'egress' THEN cost_usd ELSE 0 END) as egress_cost
FROM network_costs
WHERE timestamp > $__timeFrom()
GROUP BY time, service_name
ORDER BY time;
```

### Query 4: Storage Cost by Type
```sql
SELECT 
  storage_type,
  service_name,
  SUM(storage_gb) as total_gb,
  SUM(cost_usd) as total_cost,
  SUM(cost_usd) / SUM(storage_gb) as cost_per_gb
FROM storage_costs
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY storage_type, service_name
ORDER BY total_cost DESC;
```

## Alert Configuration

### Alert 1: Cost Spike Detection
```yaml
alert: ServiceCostSpike
expr: |
  (
    rate(cloudsentinel_cost_per_service_usd[5m]) 
    / 
    rate(cloudsentinel_cost_per_service_usd[1h] offset 1d)
  ) > 2
for: 10m
labels:
  severity: warning
annotations:
  summary: "Cost spike detected for {{ $labels.service_name }}"
  description: "Service {{ $labels.service_name }} cost increased by {{ $value }}x"
```

### Alert 2: Budget Threshold
```yaml
alert: BudgetThresholdExceeded
expr: |
  sum(cloudsentinel_cost_per_service_usd) by (service_name) 
  > 
  on(service_name) service_budget_usd * 0.9
for: 1h
labels:
  severity: critical
annotations:
  summary: "Budget threshold exceeded for {{ $labels.service_name }}"
  description: "Service {{ $labels.service_name }} at 90% of monthly budget"
```

### Alert 3: Untagged Resource Cost
```yaml
alert: UntaggedResourceCost
expr: |
  cloudsentinel_cost_per_service_usd{service_name="untagged"} > 100
for: 30m
labels:
  severity: info
annotations:
  summary: "Significant cost from untagged resources"
  description: "Untagged resources costing ${{ $value }} per hour"
```

## Grafana Dashboard Provisioning

```yaml
# docker-compose.yml
services:
  grafana:
    image: grafana/grafana:latest
    volumes:
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_AUTH_ANONYMOUS_ENABLED=false
    ports:
      - "3000:3000"
```

## Implementation Steps

1. **Deploy Prometheus Exporter** (Week 1)
   - Create `/api/cloudsentinel/prometheus` endpoint
   - Export cost metrics in Prometheus format
   - Configure scraping

2. **Setup Grafana Datasources** (Week 1)
   - Configure PostgreSQL datasource
   - Configure Prometheus datasource
   - Test connectivity

3. **Create Dashboards** (Week 2)
   - CXO Overview dashboard
   - Service Deep Dive dashboard
   - Shared Infrastructure dashboard
   - Anomaly Detection dashboard

4. **Configure Alerts** (Week 2)
   - Cost spike alerts
   - Budget threshold alerts
   - Untagged resource alerts

5. **Automate Deployment** (Week 3)
   - Dashboard provisioning
   - Alert rule provisioning
   - Documentation

## Benefits of Grafana Integration

1. **Real-time Visibility**: See costs as they accrue
2. **Historical Analysis**: Trend analysis over time
3. **Custom Alerting**: Get notified of cost anomalies
4. **Self-Service**: Teams can create their own dashboards
5. **Integration**: Correlate costs with performance metrics
6. **Forecasting**: Predict future costs based on trends
