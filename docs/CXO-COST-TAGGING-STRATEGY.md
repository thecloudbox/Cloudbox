# CXO Cost Intelligence: Tagging & Labeling Strategy

## Overview
Proper resource tagging is essential for accurate cost allocation. This document defines the tagging taxonomy and implementation across all cloud providers.

## Universal Tag Schema

### Required Tags (All Resources)
```yaml
cost-center: "engineering|product|marketing|sales|operations"
service-name: "api-gateway|user-service|payment-service|..."
environment: "production|staging|development|test"
team: "platform|backend|frontend|data|security"
project: "project-name-here"
managed-by: "kubernetes|terraform|cloudformation|manual"
```

### Optional Tags (Recommended)
```yaml
cost-allocation: "shared|dedicated|hybrid"
business-unit: "retail|enterprise|saas"
application: "mobile-app|web-app|admin-panel"
version: "v1.2.3"
cost-type: "compute|storage|network|database"
```

## Kubernetes Labeling Strategy

### Namespace Labels
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production-api
  labels:
    cost-center: "engineering"
    service-name: "api-gateway"
    environment: "production"
    team: "platform"
    cost-allocation: "shared"
```

### Pod Labels (Required)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-gateway-xyz
  labels:
    # Cost allocation labels
    cost-center: "engineering"
    service-name: "api-gateway"
    environment: "production"
    team: "platform"
    
    # Technical labels
    app: "api-gateway"
    version: "v1.2.3"
    component: "backend"
    
    # Ownership
    owner: "platform-team"
    managed-by: "kubernetes"
spec:
  containers:
  - name: api
    resources:
      requests:
        cpu: "500m"
        memory: "512Mi"
      limits:
        cpu: "1000m"
        memory: "1Gi"
```

### Service Labels
```yaml
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
  labels:
    cost-center: "engineering"
    service-name: "api-gateway"
    environment: "production"
    cost-type: "network"
```

### PersistentVolumeClaim Labels
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-data
  labels:
    cost-center: "engineering"
    service-name: "database"
    cost-type: "storage"
    storage-class: "ssd"
```

## AWS Tagging Strategy

### EC2 Instances
```json
{
  "Tags": [
    {"Key": "CostCenter", "Value": "engineering"},
    {"Key": "ServiceName", "Value": "api-gateway"},
    {"Key": "Environment", "Value": "production"},
    {"Key": "Team", "Value": "platform"},
    {"Key": "ManagedBy", "Value": "terraform"},
    {"Key": "CostAllocation", "Value": "shared"}
  ]
}
```

### S3 Buckets
```json
{
  "TagSet": [
    {"Key": "CostCenter", "Value": "engineering"},
    {"Key": "ServiceName", "Value": "media-storage"},
    {"Key": "CostType", "Value": "storage"},
    {"Key": "DataClassification", "Value": "public"}
  ]
}
```

### RDS Instances
```json
{
  "Tags": [
    {"Key": "CostCenter", "Value": "engineering"},
    {"Key": "ServiceName", "Value": "user-database"},
    {"Key": "CostType", "Value": "database"},
    {"Key": "Engine", "Value": "postgres"}
  ]
}
```

## GCP Labeling Strategy

### Compute Instances
```yaml
labels:
  cost-center: engineering
  service-name: api-gateway
  environment: production
  team: platform
  managed-by: terraform
```

### Cloud Storage Buckets
```yaml
labels:
  cost-center: engineering
  service-name: media-storage
  cost-type: storage
  region: us-central1
```

### GKE Clusters
```yaml
resourceLabels:
  cost-center: engineering
  environment: production
  cluster-type: production
  cost-allocation: shared
```

## Azure Tagging Strategy

### Virtual Machines
```json
{
  "tags": {
    "CostCenter": "engineering",
    "ServiceName": "api-gateway",
    "Environment": "production",
    "Team": "platform",
    "ManagedBy": "terraform"
  }
}
```

### Storage Accounts
```json
{
  "tags": {
    "CostCenter": "engineering",
    "ServiceName": "media-storage",
    "CostType": "storage",
    "Tier": "hot"
  }
}
```

## Linode Tagging Strategy

### Linode Instances
```json
{
  "tags": [
    "cost-center:engineering",
    "service-name:api-gateway",
    "environment:production",
    "team:platform"
  ]
}
```

### Block Storage Volumes
```json
{
  "tags": [
    "cost-center:engineering",
    "service-name:database",
    "cost-type:storage"
  ]
}
```

## Automated Tagging Scripts

### Kubernetes Auto-Tagger (Admission Controller)
```python
# Deploy as mutating webhook
def auto_tag_pod(pod):
    namespace_labels = get_namespace_labels(pod.namespace)
    
    # Inherit from namespace if not set
    if not pod.labels.get('cost-center'):
        pod.labels['cost-center'] = namespace_labels.get('cost-center')
    
    if not pod.labels.get('service-name'):
        pod.labels['service-name'] = namespace_labels.get('service-name')
    
    return pod
```

### AWS Tag Enforcer (Lambda)
```python
import boto3

def enforce_tags(event, context):
    ec2 = boto3.client('ec2')
    
    # Get untagged resources
    instances = ec2.describe_instances(
        Filters=[{'Name': 'tag-key', 'Values': ['CostCenter'], 'Operator': 'NotExists'}]
    )
    
    # Send alerts or auto-tag
    for instance in instances:
        send_alert(f"Instance {instance['InstanceId']} missing cost tags")
```

## Tag Validation Rules

### Required Tag Validation
```yaml
rules:
  - resource_types: ["*"]
    required_tags:
      - cost-center
      - service-name
      - environment
    enforcement: "deny_on_create"
```

### Tag Value Validation
```yaml
validation:
  cost-center:
    allowed_values: ["engineering", "product", "marketing", "sales"]
  environment:
    allowed_values: ["production", "staging", "development", "test"]
  service-name:
    pattern: "^[a-z][a-z0-9-]*$"
```

## Cost Allocation Methodology

### Shared Infrastructure Allocation
```python
# Calculate cost per service based on tags
def allocate_shared_costs(cluster_cost, pod_metrics):
    total_cpu = sum(pod.cpu_usage for pod in pod_metrics)
    
    cost_by_service = {}
    for pod in pod_metrics:
        service = pod.labels.get('service-name')
        cpu_ratio = pod.cpu_usage / total_cpu
        
        if service not in cost_by_service:
            cost_by_service[service] = 0
        
        cost_by_service[service] += cluster_cost * cpu_ratio
    
    return cost_by_service
```

## Implementation Checklist

- [ ] Define universal tag schema
- [ ] Create Kubernetes admission controller for auto-tagging
- [ ] Deploy tag enforcement policies on AWS/GCP/Azure
- [ ] Set up tag compliance monitoring
- [ ] Create Grafana dashboards for tag coverage
- [ ] Implement cost allocation algorithms
- [ ] Build tag migration scripts for existing resources
- [ ] Document tagging guidelines for teams
- [ ] Set up alerts for untagged resources
- [ ] Create self-service tag management portal

## Benefits

1. **Accurate Cost Attribution**: Know exactly which team/service owns each cost
2. **Chargeback/Showback**: Bill teams based on actual usage
3. **Cost Optimization**: Identify underutilized resources by service
4. **Budget Management**: Set budgets per cost-center/service
5. **Compliance**: Track data classification and retention
