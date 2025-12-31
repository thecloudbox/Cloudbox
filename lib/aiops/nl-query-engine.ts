import type { Incident, Anomaly, NaturalLanguageQuery } from "./types"

/**
 * Natural Language Query Engine
 * Revolutionary feature: Ask questions in plain English
 * Example: "Why was the API slow at 3pm yesterday?"
 */
export class NLQueryEngine {
  private incidents: Incident[] = []
  private anomalies: Anomaly[] = []

  updateData(incidents: Incident[], anomalies: Anomaly[]) {
    this.incidents = incidents
    this.anomalies = anomalies
  }

  /**
   * Process natural language queries and return relevant results
   */
  async processQuery(query: string): Promise<NaturalLanguageQuery> {
    const lowerQuery = query.toLowerCase()
    const now = Date.now()

    // Extract time context
    const timeRange = this.extractTimeRange(lowerQuery, now)

    // Extract service context
    const services = this.extractServices(lowerQuery)

    // Filter relevant incidents
    const relevantIncidents = this.incidents.filter((inc) => {
      const inTimeRange = inc.timestamp >= timeRange.start && inc.timestamp <= timeRange.end
      const matchesService = services.length === 0 || services.some((s) => inc.affectedServices.includes(s))
      return inTimeRange && matchesService
    })

    // Filter relevant anomalies
    const relevantAnomalies = this.anomalies.filter((anom) => {
      const inTimeRange = anom.timestamp >= timeRange.start && anom.timestamp <= timeRange.end
      const matchesService = services.length === 0 || services.includes(anom.service)
      return inTimeRange && matchesService
    })

    // Generate insights based on query intent
    const insights = this.generateInsights(lowerQuery, relevantIncidents, relevantAnomalies)

    return {
      query,
      timestamp: now,
      results: {
        incidents: relevantIncidents,
        anomalies: relevantAnomalies,
        insights,
        timeRange,
      },
    }
  }

  private extractTimeRange(query: string, now: number): { start: number; end: number } {
    const hour = 3600000
    const day = 86400000

    if (query.includes("last hour") || query.includes("past hour")) {
      return { start: now - hour, end: now }
    }
    if (query.includes("last 24 hours") || query.includes("yesterday") || query.includes("today")) {
      return { start: now - day, end: now }
    }
    if (query.includes("last week") || query.includes("past week")) {
      return { start: now - 7 * day, end: now }
    }
    if (query.includes("3pm") || query.includes("15:00")) {
      // Yesterday at 3pm +/- 1 hour
      const yesterday3pm = now - day + (15 * hour - (now % day))
      return { start: yesterday3pm - hour, end: yesterday3pm + hour }
    }

    // Default: last 24 hours
    return { start: now - day, end: now }
  }

  private extractServices(query: string): string[] {
    const serviceKeywords = ["api", "database", "cache", "frontend", "backend", "payment", "auth"]
    return serviceKeywords.filter((service) => query.includes(service))
  }

  private generateInsights(query: string, incidents: Incident[], anomalies: Anomaly[]): string[] {
    const insights: string[] = []

    if (query.includes("why") && query.includes("slow")) {
      if (anomalies.some((a) => a.metric.includes("latency") || a.metric.includes("response"))) {
        insights.push("High latency detected in response time metrics")
      }
      if (anomalies.some((a) => a.metric.includes("cpu"))) {
        insights.push("CPU usage spike correlated with slowdown")
      }
      if (incidents.some((i) => i.description.includes("memory"))) {
        insights.push("Memory pressure may be contributing to slow performance")
      }
    }

    if (query.includes("down") || query.includes("failed")) {
      const criticalIncidents = incidents.filter((i) => i.severity === "critical")
      if (criticalIncidents.length > 0) {
        insights.push(`${criticalIncidents.length} critical incidents detected`)
      }
    }

    if (incidents.length === 0 && anomalies.length === 0) {
      insights.push("No significant issues detected in the specified time range")
    }

    if (incidents.some((i) => i.status === "auto-resolved")) {
      insights.push(`${incidents.filter((i) => i.status === "auto-resolved").length} incidents were auto-remediated`)
    }

    return insights
  }
}
