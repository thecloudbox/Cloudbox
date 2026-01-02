# CloudSentinel Getting Started Guide

## What is CloudSentinel?

CloudSentinel is a production-ready, open-source AIOps (Artificial Intelligence for IT Operations) platform that provides:

- **Anomaly Detection** - ML-powered detection of unusual patterns in metrics
- **Natural Language Queries** - Ask questions in plain English
- **Cost Intelligence** - Cross-cloud cost correlation and optimization
- **CXO Cost Analytics** - Per-service cost breakdown with shared infrastructure allocation
- **Blast Radius Prediction** - Forecast impact of changes before deployment
- **Auto-Remediation** - Automated incident response and resolution

## Quick Start (5 minutes)

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/thecloudbox/cloudsentinel
cd cloudsentinel

# Start with Docker Compose
docker-compose up -d

# Access CloudSentinel
open http://localhost:3030/cloudsentinel
```

### Option 2: Kubernetes

```bash
# Install Istio
./demo/scripts/install-istio.sh

# Deploy infrastructure and services
./demo/scripts/deploy-all.sh

# Get access URL
kubectl get svc istio-ingressgateway -n istio-system

# Access CloudSentinel
open http://<GATEWAY-IP>/cloudsentinel
```

## Prerequisites

### Minimum Requirements

**Local Development:**
- Docker 20.10+
- Docker Compose 2.0+
- 4GB RAM
- 10GB disk space

**Kubernetes Deployment:**
- Kubernetes 1.24+
- kubectl configured
- 4 CPU cores, 8GB RAM cluster
- 50GB storage
- Helm 3.0+ (optional)

### Cloud Provider Access (for CXO Cost Analytics)

CloudSentinel can collect cost data from multiple cloud providers. You need API access to at least one:

**AWS:**
```bash
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export AWS_REGION="us-east-1"
```

**GCP:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
export GCP_PROJECT_ID="your-project"
```

**Azure:**
```bash
export AZURE_SUBSCRIPTION_ID="your-subscription-id"
export AZURE_TENANT_ID="your-tenant-id"
export AZURE_CLIENT_ID="your-client-id"
export AZURE_CLIENT_SECRET="your-secret"
```

**Linode:**
```bash
export LINODE_TOKEN="your-api-token"
```

## Installation Steps

### Step 1: Install Dependencies

**On macOS:**
```bash
brew install kubernetes-cli
brew install helm
brew install istioctl
```

**On Linux:**
```bash
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Install Istio
curl -L https://istio.io/downloadIstio | sh -
sudo mv istio-*/bin/istioctl /usr/local/bin/
```

### Step 2: Set Up Kubernetes Cluster

**Using Minikube (local):**
```bash
minikube start --cpus=4 --memory=8192 --disk-size=50g
minikube addons enable metrics-server
```

**Using Kind:**
```bash
kind create cluster --config demo/kind-config.yaml
```

**Using Cloud Provider:**
```bash
# GKE
gcloud container clusters create cloudsentinel \
  --num-nodes=3 \
  --machine-type=n1-standard-2

# EKS
eksctl create cluster \
  --name=cloudsentinel \
  --nodes=3 \
  --node-type=t3.medium

# AKS
az aks create \
  --resource-group cloudsentinel \
  --name cloudsentinel-cluster \
  --node-count 3 \
  --node-vm-size Standard_D2s_v3
```

### Step 3: Install Istio

```bash
# Run the automated script
./demo/scripts/install-istio.sh

# Verify installation
kubectl get pods -n istio-system

# Expected output:
# NAME                                    READY   STATUS    RESTARTS   AGE
# istio-ingressgateway-xxxxx              1/1     Running   0          2m
# istiod-xxxxx                            1/1     Running   0          2m
# kiali-xxxxx                             1/1     Running   0          1m
# prometheus-xxxxx                        1/1     Running   0          1m
# grafana-xxxxx                           1/1     Running   0          1m
```

