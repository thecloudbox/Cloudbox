# MySQL ChaosBox - Chaos Engineering for MySQL Family

## Overview

MySQL ChaosBox is a comprehensive chaos engineering tool designed to inject controlled failures into MySQL infrastructure to help DBAs build resilient systems and practice troubleshooting.

## Supported Targets

### 1. MySQL Server
- Process crashes and restarts
- Slow query injection
- Connection exhaustion
- Disk space consumption
- Memory pressure
- Table corruption simulation
- Deadlock injection

### 2. MySQL Replication
- Slave lag injection
- Replication thread failures (IO/SQL)
- Binary log corruption
- GTID gaps and inconsistencies
- Multi-source replication failures
- Relay log corruption

### 3. ProxySQL
- Backend server marking
- Query routing manipulation
- Connection pool exhaustion
- Configuration reload failures
- Query rule disruption

### 4. Percona XtraDB Cluster (PXC)
- Node crashes
- Network partitions (split-brain)
- Flow control injection
- SST/IST failures
- Write conflicts
- Quorum loss scenarios

### 5. Performance Degradation
- CPU throttling
- IO delays and spikes
- Network latency injection
- Packet loss
- Table lock contention
- Long-running transactions

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ChaosBox Controller                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web UI     │  │  REST API    │  │   Scheduler  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
    ┌───────▼─────┐  ┌──────▼──────┐  ┌───▼──────────┐
    │   Agent 1   │  │   Agent 2   │  │   Agent N    │
    │  (MySQL)    │  │ (ProxySQL)  │  │   (PXC)      │
    └─────────────┘  └─────────────┘  └──────────────┘
            │               │               │
    ┌───────▼───────────────▼───────────────▼──────┐
    │        Prometheus Metrics Exporter            │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
    │  │ Events   │  │ Impact   │  │ Recovery │   │
    │  └──────────┘  └──────────┘  └──────────┘   │
    └───────────────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   Grafana      │
                    │   Dashboards   │
                    └────────────────┘
```

## Installation

### On-Premise

```bash
# Download binary
wget https://github.com/thecloudbox/mysql-chaosbox/releases/latest/chaosbox

# Install as systemd service
sudo ./chaosbox install --controller

# On each MySQL node
sudo ./chaosbox install --agent
```

### Kubernetes/Cloud

```bash
# Install via Helm
helm repo add chaosbox https://thecloudbox.io/charts
helm install mysql-chaosbox chaosbox/mysql-chaosbox

