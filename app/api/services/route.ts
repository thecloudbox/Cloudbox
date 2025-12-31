import { type NextRequest, NextResponse } from "next/server"
import type { Service } from "@/lib/types"
import { mockServices } from "@/lib/mock-data"

// In production, this would connect to a database
let services: Service[] = mockServices

export async function GET() {
  return NextResponse.json({ services })
}

export async function POST(request: NextRequest) {
  try {
    const newService: Service = await request.json()
    services.push(newService)

    console.log("[v0] Created new service:", newService.name)

    return NextResponse.json({ success: true, service: newService })
  } catch (error) {
    console.error("[v0] Error creating service:", error)
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Service ID required" }, { status: 400 })
    }

    services = services.filter((s) => s.id !== id)

    console.log("[v0] Deleted service:", id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting service:", error)
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 })
  }
}
