import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { query } = await request.json()

  // Simulate NL query processing
  const response = {
    query,
    timestamp: Date.now(),
    results: {
      incidents: [
        {
          id: `inc_${Date.now()}`,
          description: "High latency detected",
          severity: "high",
          timestamp: Date.now() - 3600000,
          status: "resolved",
          affectedServices: ["api-gateway"],
        },
      ],
      anomalies: [],
      insights: ["CPU usage spike correlated with slowdown", "2 incidents were auto-remediated"],
      timeRange: {
        start: Date.now() - 86400000,
        end: Date.now(),
      },
    },
  }

  return NextResponse.json(response)
}
