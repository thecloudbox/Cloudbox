import type { Metric, Anomaly } from "./types"

export class AnomalyDetector {
  private historicalData: Map<string, number[]> = new Map()
  private readonly windowSize = 100
  private readonly stdDevThreshold = 3

  /**
   * Enhanced Z-Score based anomaly detection with adaptive thresholds
   */
  detectAnomaly(metric: Metric): Anomaly | null {
    const key = `${metric.service}_${metric.labels.metric || "default"}`

    if (!this.historicalData.has(key)) {
      this.historicalData.set(key, [])
    }

    const history = this.historicalData.get(key)!

    // Need enough history for detection
    if (history.length < 10) {
      history.push(metric.value)
      if (history.length > this.windowSize) {
        history.shift()
      }
      return null
    }

    // Calculate statistics
    const mean = history.reduce((a, b) => a + b, 0) / history.length
    const variance = history.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / history.length
    const stdDev = Math.sqrt(variance)

    // Z-score calculation
    const zScore = stdDev === 0 ? 0 : Math.abs((metric.value - mean) / stdDev)

    // Adaptive threshold based on variance
    const adaptiveThreshold = this.stdDevThreshold * (1 + Math.min(variance / mean, 1))

    history.push(metric.value)
    if (history.length > this.windowSize) {
      history.shift()
    }

    if (zScore > adaptiveThreshold) {
      const deviation = ((metric.value - mean) / mean) * 100

      return {
        id: `anomaly_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: metric.timestamp,
        metric: key,
        expectedValue: mean,
        actualValue: metric.value,
        severity: this.calculateSeverity(zScore, adaptiveThreshold),
        confidence: Math.min(zScore / adaptiveThreshold, 1),
        service: metric.service,
        host: metric.host,
        autoRemediated: false,
      }
    }

    return null
  }

  /**
   * Time series forecasting using simple exponential smoothing
   */
  predictNextValue(metricKey: string, horizon = 1): number | null {
    const history = this.historicalData.get(metricKey)
    if (!history || history.length < 3) return null

    const alpha = 0.3 // Smoothing factor
    let smoothed = history[0]

    for (let i = 1; i < history.length; i++) {
      smoothed = alpha * history[i] + (1 - alpha) * smoothed
    }

    // Simple linear trend
    const recentValues = history.slice(-10)
    const trend = (recentValues[recentValues.length - 1] - recentValues[0]) / recentValues.length

    return smoothed + trend * horizon
  }

  private calculateSeverity(zScore: number, threshold: number): Anomaly["severity"] {
    const ratio = zScore / threshold
    if (ratio > 3) return "critical"
    if (ratio > 2) return "high"
    if (ratio > 1.5) return "medium"
    return "low"
  }

  /**
   * Detect patterns and correlations across multiple metrics
   */
  detectCorrelatedAnomalies(anomalies: Anomaly[]): Anomaly[][] {
    const timeWindow = 60000 // 1 minute
    const groups: Anomaly[][] = []

    anomalies.forEach((anomaly) => {
      let added = false
      for (const group of groups) {
        const timeDiff = Math.abs(anomaly.timestamp - group[0].timestamp)
        if (timeDiff <= timeWindow) {
          group.push(anomaly)
          added = true
          break
        }
      }
      if (!added) {
        groups.push([anomaly])
      }
    })

    return groups.filter((g) => g.length > 1)
  }
}
