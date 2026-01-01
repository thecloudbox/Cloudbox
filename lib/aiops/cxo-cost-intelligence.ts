// CXO Cost Intelligence Engine

interface ResourceUsage {
  serviceName: string
  resourceType: string
  resourceId: string
  cpuCores: number
  memoryGb: number
  storageGb: number
  networkIngressGb: number
  networkEgressGb: number
  cloudProvider: string
  region: string
  tags: Record<string, string>
}

interface CloudPricing {
  cloudProvider: string
  region: string
  cpuHourCost: number
  memoryGbHourCost: number
  storageGbMonthCost: number
  networkGbCost: number
}

interface ServiceCost {
  serviceName: string
  costType: string
  costUsd: number
  cpuCostUsd: number
  memoryCostUsd: number
  storageCostUsd: number
  networkIngressCostUsd: number
  networkEgressCostUsd: number
  cloudProvider: string
  region: string
}

interface SharedInfrastructure {
  clusterName: string
  resourceType: string
  totalCostUsd: number
  services: Array<{
    serviceName: string
    cpuUsage: number
    memoryUsage: number
  }>
}

export class CXOCostIntelligence {
  /**
   * Calculate cost for a single resource based on usage and pricing
   */
  static calculateResourceCost(usage: ResourceUsage, pricing: CloudPricing, hours = 1): ServiceCost {
    const cpuCost = usage.cpuCores * pricing.cpuHourCost * hours
    const memoryCost = usage.memoryGb * pricing.memoryGbHourCost * hours
    const storageCost = (usage.storageGb * pricing.storageGbMonthCost * hours) / 730 // monthly to hourly
    const ingressCost = usage.networkIngressGb * pricing.networkGbCost * 0.5 // ingress typically cheaper
    const egressCost = usage.networkEgressGb * pricing.networkGbCost

    return {
      serviceName: usage.serviceName,
      costType: "compute",
      costUsd: cpuCost + memoryCost + storageCost + ingressCost + egressCost,
      cpuCostUsd: cpuCost,
      memoryCostUsd: memoryCost,
      storageCostUsd: storageCost,
      networkIngressCostUsd: ingressCost,
      networkEgressCostUsd: egressCost,
      cloudProvider: usage.cloudProvider,
      region: usage.region,
    }
  }

  /**
   * Allocate shared infrastructure costs to services based on usage
   */
  static allocateSharedCosts(
    infrastructure: SharedInfrastructure,
    allocationMethod: "usage_based" | "weighted" | "equal" = "usage_based",
  ): Array<{ serviceName: string; allocatedCost: number; allocationPercent: number }> {
    if (allocationMethod === "equal") {
      const costPerService = infrastructure.totalCostUsd / infrastructure.services.length
      return infrastructure.services.map((service) => ({
        serviceName: service.serviceName,
        allocatedCost: costPerService,
        allocationPercent: (1 / infrastructure.services.length) * 100,
      }))
    }

    // Usage-based allocation (default)
    const totalCpu = infrastructure.services.reduce((sum, s) => sum + s.cpuUsage, 0)
    const totalMemory = infrastructure.services.reduce((sum, s) => sum + s.memoryUsage, 0)

    return infrastructure.services.map((service) => {
      const cpuRatio = totalCpu > 0 ? service.cpuUsage / totalCpu : 0
      const memoryRatio = totalMemory > 0 ? service.memoryUsage / totalMemory : 0

      // Average CPU and memory ratio for allocation
      const allocationPercent = ((cpuRatio + memoryRatio) / 2) * 100
      const allocatedCost = infrastructure.totalCostUsd * (allocationPercent / 100)

      return {
        serviceName: service.serviceName,
        allocatedCost,
        allocationPercent,
      }
    })
  }

  /**
   * Calculate Kubernetes pod cost
   */
  static calculatePodCost(
    podName: string,
    namespace: string,
    serviceName: string,
    cpuCores: number,
    memoryGb: number,
    clusterCostPerHour: number,
    totalClusterCpu: number,
    totalClusterMemory: number,
  ): number {
    const cpuRatio = cpuCores / totalClusterCpu
    const memoryRatio = memoryGb / totalClusterMemory

    // Average of CPU and memory ratio
    const allocationRatio = (cpuRatio + memoryRatio) / 2

    return clusterCostPerHour * allocationRatio
  }

  /**
   * Detect cost anomalies using Z-score
   */
  static detectCostAnomaly(
    currentCost: number,
    historicalCosts: number[],
    threshold = 3,
  ): { isAnomaly: boolean; zscore: number; severity: string } {
    if (historicalCosts.length < 7) {
      return { isAnomaly: false, zscore: 0, severity: "none" }
    }

    const mean = historicalCosts.reduce((sum, c) => sum + c, 0) / historicalCosts.length
    const variance = historicalCosts.reduce((sum, c) => sum + Math.pow(c - mean, 2), 0) / historicalCosts.length
    const stdDev = Math.sqrt(variance)

    const zscore = stdDev > 0 ? (currentCost - mean) / stdDev : 0
    const isAnomaly = Math.abs(zscore) > threshold

    let severity = "none"
    if (Math.abs(zscore) > 5) severity = "critical"
    else if (Math.abs(zscore) > 4) severity = "high"
    else if (Math.abs(zscore) > 3) severity = "medium"
    else if (Math.abs(zscore) > 2) severity = "low"

    return { isAnomaly, zscore, severity }
  }

  /**
   * Calculate cost per request/transaction
   */
  static calculateCostPerTransaction(totalCost: number, requestCount: number): number {
    return requestCount > 0 ? totalCost / requestCount : 0
  }

  /**
   * Forecast future costs based on historical data
   */
  static forecastCost(
    historicalCosts: Array<{ date: Date; cost: number }>,
    daysAhead = 30,
  ): Array<{ date: Date; forecastedCost: number }> {
    if (historicalCosts.length < 7) {
      return []
    }

    // Simple linear regression for forecasting
    const n = historicalCosts.length
    const xValues = historicalCosts.map((_, i) => i)
    const yValues = historicalCosts.map((c) => c.cost)

    const sumX = xValues.reduce((sum, x) => sum + x, 0)
    const sumY = yValues.reduce((sum, y) => sum + y, 0)
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0)
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const forecasts: Array<{ date: Date; forecastedCost: number }> = []
    const lastDate = historicalCosts[historicalCosts.length - 1].date

    for (let i = 1; i <= daysAhead; i++) {
      const forecastedCost = slope * (n + i) + intercept
      const forecastDate = new Date(lastDate)
      forecastDate.setDate(forecastDate.getDate() + i)

      forecasts.push({
        date: forecastDate,
        forecastedCost: Math.max(0, forecastedCost), // Ensure non-negative
      })
    }

    return forecasts
  }

  /**
   * Calculate ROI for cost optimization initiatives
   */
  static calculateOptimizationROI(
    currentMonthlyCost: number,
    optimizedMonthlyCost: number,
    implementationCost: number,
    months = 12,
  ): {
    monthlySavings: number
    totalSavings: number
    roi: number
    paybackMonths: number
  } {
    const monthlySavings = currentMonthlyCost - optimizedMonthlyCost
    const totalSavings = monthlySavings * months
    const roi = implementationCost > 0 ? ((totalSavings - implementationCost) / implementationCost) * 100 : 0
    const paybackMonths = monthlySavings > 0 ? implementationCost / monthlySavings : Number.POSITIVE_INFINITY

    return {
      monthlySavings,
      totalSavings,
      roi,
      paybackMonths,
    }
  }
}

export default CXOCostIntelligence
