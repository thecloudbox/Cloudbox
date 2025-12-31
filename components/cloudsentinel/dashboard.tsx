"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Brain, Shield, TrendingUp, Zap, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { CloudSentinel } from "@/lib/aiops/cloudsentinel"
import { MockDataGenerator } from "@/lib/aiops/mock-data-generator"
import type { Incident } from "@/lib/aiops/types"

export function CloudSentinelDashboard() {
  const [sentinel] = useState(() => new CloudSentinel())
  const [generator] = useState(() => new MockDataGenerator())
  const [isRunning, setIsRunning] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [models, setModels] = useState<any[]>([])
  const [healthScore, setHealthScore] = useState<any>(null)

  useEffect(() => {
    updateDashboard()
  }, [])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const metrics = generator.generateMetrics(50, true)
      sentinel.processMetrics(metrics)

      const logs = generator.generateLogs(100, true)
      sentinel.processLogs(logs)

      updateDashboard()
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning, sentinel, generator])

  const updateDashboard = () => {
    const logs = generator.generateLogs(100, true)
    setStats(sentinel.getStatistics())
    setIncidents(sentinel.getRecentIncidents(5))
    setModels(sentinel.getActiveModels())
    setHealthScore(sentinel.getHealthScore(logs))
  }

  const toggleMonitoring = () => {
    setIsRunning(!isRunning)
  }

  const severityColors = {
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    critical: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <Badge variant="outline" className="text-sm">
                  Open Source AIOps Platform
                </Badge>
              </div>
              <h1 className="mb-4 font-mono text-4xl font-bold">CloudSentinel</h1>
              <p className="mb-6 text-xl text-muted-foreground">
                ML-Powered AIOps with Natural Language Queries, Cost Intelligence & Predictive Analytics
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={toggleMonitoring}>
                  {isRunning ? (
                    <>
                      <Activity className="mr-2 h-5 w-5 animate-pulse" />
                      Stop Monitoring
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Start Live Demo
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/thecloudbox/cloudsentinel" target="_blank" rel="noreferrer noopener">
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      {stats && (
        <section className="border-b py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalIncidents}</div>
                  <p className="text-xs text-muted-foreground">{stats.autoResolved} auto-resolved</p>
                </CardContent>
              </Card>

              <Card className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Prevention Rate</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sea-green">{stats.preventionRate.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">{stats.preventedIncidents} incidents prevented</p>
                </CardContent>
              </Card>

              <Card className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">MTTR Reduction</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sea-green">80%</div>
                  <p className="text-xs text-muted-foreground">Avg MTTR: {stats.avgMTTR.toFixed(1)}s</p>
                </CardContent>
              </Card>

              <Card className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalAnomalies}</div>
                  <p className="text-xs text-muted-foreground">By ML models</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Health Score */}
      {healthScore && (
        <section className="border-b py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-bold">System Health</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Overall Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative h-32 w-32">
                      <svg className="h-32 w-32 -rotate-90 transform">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(healthScore.overall / 100) * 351.86} 351.86`}
                          className="text-sea-green transition-all"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{healthScore.overall}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Service Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(healthScore.services).map(([service, score]: [string, any]) => (
                      <div key={service}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-medium">{service}</span>
                          <span>{Math.round(score)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-sea-green transition-all" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Recent Incidents */}
      <section className="border-b py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-sea-green" />
                  <p className="text-lg font-medium">No incidents detected</p>
                  <p className="text-sm text-muted-foreground">
                    {isRunning ? "Monitoring active..." : "Start monitoring to see incidents"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              incidents.map((incident) => (
                <Card key={incident.id} className="transition-all hover:border-sea-green hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <CardDescription className="mt-1">{incident.description}</CardDescription>
                      </div>
                      <Badge className={severityColors[incident.severity]}>{incident.severity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>{incident.affectedServices.join(", ")}</span>
                      </div>
                      {incident.status === "auto-resolved" && (
                        <Badge variant="outline" className="bg-sea-green/10 text-sea-green">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Auto-Resolved
                        </Badge>
                      )}
                      {incident.mttr && (
                        <span className="text-muted-foreground">MTTR: {(incident.mttr / 1000).toFixed(1)}s</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ML Models */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold">Active ML Models</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {models.map((model) => (
              <Card key={model.id} className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription className="capitalize">{model.type} model</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Predictions</span>
                      <span className="font-medium">{model.predictions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Incidents Prevented</span>
                      <span className="font-medium text-sea-green">{model.prevented}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Trained</span>
                      <span className="font-medium">{Math.round((Date.now() - model.lastTrained) / 3600000)}h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
