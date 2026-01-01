import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock } from "lucide-react"

export const metadata = {
  title: "System Status - TheCloudbox",
  description: "Real-time status of TheCloudbox services and infrastructure",
}

const services = [
  {
    name: "API Gateway",
    status: "operational",
    uptime: "99.98%",
    responseTime: "45ms",
    region: "Global",
  },
  {
    name: "Database Cluster",
    status: "operational",
    uptime: "99.99%",
    responseTime: "12ms",
    region: "Multi-Region",
  },
  {
    name: "CloudSentinel AIOps",
    status: "operational",
    uptime: "99.95%",
    responseTime: "230ms",
    region: "Global",
  },
  {
    name: "Monitoring & Alerts",
    status: "operational",
    uptime: "100%",
    responseTime: "8ms",
    region: "Global",
  },
  {
    name: "Backup Services",
    status: "operational",
    uptime: "99.97%",
    responseTime: "150ms",
    region: "Multi-Region",
  },
  {
    name: "CDN & Edge Network",
    status: "operational",
    uptime: "99.99%",
    responseTime: "18ms",
    region: "Global",
  },
  {
    name: "Authentication Services",
    status: "operational",
    uptime: "99.98%",
    responseTime: "35ms",
    region: "Multi-Region",
  },
  {
    name: "Container Orchestration",
    status: "operational",
    uptime: "99.96%",
    responseTime: "95ms",
    region: "Global",
  },
]

const incidents = [
  {
    date: "2025-12-28",
    title: "Brief API Latency Spike",
    status: "resolved",
    duration: "12 minutes",
    impact: "Minor performance degradation in Asia-Pacific region",
  },
  {
    date: "2025-12-15",
    title: "Database Maintenance",
    status: "completed",
    duration: "2 hours",
    impact: "Scheduled maintenance window - no user impact",
  },
]

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-terminal-green/10 border border-terminal-green/20">
            <CheckCircle2 className="w-5 h-5 text-terminal-green" />
            <span className="text-terminal-green font-mono text-sm">All Systems Operational</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">System Status</h1>
          <p className="text-gray-400 text-lg">Real-time monitoring of TheCloudbox infrastructure and services</p>
        </div>

        {/* Current Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-terminal-green">$</span> Current Service Status
          </h2>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 p-6 hover:border-terminal-green/30 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <CheckCircle2 className="w-5 h-5 text-terminal-green flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="text-gray-400">Uptime</p>
                      <p className="text-terminal-green font-mono">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Response</p>
                      <p className="text-terminal-yellow font-mono">{service.responseTime}</p>
                    </div>
                    <Badge className="bg-terminal-green/10 text-terminal-green border-terminal-green/20">
                      Operational
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <div className="text-terminal-green text-3xl font-mono font-bold mb-2">99.98%</div>
            <div className="text-gray-400">Average Uptime (30d)</div>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <div className="text-terminal-yellow text-3xl font-mono font-bold mb-2">45ms</div>
            <div className="text-gray-400">Global Average Latency</div>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <div className="text-terminal-green text-3xl font-mono font-bold mb-2">0</div>
            <div className="text-gray-400">Active Incidents</div>
          </Card>
        </div>

        {/* Incident History */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-terminal-green">$</span> Recent Incident History
          </h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4 flex-1">
                    <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{incident.title}</h3>
                        <Badge className="bg-gray-800 text-gray-300 border-gray-700">{incident.status}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{incident.impact}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500 font-mono">{incident.date}</span>
                        <span className="text-terminal-yellow font-mono">Duration: {incident.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <Card className="mt-12 bg-gradient-to-br from-terminal-green/5 to-terminal-yellow/5 border-terminal-green/20 p-8">
          <h3 className="text-xl font-bold text-white mb-2">Subscribe to Status Updates</h3>
          <p className="text-gray-400 mb-4">Get notified about incidents and maintenance windows via email or SMS</p>
          <button className="px-6 py-3 bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded-lg hover:bg-terminal-green/30 transition-colors font-mono">
            Subscribe Now
          </button>
        </Card>
      </div>
    </div>
  )
}
