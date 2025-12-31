import type { Metric, LogEntry } from "./types"

/**
 * Generate mock metrics and logs for demonstration
 */
export class MockDataGenerator {
  private services = ["api-gateway", "auth-service", "payment-service", "notification-service", "database"]
  private hosts = ["prod-1", "prod-2", "prod-3", "prod-4"]

  generateMetrics(count: number, includeAnomalies = true): Metric[] {
    const metrics: Metric[] = []
    const now = Date.now()

    for (let i = 0; i < count; i++) {
      const service = this.services[Math.floor(Math.random() * this.services.length)]
      const host = this.hosts[Math.floor(Math.random() * this.hosts.length)]

      // Generate normal metrics
      const baseValue = Math.random() * 100
      let value = baseValue + (Math.random() - 0.5) * 10

      // Inject anomalies randomly
      if (includeAnomalies && Math.random() < 0.05) {
        value = baseValue * (2 + Math.random() * 3)
      }

      metrics.push({
        timestamp: now - (count - i) * 1000,
        value,
        labels: {
          metric: ["cpu", "memory", "disk", "network"][Math.floor(Math.random() * 4)],
        },
        service,
        host,
      })
    }

    return metrics
  }

  generateLogs(count: number, includeErrors = true): LogEntry[] {
    const logs: LogEntry[] = []
    const now = Date.now()

    const normalMessages = [
      "Request processed successfully",
      "User authenticated",
      "Payment completed",
      "Notification sent",
      "Database query executed",
    ]

    const errorMessages = [
      "Connection timeout to database",
      "Out of memory error occurred",
      "Disk space critically low",
      "High CPU usage detected",
      "Deadlock detected in database",
      "Permission denied for operation",
      "Network connection refused",
    ]

    for (let i = 0; i < count; i++) {
      const isError = includeErrors && Math.random() < 0.1
      const service = this.services[Math.floor(Math.random() * this.services.length)]
      const host = this.hosts[Math.floor(Math.random() * this.hosts.length)]

      logs.push({
        timestamp: now - (count - i) * 1000,
        level: isError ? (Math.random() < 0.5 ? "error" : "critical") : "info",
        message: isError
          ? errorMessages[Math.floor(Math.random() * errorMessages.length)]
          : normalMessages[Math.floor(Math.random() * normalMessages.length)],
        service,
        host,
        metadata: {
          requestId: `req_${Math.random().toString(36).substr(2, 9)}`,
          userId: Math.floor(Math.random() * 10000),
        },
      })
    }

    return logs
  }
}
