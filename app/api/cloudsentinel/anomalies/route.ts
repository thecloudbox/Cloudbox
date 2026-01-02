import { NextResponse } from "next/server"
import { CloudSentinel } from "@/lib/aiops/cloudsentinel"
import { MockDataGenerator } from "@/lib/aiops/mock-data-generator"

const sentinel = new CloudSentinel()
const generator = new MockDataGenerator()

// Generate some sample data
const metrics = generator.generateMetrics(100, true)
sentinel.processMetrics(metrics)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
  const service = searchParams.get("service") || undefined

  const anomalies = service ? sentinel.getAnomaliesByService(service, limit) : sentinel.getAnomalies(limit)

  return NextResponse.json({
    anomalies,
    stats: sentinel.getAnomalyStats(),
    total: anomalies.length,
  })
}