### Step 4: Deploy CloudSentinel

```bash
# Create namespaces
kubectl create namespace cloudsentinel
kubectl create namespace demo

# Label namespace for Istio injection
kubectl label namespace demo istio-injection=enabled

# Deploy PostgreSQL database
kubectl apply -f cloudsentinel-deploy/k8s/postgres-deployment.yaml

# Initialize database schema
kubectl exec -it -n cloudsentinel deployment/postgres -- \
  psql -U postgres -d cloudsentinel -f /scripts/init-cost-intelligence.sql

# Deploy CloudSentinel platform
kubectl apply -f cloudsentinel-deploy/k8s/

# Wait for pods to be ready
kubectl wait --for=condition=ready pod \
  -l app=cloudsentinel -n cloudsentinel --timeout=300s
```

### Step 5: Deploy Demo Applications

```bash
# Build Docker images (if not using pre-built)
./demo/scripts/build-images.sh

# Deploy all demo services
./demo/scripts/deploy-all.sh

# Verify deployment
kubectl get pods -n demo

# Expected output:
# NAME                                    READY   STATUS    RESTARTS   AGE
# frontend-xxxxx                          2/2     Running   0          2m
# orders-service-xxxxx                    2/2     Running   0          2m
# payments-service-xxxxx                  2/2     Running   0          2m
# notifications-service-xxxxx             2/2     Running   0          2m
# postgres-xxxxx                          2/2     Running   0          2m
# redis-xxxxx                             2/2     Running   0          2m
# rabbitmq-xxxxx                          2/2     Running   0          2m
```

### Step 6: Configure Monitoring

```bash
# Apply service monitors
kubectl apply -f demo/istio/service-monitors.yaml

# Verify Prometheus is scraping
kubectl port-forward -n istio-system svc/prometheus 9090:9090

# Open http://localhost:9090/targets
# All targets should show as "UP"
```

### Step 7: Access CloudSentinel

**Using Port Forward:**
```bash
kubectl port-forward -n cloudsentinel svc/cloudsentinel-web 3030:3030
open http://localhost:3030/cloudsentinel
```

**Using Ingress (production):**
```bash
# Get LoadBalancer IP
kubectl get svc istio-ingressgateway -n istio-system

# Access via browser
open http://<EXTERNAL-IP>/cloudsentinel
```

## Configuration

### Required Labels for Cost Allocation

Apply these labels to ALL Kubernetes pods:

```yaml
labels:
  app: "service-name"          # Required
  team: "engineering"          # Required
  environment: "production"    # Required
  cost-center: "platform"      # Required
  business-unit: "core"        # Optional
```

### Cloud Resource Tags

Tag all cloud resources with:

```json
{
  "Service": "api-gateway",
  "Team": "backend",
  "Environment": "prod",
  "CostCenter": "engineering",
  "Project": "cloudsentinel",
  "ManagedBy": "kubernetes"
}
```

### Environment Variables

Create a ConfigMap for CloudSentinel configuration:

```bash
kubectl create configmap cloudsentinel-config \
  --from-literal=ANOMALY_DETECTION_ENABLED=true \
  --from-literal=ANOMALY_ZSCORE_THRESHOLD=3.0 \
  --from-literal=AUTO_REMEDIATION_ENABLED=true \
  --from-literal=METRIC_RETENTION_DAYS=30 \
  --from-literal=LOG_LEVEL=info \
  -n cloudsentinel
```

### Cloud Credentials

Create secrets for cloud provider access:

```bash
kubectl create secret generic cloud-credentials \
  --from-literal=aws-access-key=$AWS_ACCESS_KEY_ID \
  --from-literal=aws-secret-key=$AWS_SECRET_ACCESS_KEY \
  --from-file=gcp-service-account=gcp-key.json \
  --from-literal=azure-subscription-id=$AZURE_SUBSCRIPTION_ID \
  --from-literal=linode-token=$LINODE_TOKEN \
  -n cloudsentinel
```