# Or via kubectl
kubectl apply -f https://thecloudbox.io/k8s/mysql-chaosbox.yaml
```

### Docker Compose

```bash
cd mysql-chaosbox
docker-compose up -d
```

## Configuration

### chaos-config.yaml

```yaml
chaos:
  # Target configuration
  targets:
    - name: mysql-master
      type: mysql
      host: 10.0.1.10
      port: 3306
      user: chaosbox
      password: ${CHAOS_MYSQL_PASSWORD}
      
    - name: mysql-slave-1
      type: mysql-slave
      host: 10.0.1.11
      port: 3306
      master: mysql-master
      
    - name: proxysql-1
      type: proxysql
      host: 10.0.1.20
      admin_port: 6032
      
    - name: pxc-node-1
      type: pxc
      host: 10.0.2.10
      cluster: pxc-cluster-1

  # Chaos scenarios
  scenarios:
    # MySQL Server failures
    - name: mysql-crash
      type: process-kill
      target: mysql-master
      signal: SIGKILL
      frequency: random
      duration: 30s
      
    - name: slow-query-storm
      type: query-injection
      target: mysql-master
      query: "SELECT SLEEP(10) FROM information_schema.tables"
      connections: 50
      duration: 5m
      
    - name: connection-exhaustion
      type: connection-flood
      target: mysql-master
      connections: 1000
      duration: 2m
      
    - name: disk-pressure
      type: disk-fill
      target: mysql-master
      path: /var/lib/mysql
      fill_percent: 95
      duration: 5m
      
    # Replication chaos
    - name: replication-lag
      type: slave-delay
      target: mysql-slave-1
      delay_seconds: 300
      duration: 10m
      
    - name: replication-break
      type: replication-stop
      target: mysql-slave-1
      thread: SQL  # or IO
      duration: 5m
      
    - name: gtid-gap
      type: gtid-inject-gap
      target: mysql-slave-1
      gap_size: 10
      
    # ProxySQL chaos
    - name: backend-down
      type: proxysql-backend-down
      target: proxysql-1
      backend: mysql-master
      duration: 3m
      
    - name: query-routing-chaos
      type: proxysql-rule-disable
      target: proxysql-1
      rule_id: 1
      duration: 2m
      
    # PXC chaos
    - name: pxc-node-crash
      type: process-kill
      target: pxc-node-1
      signal: SIGKILL
      
    - name: pxc-network-partition
      type: network-partition
      target: pxc-node-1
      partition_from: [pxc-node-2, pxc-node-3]
      duration: 5m
      
    - name: pxc-flow-control
      type: pxc-flow-control
      target: pxc-node-1
      inject: true
      duration: 3m
      
    # Performance degradation
    - name: cpu-throttle
      type: cpu-stress
      target: mysql-master
      cores: 2
      percent: 80
      duration: 5m
      
    - name: io-latency
      type: io-delay
      target: mysql-master
      delay_ms: 100
      device: /dev/sda
      duration: 5m
      
    - name: network-latency
      type: network-delay
      target: mysql-master
      latency_ms: 200
      jitter_ms: 50
      duration: 5m
      
    - name: packet-loss
      type: network-loss
      target: mysql-master
      loss_percent: 10
      duration: 3m

  # Scheduling
  schedules:
    - name: daily-chaos
      scenarios:
        - mysql-crash
        - replication-lag
        - slow-query-storm
      cron: "0 2 * * *"  # 2 AM daily
      
    - name: stress-test
      scenarios:
        - connection-exhaustion
        - cpu-throttle
        - io-latency
      trigger: manual

  # Monitoring
  metrics:
    prometheus:
      enabled: true
      port: 9090
      path: /metrics
      
    export:
      - chaos_event_total
      - chaos_event_duration_seconds
      - chaos_impact_queries_affected
      - chaos_impact_connections_affected
      - chaos_recovery_time_seconds
      - mysql_available
      - mysql_replication_lag_seconds
      - mysql_connections_current
      - proxysql_backend_status
      - pxc_cluster_size
      - pxc_cluster_status

  # Safety
  safety:
    # Prevent chaos during critical windows
    blackout_windows:
      - start: "08:00"
        end: "18:00"
        days: [Mon, Tue, Wed, Thu, Fri]
        
    # Rollback conditions
    auto_rollback:
      - condition: "mysql_available == 0 AND duration > 5m"
      - condition: "mysql_connections_current == 0"
      - condition: "pxc_cluster_size < 2"
      
    # Health checks before chaos
    pre_checks:
      - "mysql_replication_lag < 10s"
      - "mysql_connections_current < max_connections * 0.8"
      - "disk_usage < 85%"
```

## Metrics & Dashboards

### Prometheus Metrics

```
# Chaos events
chaos_event_total{target="mysql-master",scenario="mysql-crash",result="success"} 5
chaos_event_duration_seconds{target="mysql-master",scenario="mysql-crash"} 30.5

# Impact metrics
chaos_impact_queries_affected{target="mysql-master"} 1543
chaos_impact_connections_affected{target="mysql-master"} 89
chaos_impact_replication_lag_seconds{target="mysql-slave-1"} 245

# Recovery metrics
chaos_recovery_time_seconds{target="mysql-master",scenario="mysql-crash"} 12.3
chaos_recovery_method{target="mysql-master"} "auto"

# Target health
mysql_up{instance="mysql-master"} 1
mysql_replication_lag_seconds{instance="mysql-slave-1"} 0
proxysql_backend_status{backend="mysql-master"} 1
pxc_cluster_size{cluster="pxc-cluster-1"} 3
```

### Grafana Dashboard

Pre-built dashboards available at `/grafana-dashboards/mysql-chaosbox.json`

## Test Scenarios

### Scenario 1: Master Crash Recovery

```yaml
test:
  name: "Master Crash and Failover"
  objectives:
    - Verify automatic failover to slave
    - Measure recovery time < 30s
    - Ensure zero data loss
  steps:
    - inject: mysql-crash
      target: mysql-master
    - verify: mysql-slave-1 promoted
    - verify: applications reconnected
    - verify: replication_restored
  success_criteria:
    - recovery_time < 30
    - data_loss == 0
    - failover_success == true
