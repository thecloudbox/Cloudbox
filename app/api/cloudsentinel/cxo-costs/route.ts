import { NextResponse } from "next/server"
import { CXOCostIntelligence } from "@/lib/aiops/cxo-cost-intelligence"

// This would connect to your actual database
// For now, using mock data for demonstration

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const service = searchParams.get("service")
  const days = Number.parseInt(searchParams.get("days") || "7")

  try {
    // Mock data - replace with actual database queries
    const costs = generateMockCostData(service, days)
    const allocations = generateMockAllocationData()
    const anomalies = detectAnomalies(costs)
    const forecast = CXOCostIntelligence.forecastCost(costs, 30)

    return NextResponse.json({
      success: true,
      data: {
        costs,
        allocations,
        anomalies,
        forecast,
        summary: {
          totalCost: costs.reduce((sum, c) => sum + c.cost, 0),
          avgDailyCost: costs.reduce((sum, c) => sum + c.cost, 0) / days,
          topServices: getTopServices(costs),
        },
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch cost data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    if (action === "calculate_allocation") {
      const allocations = CXOCostIntelligence.allocateSharedCosts(data.infrastructure, data.method || "usage_based")
      return NextResponse.json({ success: true, data: allocations })
    }

    if (action === "forecast") {
      const forecast = CXOCostIntelligence.forecastCost(data.historicalCosts, data.daysAhead || 30)
      return NextResponse.json({ success: true, data: forecast })
    }

    if (action === "calculate_roi") {
      const roi = CXOCostIntelligence.calculateOptimizationROI(
        data.currentCost,
        data.optimizedCost,
        data.implementationCost,
        data.months || 12,
      )
      return NextResponse.json({ success: true, data: roi })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Request processing failed" }, { status: 500 })
  }
}

// Helper functions for mock data generation
function generateMockCostData(service: string | null, days: number) {
  const costs = []
  const baseDate = new Date()
  baseDate.setDate(baseDate.getDate() - days)

  const services = service ? [service] : ["api-gateway", "user-service", "payment-service", "analytics-service"]

  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i)

    services.forEach((svc) => {
      const baseCost = 100 + Math.random() * 50
      costs.push({
        date,
        service: svc,
        cost: baseCost,
        cpuCost: baseCost * 0.4,
        memoryCost: baseCost * 0.3,
        storageCost: baseCost * 0.15,
        networkCost: baseCost * 0.15,
      })
    })
  }

  return costs
}

function generateMockAllocationData() {
  return [
    {
      serviceName: "api-gateway",
      clusterName: "prod-cluster",
      cpuAllocationPercent: 35,
      memoryAllocationPercent: 32,
      allocatedCost: 450.25,
    },
    {
      serviceName: "user-service",
      clusterName: "prod-cluster",
      cpuAllocationPercent: 28,
      memoryAllocationPercent: 30,
      allocatedCost: 380.5,
    },
    {
      serviceName: "payment-service",
      clusterName: "prod-cluster",
      cpuAllocationPercent: 22,
      memoryAllocationPercent: 23,
      allocatedCost: 295.75,
    },
    {
      serviceName: "analytics-service",
      clusterName: "prod-cluster",
      cpuAllocationPercent: 15,
      memoryAllocationPercent: 15,
      allocatedCost: 185.5,
    },
  ]
}

function detectAnomalies(costs: any[]) {
  const serviceCosts = groupByService(costs)
  const anomalies = []

  for (const [service, costData] of Object.entries(serviceCosts)) {
    const historicalCosts = (costData as any[]).slice(0, -1).map((c) => c.cost)
    const currentCost = (costData as any[])[(costData as any[]).length - 1].cost

    const anomaly = CXOCostIntelligence.detectCostAnomaly(currentCost, historicalCosts, 3)

    if (anomaly.isAnomaly) {
      anomalies.push({
        service,
        currentCost,
        expectedCost: historicalCosts.reduce((sum, c) => sum + c, 0) / historicalCosts.length,
        zscore: anomaly.zscore,
        severity: anomaly.severity,
      })
    }
  }

  return anomalies
}

function groupByService(costs: any[]) {
  return costs.reduce((acc, cost) => {
    if (!acc[cost.service]) acc[cost.service] = []
    acc[cost.service].push(cost)
    return acc
  }, {})
}

function getTopServices(costs: any[]) {
  const serviceTotal = costs.reduce((acc, cost) => {
    if (!acc[cost.service]) acc[cost.service] = 0
    acc[cost.service] += cost.cost
    return acc
  }, {})

  return Object.entries(serviceTotal)
    .map(([service, total]) => ({ service, total }))
    .sort((a, b) => (b.total as number) - (a.total as number))
    .slice(0, 5)
}
