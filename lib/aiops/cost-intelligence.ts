import type { Metric, CostAnomaly, Anomaly } from "./types"

/**
 * Cross-Cloud Cost Intelligence
 * Market gap: Correlates cost spikes with performance issues across clouds
 */
export class CostIntelligenceEngine {
  private costHistory: Map<string, number[]> = new Map()
  private detectedCostAnomalies: CostAnomaly[] = []

  /**
   * Analyze cost metrics and detect anomalies
   */
  analyzeCosts(metrics: Metric[], performanceAnomalies: Anomaly[]): CostAnomaly[] {
    const costAnomalies: CostAnomaly[] = []

    // Group metrics by service and cloud provider
    const costMetrics = metrics.filter((m) => m.labels.type === "cost")

    costMetrics.forEach((metric) => {
      const key = `${metric.service}_${metric.labels.cloud || "aws"}`
      const history = this.costHistory.get(key) || []
      history.push(metric.value)

      // Keep last 100 data points
      if (history.length > 100) history.shift()
      this.costHistory.set(key, history)

      // Calculate expected cost (moving average)
      if (history.length < 10) return

      const expectedCost = history.slice(-20).reduce((a, b) => a + b, 0) / 20
      const stdDev = this.calculateStdDev(history.slice(-20))
      const threshold = expectedCost + 2 * stdDev

      if (metric.value > threshold) {
        const costIncrease = ((metric.value - expectedCost) / expectedCost) * 100

        // Check if linked to performance issue
        const linkedIssue = performanceAnomalies.find(
          (a) => a.service === metric.service && Math.abs(a.timestamp - metric.timestamp) < 300000, // 5 min window
        )

        const anomaly: CostAnomaly = {
          id: `cost_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: metric.timestamp,
          service: metric.service,
          cloudProvider: (metric.labels.cloud as any) || "aws",
          expectedCost,
          actualCost: metric.value,
          costIncrease,
          linkedToPerformanceIssue: !!linkedIssue,
          performanceIssueId: linkedIssue?.id,
          severity: costIncrease > 100 ? "critical" : costIncrease > 50 ? "high" : "medium",
        }

        costAnomalies.push(anomaly)
        this.detectedCostAnomalies.push(anomaly)
      }
    })

    return costAnomalies
  }

  private calculateStdDev(values: number[]): number {
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const squareDiffs = values.map((v) => Math.pow(v - avg, 2))
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / values.length
    return Math.sqrt(avgSquareDiff)
  }

  getCostAnomalies(limit = 10): CostAnomaly[] {
    return this.detectedCostAnomalies.slice(-limit)
  }

  /**
   * Calculate potential savings from optimization
   */
  calculateSavingsOpportunity(): { monthly: number; annual: number; recommendations: string[] } {
    const recentAnomalies = this.detectedCostAnomalies.slice(-50)
    const wastage = recentAnomalies.reduce((sum, a) => sum + (a.actualCost - a.expectedCost), 0)

    return {
      monthly: wastage * 30,
      annual: wastage * 365,
      recommendations: [
        "Right-size over-provisioned instances",
        "Enable auto-scaling to match demand",
        "Use spot instances for non-critical workloads",
        "Implement cost allocation tags",
      ],
    }
  }
}