```

### Scenario 2: Replication Lag Impact

```yaml
test:
  name: "High Replication Lag"
  objectives:
    - Test application behavior with stale reads
    - Verify monitoring alerts
    - Test lag recovery
  steps:
    - inject: replication-lag
      target: mysql-slave-1
      delay: 300
    - monitor: application_errors
    - monitor: alert_fired
    - remove: replication-lag
    - verify: lag_catchup < 60s
```

### Scenario 3: PXC Split Brain

```yaml
test:
  name: "PXC Network Partition"
  objectives:
    - Test split-brain handling
    - Verify quorum behavior
    - Test node rejoin
  steps:
    - inject: pxc-network-partition
      partition: [pxc-node-1] vs [pxc-node-2, pxc-node-3]
    - verify: node-1 becomes non-primary
    - verify: writes_blocked on node-1
    - remove: partition
    - verify: node-1 rejoined
    - verify: data_consistency
```

## Integration with Existing Monitoring

### Prometheus Integration

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'mysql-chaosbox'
    static_configs:
      - targets: ['chaosbox-controller:9090']
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: 'chaos_.*'
        action: keep
```

### Grafana Setup

```bash
# Import dashboard
curl -X POST http://grafana:3000/api/dashboards/import \
  -H "Content-Type: application/json" \
  -d @grafana-dashboards/mysql-chaosbox.json
```

### Alert Manager

```yaml
# alertmanager.yml
route:
  receiver: 'dba-team'
  group_by: ['chaos_scenario']
  
receivers:
  - name: 'dba-team'
    slack_configs:
      - channel: '#dba-alerts'
        title: 'Chaos Event: {{ .GroupLabels.chaos_scenario }}'
```

## CLI Usage

```bash
# Start chaos scenario
chaosbox run --scenario mysql-crash

# Run test suite
chaosbox test --suite replication-tests

# List active chaos
chaosbox list

# Stop all chaos
chaosbox stop --all

# Generate report
chaosbox report --last 24h --output pdf
```

## API Examples

```bash
# Trigger chaos via API
curl -X POST http://chaosbox:8080/api/chaos/start \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "mysql-crash",
    "target": "mysql-master",
    "duration": "30s"
  }'

# Get chaos status
curl http://chaosbox:8080/api/chaos/status

# Stop chaos
curl -X POST http://chaosbox:8080/api/chaos/stop/12345
```

## Building Time-Series Database

If you don't have existing monitoring:

### Option 1: All-in-One Stack (Recommended)

```bash
docker-compose -f monitoring-stack.yml up -d
```

Includes:
- Prometheus (metrics storage)
- Grafana (visualization)
- AlertManager (alerting)
- Node Exporter (system metrics)
- MySQL Exporter (MySQL metrics)

### Option 2: Kubernetes Stack

```bash
helm install monitoring prometheus-community/kube-prometheus-stack
```

### Option 3: VictoriaMetrics (Lightweight)

```bash
# Single-node deployment
docker run -p 8428:8428 victoriametrics/victoria-metrics
```

## Best Practices

1. **Start Small**: Begin with read-only chaos (metrics collection) before destructive tests
2. **Test in Non-Prod First**: Always validate scenarios in staging
3. **Set Blackout Windows**: Avoid chaos during business hours initially
4. **Monitor Everything**: Ensure comprehensive monitoring before chaos
5. **Document Runbooks**: Create recovery procedures for each scenario
6. **Gradual Rollout**: Increase chaos intensity over time
7. **Team Training**: Ensure DBA team is familiar with tool before production use

## Troubleshooting

### Chaos not injecting

```bash
# Check agent status
chaosbox agent status

# Check connectivity
chaosbox test connection --target mysql-master

# View logs
journalctl -u chaosbox-agent -f
```

### Metrics not appearing

```bash
# Verify Prometheus endpoint
curl http://chaosbox:9090/metrics

# Check Prometheus targets
curl http://prometheus:9090/api/v1/targets
```

## Support

- Documentation: https://thecloudbox.io/docs/mysql-chaosbox
- GitHub: https://github.com/thecloudbox/mysql-chaosbox
- Community: https://community.thecloudbox.io
