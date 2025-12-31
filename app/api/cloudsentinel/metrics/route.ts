import { NextResponse } from "next/server"

export async function GET() {
  // Simulate real-time metrics
  const metrics = {
    timestamp: Date.now(),
    services: [
      {
        name: "api-gateway",
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        latency: Math.random() * 500,
        errorRate: Math.random() * 5,
      },
      {
        name: "auth-service",
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        latency: Math.random() * 200,
        errorRate: Math.random() * 2,
      },
      {
        name: "database",
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        latency: Math.random() * 100,
        errorRate: Math.random() * 1,
      },
    ],
  }

  return NextResponse.json(metrics)
}
