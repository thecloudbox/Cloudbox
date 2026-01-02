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
    <div className="min-h-screen bg-[#0d0e14]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d29] via-[#0d0e14] to-[#0d0e14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="flex items-center justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Open Source AIOps Platform</span>
              </div>

              <h1 className="mb-4 text-5xl font-bold text-white tracking-tight">CloudSentinel</h1>
              <p className="mb-8 text-xl text-slate-400 leading-relaxed">
                ML-Powered AIOps with Natural Language Queries, Cost Intelligence & Predictive Analytics
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={toggleMonitoring}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                >
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
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
                  asChild
                >
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
        <section className="border-b border-slate-800 py-16 bg-[#0d0e14]">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Total Incidents</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.totalIncidents}</div>
                  <p className="text-xs text-slate-500">{stats.autoResolved} auto-resolved</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Prevention Rate</CardTitle>
                  <Shield className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-400">{stats.preventionRate.toFixed(1)}%</div>
                  <p className="text-xs text-slate-500">{stats.preventedIncidents} incidents prevented</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">MTTR Reduction</CardTitle>
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-400">80%</div>
                  <p className="text-xs text-slate-500">Avg MTTR: {stats.avgMTTR.toFixed(1)}s</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Anomalies Detected</CardTitle>
                  <Brain className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stats.totalAnomalies}</div>
                  <p className="text-xs text-slate-500">By ML models</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Health Score */}
      {healthScore && (
        <section className="border-b border-slate-800 py-16 bg-[#0d0e14]">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-bold text-white">System Health</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-white">Overall Health Score</CardTitle>
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
                          className="text-emerald-400 transition-all"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{healthScore.overall}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-white">Service Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(healthScore.services).map(([service, score]: [string, any]) => (
                      <div key={service}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-medium text-slate-300">{service}</span>
                          <span className="text-slate-400">{Math.round(score)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${score}%` }} />
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
      <section className="border-b border-slate-800 py-16 bg-[#0d0e14]">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.length === 0 ? (
              <Card className="bg-[#1a1d29] border-slate-800">
                <CardContent className="py-16 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                  <p className="text-lg font-medium text-white">No incidents detected</p>
                  <p className="text-sm text-slate-500">
                    {isRunning ? "Monitoring active..." : "Start monitoring to see incidents"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              incidents.map((incident) => (
                <Card
                  key={incident.id}
                  className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white">{incident.title}</CardTitle>
                        <CardDescription className="mt-1 text-slate-400">{incident.description}</CardDescription>
                      </div>
                      <Badge className={severityColors[incident.severity]}>{incident.severity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>{incident.affectedServices.join(", ")}</span>
                      </div>
                      {incident.status === "auto-resolved" && (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Auto-Resolved
                        </Badge>
                      )}
                      {incident.mttr && <span>MTTR: {(incident.mttr / 1000).toFixed(1)}s</span>}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ML Models */}
      <section className="py-16 bg-[#0d0e14]">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Active ML Models</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {models.map((model) => (
              <Card key={model.id} className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-white">{model.name}</CardTitle>
                  <CardDescription className="capitalize text-slate-400">{model.type} model</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Accuracy</span>
                      <span className="font-medium text-white">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Predictions</span>
                      <span className="font-medium text-white">{model.predictions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Incidents Prevented</span>
                      <span className="font-medium text-emerald-400">{model.prevented}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Last Trained</span>
                      <span className="font-medium text-white">
                        {Math.round((Date.now() - model.lastTrained) / 3600000)}h ago
                      </span>
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
