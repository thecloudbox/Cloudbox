# CloudSentinel API Documentation

## Base URL

```
http://your-cloudsentinel-domain/api/cloudsentinel
```

## Authentication

Currently, the demo version does not require authentication. For production deployments, use JWT tokens:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://api.example.com/api/cloudsentinel/...
```

## Endpoints

### GET /status

Get platform status and version info.

**Response:**
```json
{
  "status": "operational",
  "version": "1.0.0",
  "features": {
    "anomalyDetection": true,
    "naturalLanguageQuery": true,
    "costIntelligence": true,
    "cxoCostAnalytics": true,
    "blastRadiusPredictor": true,
    "autoRunbooks": true
  },
  "uptime": "99.98%",
  "lastUpdated": "2025-01-01T12:00:00Z"
}
```

### GET /anomalies

Get detected anomalies.

**Query Parameters:**
- `limit` (optional): Maximum number of anomalies to return
- `service` (optional): Filter by service name

**Example:**
```bash
curl "http://localhost:3030/api/cloudsentinel/anomalies?limit=10&service=orders-service"
```

**Response:**
```json
{
  "anomalies": [
    {
      "id": "anom_123",
      "timestamp": 1704110400000,
      "service": "orders-service",
      "metric": "cpu_usage",
      "value": 95.2,
      "expected": 45.0,
      "zscore": 4.2,
      "severity": "high"
    }
  ],
  "stats": {
    "total": 42,
    "byService": {
      "orders-service": 15,
      "payments-service": 12
    },
    "bySeverity": {
      "low": 10,
      "medium": 20,
      "high": 10,
      "critical": 2
    }
  },
  "total": 1
}
```

### POST /query

Ask questions in natural language.

**Request Body:**
```json
{
  "query": "Show me incidents from the last 24 hours"
}
```

**Response:**
```json
{
  "answer": "Found 5 incidents in the last 24 hours",
  "data": [...],
  "confidence": 0.95
}
```

### GET /metrics

Get current metrics.

**Response:**
```json
{
  "services": [
    {
      "name": "orders-service",
      "cpu": 45.2,
      "memory": 512,
      "requests_per_second": 150,
      "error_rate": 0.02
    }
  ]
}
```

### GET /cxo-costs

Get CXO cost analytics.

**Query Parameters:**
- `timeframe` (optional): "day", "week", "month" (default: "month")
- `service` (optional): Filter by service name
- `groupBy` (optional): "service", "type", "region"

**Example:**
```bash
curl "http://localhost:3030/api/cloudsentinel/cxo-costs?timeframe=month&groupBy=service"
```

**Response:**
```json
{
  "timeframe": "month",
  "totalCost": 15234.56,
  "services": [
    {
      "name": "orders-service",
      "costs": {
        "cpu": 1200.00,
        "memory": 800.00,
        "disk": 200.00,
        "network_ingress": 50.00,
        "network_egress": 150.00,
        "storage": 100.00,
        "shared_infrastructure": 500.00
      },
      "total": 3000.00,
      "percentage": 19.7
    }
  ]
}
```

### POST /predict-blast-radius

Predict impact of a change.

**Request Body:**
```json
{
  "service": "payments-service",
  "changeType": "deployment"
}
```

**Response:**
```json
{
  "service": "payments-service",
  "changeType": "deployment",
  "riskScore": 65,
  "affectedServices": [
    "orders-service",
    "notifications-service",
    "frontend"
  ],
  "estimatedDowntime": "2-5 minutes",
  "recommendations": [
    "Deploy during low-traffic hours",
    "Enable circuit breakers",
    "Prepare rollback plan"
  ]
}
```

### GET /runbooks

Get auto-generated runbooks.

**Response:**
```json
{
  "runbooks": [
    {
      "id": "runbook_123",
      "title": "High CPU Usage - Orders Service",
      "steps": [
        "Check current CPU usage",
        "Identify resource-intensive queries",
        "Scale horizontally if needed",
        "Optimize database queries"
      ],
      "successRate": 0.92
    }
  ]
}
```

### POST /remediate

Manually trigger remediation.

**Request Body:**
```json
{
  "incident_id": "incident_123",
  "action": "restart_service"
}
```

**Response:**
```json
{
  "status": "success",
  "action": "restart_service",
  "completedAt": 1704110460000
}
```

## Webhooks

CloudSentinel can send webhooks when incidents occur or are resolved.

### Configure Webhook

```bash
kubectl create secret generic webhook-config \
  --from-literal=url=https://your-webhook-url.com \
  --from-literal=secret=your-webhook-secret \
  -n cloudsentinel
```

### Webhook Payload

```json
{
  "event": "incident.created",
  "timestamp": 1704110400000,
  "incident": {
    "id": "incident_123",
    "title": "High CPU usage detected",
    "severity": "high",
    "affectedServices": ["orders-service"],
    "status": "open"
  }
}
```

## Rate Limits

- 1000 requests per minute per IP
- 10,000 requests per hour per API key

## Error Codes

- `400` - Bad Request: Invalid parameters
- `401` - Unauthorized: Missing or invalid auth token
- `404` - Not Found: Resource doesn't exist
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Platform error

## SDKs

Coming soon:
- Python SDK
- JavaScript/TypeScript SDK
- Go SDK
