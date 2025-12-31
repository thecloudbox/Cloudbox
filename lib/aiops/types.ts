export interface Metric {
  timestamp: number
  value: number
  labels: Record<string, string>
  service: string
  host: string
}

export interface Anomaly {
  id: string
  timestamp: number
  metric: string
  expectedValue: number
  actualValue: number
  severity: "low" | "medium" | "high" | "critical"
  confidence: number
  service: string
  host: string
  autoRemediated: boolean
  remediationAction?: string
}

export interface LogEntry {
  timestamp: number
  level: "info" | "warn" | "error" | "critical"
  message: string
  service: string
  host: string
  metadata: Record<string, any>
}

export interface Incident {
  id: string
  timestamp: number
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "investigating" | "resolved" | "auto-resolved"
  affectedServices: string[]
  rootCause?: string
  remediation?: RemediationAction
  mttr?: number // Mean Time To Resolution in seconds
  predictedBy?: string // ML model that predicted this
}

export interface RemediationAction {
  id: string
  incidentId: string
  action: string
  type: "restart" | "scale" | "failover" | "config-change" | "custom"
  status: "pending" | "in-progress" | "completed" | "failed"
  executedAt?: number
  completedAt?: number
  result?: string
  automated: boolean
}

export interface PredictionModel {
  id: string
  name: string
  type: "time-series" | "classification" | "regression" | "clustering"
  accuracy: number
  lastTrained: number
  predictions: number
  prevented: number
}

export interface HealthScore {
  overall: number
  cpu: number
  memory: number
  disk: number
  network: number
  services: Record<string, number>
  timestamp: number
}
