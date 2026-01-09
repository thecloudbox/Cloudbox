#!/bin/bash

# MySQL ChaosBox Quick Start Script

set -e

echo "╔══════════════════════════════════════════════════════════╗"
echo "║        MySQL ChaosBox - Quick Start Installation         ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check prerequisites
echo "[1/6] Checking prerequisites..."
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose is required but not installed. Aborting." >&2; exit 1; }

# Download configuration
echo "[2/6] Downloading configuration files..."
curl -sL https://thecloudbox.io/downloads/mysql-chaosbox/chaos-config.yaml -o chaos-config.yaml
curl -sL https://thecloudbox.io/downloads/mysql-chaosbox/prometheus.yml -o prometheus.yml
curl -sL https://thecloudbox.io/downloads/mysql-chaosbox/docker-compose.yml -o docker-compose.yml

# Configure MySQL credentials
echo "[3/6] Configuring MySQL credentials..."
read -sp "Enter MySQL password for chaos user: " MYSQL_PASSWORD
echo ""
export MYSQL_PASSWORD

# Start services
echo "[4/6] Starting ChaosBox services..."
docker-compose up -d

# Wait for services
echo "[5/6] Waiting for services to be ready..."
sleep 10

# Import Grafana dashboard
echo "[6/6] Importing Grafana dashboard..."
curl -X POST http://admin:admin@localhost:3000/api/dashboards/import \
  -H "Content-Type: application/json" \
  -d @grafana-dashboards/mysql-chaosbox.json

echo ""
echo "✅ MySQL ChaosBox is ready!"
echo ""
echo "Access points:"
echo "  - ChaosBox API:  http://localhost:8080"
echo "  - Prometheus:    http://localhost:9091"
echo "  - Grafana:       http://localhost:3000 (admin/admin)"
echo "  - Metrics:       http://localhost:9090/metrics"
echo ""
echo "Quick commands:"
echo "  chaosbox run --scenario mysql-crash --target mysql-master"
echo "  chaosbox list"
echo "  chaosbox stop --all"
echo ""
echo "Documentation: https://thecloudbox.io/docs/mysql-chaosbox"
