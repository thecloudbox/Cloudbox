# CloudSentinel Production Deployment Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Docker Compose Deployment](#docker-compose-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Vagrant Development Environment](#vagrant-development-environment)
5. [Testing & Validation](#testing--validation)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- Docker 24.0+ and Docker Compose 2.0+
- OR Kubernetes 1.28+ with kubectl
- OR Vagrant 2.4+ with VirtualBox 7.0+
- 8GB RAM minimum, 16GB recommended
- 20GB disk space

### One-Command Deployment

```bash
# Clone and deploy with Docker Compose
git clone https://github.com/thecloudbox/cloudsentinel.git
cd cloudsentinel/cloudsentinel-deploy
chmod +x setup.sh
./setup.sh
```

Access CloudSentinel at: http://localhost:3000

---

## Docker Compose Deployment

### 1. Start All Services

```bash
cd cloudsentinel-deploy
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Verify Services

```bash
# Check all containers are running
docker-compose ps

# Check logs
docker-compose logs -f cloudsentinel-web

# Health checks
curl http://localhost:3000/api/health
curl http://localhost:9090/-/healthy  # Prometheus
curl http://localhost:3001/api/health  # Grafana
```

### 3. Access Services

- **CloudSentinel UI**: http://localhost:3000
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin123)
- **AlertManager**: http://localhost:9093

### 4. Stop Services

```bash
docker-compose -f docker-compose.prod.yml down

# With volume cleanup
docker-compose -f docker-compose.prod.yml down -v
```

---

## Kubernetes Deployment

### 1. Apply Manifests

```bash
cd cloudsentinel-deploy/k8s

# Create namespace
kubectl apply -f namespace.yaml

# Deploy infrastructure
kubectl apply -f configmap.yaml
kubectl apply -f secrets.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f redis-deployment.yaml
kubectl apply -f prometheus-deployment.yaml

# Deploy CloudSentinel
kubectl apply -f cloudsentinel-deployment.yaml
```

### 2. Verify Deployment

```bash
# Check pods
kubectl get pods -n cloudsentinel

# Check services
kubectl get svc -n cloudsentinel

# Get external IP (for LoadBalancer)
kubectl get svc cloudsentinel-service -n cloudsentinel

# View logs
kubectl logs -f deployment/cloudsentinel -n cloudsentinel
```

### 3. Port Forward (for testing)

```bash
# CloudSentinel
kubectl port-forward -n cloudsentinel svc/cloudsentinel-service 3000:3000

# Prometheus
kubectl port-forward -n cloudsentinel svc/prometheus-service 9090:9090
```

### 4. Scale Deployment

```bash
# Scale to 5 replicas
kubectl scale deployment/cloudsentinel -n cloudsentinel --replicas=5

# Autoscaling
kubectl autoscale deployment/cloudsentinel -n cloudsentinel --cpu-percent=70 --min=3 --max=10
```

---

## Vagrant Development Environment

### 1. Start VMs

```bash
cd cloudsentinel-deploy

# Start all VMs
vagrant up

# Start specific VM
vagrant up cloudsentinel-master
```

### 2. Access Master Node

```bash
vagrant ssh cloudsentinel-master

# Inside VM
cd /vagrant
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Cluster Setup

```bash
# On master node
vagrant ssh cloudsentinel-master
sudo k3s kubectl get nodes

# Deploy CloudSentinel to k3s
cd /vagrant/k8s
kubectl apply -f namespace.yaml
kubectl apply -f .
```

### 4. Access Services

- CloudSentinel: http://192.168.56.10:3000
- Prometheus: http://192.168.56.10:9090
- Grafana: http://192.168.56.10:3001

### 5. Manage VMs

```bash
# Status
vagrant status

# Stop VMs
vagrant halt

# Destroy VMs
vagrant destroy -f

# Reload with new provisioning
vagrant reload --provision
```

---

## Testing & Validation

### 1. Functional Tests

```bash
# Test NL Query Engine
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Why was the API slow at 3pm?"}'

# Test Blast Radius Predictor
curl -X POST http://localhost:3000/api/blast-radius \
  -H "Content-Type: application/json" \
  -d '{"service": "api-gateway", "changeType": "deployment"}'

# Test Cost Intelligence
curl http://localhost:3000/api/cost-analysis
```

### 2. Load Testing

```bash
# Install k6
brew install k6  # macOS
# or
sudo apt install k6  # Ubuntu

# Run load test
k6 run load-test.js
```

### 3. Chaos Testing

```bash
cd cloudsentinel-deploy

# Simulate high CPU
./scenarios/high-cpu.sh

# Simulate memory leak
./scenarios/memory-leak.sh

# Simulate service failure
./scenarios/service-failure.sh
```

### 4. Database Validation

```bash
# Connect to PostgreSQL
docker exec -it cloudsentinel-db psql -U sentinel -d cloudsentinel

# Check tables
\dt

# Query incidents
SELECT * FROM incidents LIMIT 10;

# Check runbooks
SELECT name, execution_count, success_count FROM runbooks;
```

---

## Production Checklist

### Before Production Deployment

- [ ] Update all passwords in secrets.yaml / .env
- [ ] Configure SSL/TLS certificates
- [ ] Set up backup strategy for PostgreSQL
- [ ] Configure log aggregation (ELK, Loki)
- [ ] Set up monitoring alerts
- [ ] Configure resource limits properly
- [ ] Enable authentication/authorization
- [ ] Review security group / firewall rules
- [ ] Set up CI/CD pipeline
- [ ] Document runbook procedures

### Security Hardening

```bash
# Generate strong passwords
openssl rand -base64 32

# Update secrets
kubectl create secret generic cloudsentinel-secrets \
  --from-literal=POSTGRES_PASSWORD=$(openssl rand -base64 32) \
  --from-literal=GRAFANA_ADMIN_PASSWORD=$(openssl rand -base64 32) \
  -n cloudsentinel --dry-run=client -o yaml | kubectl apply -f -
```

### Backup Strategy

```bash
# PostgreSQL backup
docker exec cloudsentinel-db pg_dump -U sentinel cloudsentinel > backup-$(date +%Y%m%d).sql

# Kubernetes backup with Velero
velero backup create cloudsentinel-backup --include-namespaces cloudsentinel
```

---

## Troubleshooting

### Common Issues

**1. Containers not starting**
```bash
# Check logs
docker-compose logs cloudsentinel-web

# Check resource usage
docker stats

# Restart specific service
docker-compose restart cloudsentinel-web
```

**2. Database connection errors**
```bash
# Check PostgreSQL
docker exec cloudsentinel-db pg_isready -U sentinel

# Reset database
docker-compose down -v
docker-compose up -d
```

**3. Prometheus not scraping**
```bash
# Check Prometheus targets
curl http://localhost:9090/api/v1/targets

# Restart Prometheus
docker-compose restart prometheus
```

**4. Kubernetes pods pending**
```bash
# Check events
kubectl describe pod <pod-name> -n cloudsentinel

# Check node resources
kubectl describe nodes

# Check PVC status
kubectl get pvc -n cloudsentinel
```

### Health Check Endpoints

- CloudSentinel: `http://localhost:3000/api/health`
- Prometheus: `http://localhost:9090/-/healthy`
- Grafana: `http://localhost:3001/api/health`
- PostgreSQL: `docker exec cloudsentinel-db pg_isready`

### Performance Tuning

```yaml
# PostgreSQL tuning (docker-compose override)
postgres:
  command:
    - postgres
    - -c shared_buffers=256MB
    - -c effective_cache_size=1GB
    - -c maintenance_work_mem=128MB
    - -c max_connections=200
```

---

## Support & Documentation

- Documentation: https://docs.thecloudbox.io/cloudsentinel
- GitHub Issues: https://github.com/thecloudbox/cloudsentinel/issues
- Community Slack: https://thecloudbox.slack.com
- Email Support: support@thecloudbox.io

---

**© 2025 TheCloudbox - CloudSentinel AIOps Platform**
