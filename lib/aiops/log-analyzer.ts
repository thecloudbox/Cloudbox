import type { LogEntry, Incident } from "./types"

export class LogAnalyzer {
  private errorPatterns = [
    { pattern: /out of memory|oom|memory exhausted/i, type: "memory", severity: "critical" as const },
    { pattern: /connection refused|connection timeout|timeout/i, type: "network", severity: "high" as const },
    { pattern: /disk full|no space left/i, type: "disk", severity: "critical" as const },
    { pattern: /deadlock|lock timeout/i, type: "database", severity: "high" as const },
    { pattern: /permission denied|unauthorized/i, type: "security", severity: "medium" as const },
    { pattern: /null pointer|segmentation fault|core dumped/i, type: "crash", severity: "critical" as const },
    { pattern: /high cpu|cpu spike/i, type: "cpu", severity: "high" as const },
  ]

  private logBuffer: LogEntry[] = []
  private readonly bufferSize = 1000

  /**
   * Analyze log entry and detect potential issues
   */
  analyzeLogs(logs: LogEntry[]): Incident[] {
    const incidents: Incident[] = []
    const errorClusters = this.clusterErrors(logs)

    errorClusters.forEach((cluster) => {
      if (cluster.length >= 3) {
        // At least 3 similar errors
        const firstLog = cluster[0]
        const pattern = this.identifyPattern(firstLog.message)

        incidents.push({
          id: `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: firstLog.timestamp,
          title: pattern ? `${pattern.type.toUpperCase()}: ${pattern.type} issue detected` : "Error cluster detected",
          description: `Detected ${cluster.length} similar errors: ${firstLog.message.substring(0, 100)}...`,
          severity: pattern?.severity || "medium",
          status: "open",
          affectedServices: [...new Set(cluster.map((l) => l.service))],
          rootCause: pattern?.type,
        })
      }
    })

    return incidents
  }

  /**
   * Cluster similar error messages using string similarity
   */
  private clusterErrors(logs: LogEntry[]): LogEntry[][] {
    const errorLogs = logs.filter((l) => l.level === "error" || l.level === "critical")
    const clusters: LogEntry[][] = []

    errorLogs.forEach((log) => {
      let added = false
      for (const cluster of clusters) {
        if (this.areSimilar(log.message, cluster[0].message)) {
          cluster.push(log)
          added = true
          break
        }
      }
      if (!added) {
        clusters.push([log])
      }
    })

    return clusters
  }

  private areSimilar(msg1: string, msg2: string): boolean {
    // Simple similarity check - could be enhanced with more sophisticated algorithms
    const words1 = msg1
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3)
    const words2 = msg2
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3)

    const commonWords = words1.filter((w) => words2.includes(w))
    const similarity = commonWords.length / Math.max(words1.length, words2.length)

    return similarity > 0.6
  }

  private identifyPattern(message: string) {
    return this.errorPatterns.find((p) => p.pattern.test(message))
  }

  /**
   * Extract insights from logs using pattern recognition
   */
  extractInsights(logs: LogEntry[]): {
    topErrors: { message: string; count: number }[]
    serviceHealth: Record<string, number>
    errorRate: number
  } {
    const errorCount = logs.filter((l) => l.level === "error" || l.level === "critical").length
    const errorRate = logs.length > 0 ? errorCount / logs.length : 0

    // Count error occurrences
    const errorCounts = new Map<string, number>()
    logs.forEach((log) => {
      if (log.level === "error" || log.level === "critical") {
        const key = log.message.substring(0, 100)
        errorCounts.set(key, (errorCounts.get(key) || 0) + 1)
      }
    })

    const topErrors = Array.from(errorCounts.entries())
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate service health
    const serviceHealth: Record<string, number> = {}
    const serviceErrors = new Map<string, number>()
    const serviceTotals = new Map<string, number>()

    logs.forEach((log) => {
      serviceTotals.set(log.service, (serviceTotals.get(log.service) || 0) + 1)
      if (log.level === "error" || log.level === "critical") {
        serviceErrors.set(log.service, (serviceErrors.get(log.service) || 0) + 1)
      }
    })

    serviceTotals.forEach((total, service) => {
      const errors = serviceErrors.get(service) || 0
      serviceHealth[service] = Math.max(0, 100 - (errors / total) * 100)
    })

    return { topErrors, serviceHealth, errorRate }
  }
}