## Testing CloudSentinel

### 1. Start Monitoring

1. Open http://localhost:3030/cloudsentinel
2. Click "Start Live Demo"
3. Watch the dashboard populate with metrics

### 2. Run Test Scenarios

```bash
# Run all test scenarios
./demo/scripts/test-scenarios.sh

# Individual scenarios
./demo/scenarios/high-cpu.sh
./demo/scenarios/memory-leak.sh
./demo/scenarios/service-failure.sh
```

### 3. Verify Anomaly Detection

```bash
# Trigger high CPU on orders service
curl -X POST http://localhost:8080/chaos/high-cpu \
  -H "Content-Type: application/json" \
  -d '{"duration":60}'

# Watch CloudSentinel detect the anomaly
# Should appear in dashboard within 30 seconds
```

### 4. Test Natural Language Queries

In CloudSentinel UI, click "Ask CloudSentinel" tab and try:

- "Show me incidents from the last hour"
- "Which service has the highest error rate?"
- "What's our AWS spending this month?"
- "Show me all critical anomalies"

### 5. View Grafana Dashboards

```bash
kubectl port-forward -n istio-system svc/grafana 3000:3000
open http://localhost:3000

# Login: admin / admin
# Navigate to "CloudSentinel Overview" dashboard
```

## Troubleshooting

### Issue: Pods not starting

```bash
# Check pod status
kubectl get pods -n cloudsentinel
kubectl describe pod <pod-name> -n cloudsentinel

# Check logs
kubectl logs -n cloudsentinel deployment/cloudsentinel-web --tail=50

# Common causes:
# - Insufficient cluster resources
# - Image pull errors
# - Missing secrets or configmaps
```

### Issue: Metrics not appearing

```bash
# Verify Prometheus is scraping
kubectl logs -n istio-system deployment/prometheus

# Check service monitors
kubectl get servicemonitor -n demo

# Test metrics endpoint directly
kubectl port-forward -n demo svc/orders-service 8080:8080
curl http://localhost:8080/metrics
```

### Issue: Database connection errors

```bash
# Check PostgreSQL is running
kubectl get pods -n cloudsentinel -l app=postgres

# Test connection
kubectl exec -it -n cloudsentinel deployment/postgres -- \
  psql -U postgres -c "SELECT 1"

# Verify secret exists
kubectl get secret postgres-secret -n cloudsentinel
```

### Issue: Cost data not updating

```bash
# Check cloud credentials
kubectl get secret cloud-credentials -n cloudsentinel

# Test cloud provider access
kubectl exec -it -n cloudsentinel deployment/cloudsentinel-cost-collector -- \
  python -c "import boto3; print(boto3.client('ce').get_cost_and_usage())"

# Check cost collector logs
kubectl logs -n cloudsentinel deployment/cloudsentinel-cost-collector
```

### Issue: High memory usage

```bash
# Check resource usage
kubectl top pods -n cloudsentinel

# Reduce metric retention
kubectl edit configmap cloudsentinel-config -n cloudsentinel
# Set: METRIC_RETENTION_DAYS=7

# Restart CloudSentinel
kubectl rollout restart deployment/cloudsentinel-web -n cloudsentinel
```

## Next Steps

1. **Configure Alerting** - Set up webhooks for Slack, PagerDuty, or email
2. **Enable HTTPS** - Configure TLS certificates for production
3. **Set Up Backups** - Configure automated PostgreSQL backups
4. **Scale the Platform** - Add more replicas for high availability
5. **Customize Dashboards** - Create custom Grafana dashboards
6. **Add More Services** - Integrate your own applications

## Resources

- **Documentation**: https://thecloudbox.io/docs/cloudsentinel
- **GitHub**: https://github.com/thecloudbox/cloudsentinel
- **Community**: https://community.thecloudbox.io
- **Support**: support@thecloudbox.io

## License

Apache License 2.0 - Free for commercial use
