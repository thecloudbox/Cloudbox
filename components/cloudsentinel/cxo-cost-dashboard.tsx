"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Cpu, HardDrive, Network, AlertTriangle, Download, RefreshCw } from "lucide-react"

interface CostData {
  costs: any[]
  allocations: any[]
  anomalies: any[]
  forecast: any[]
  summary: {
    totalCost: number
    avgDailyCost: number
    topServices: any[]
  }
}

export function CXOCostDashboard() {
  const [costData, setCostData] = useState<CostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<number>(7)

  useEffect(() => {
    fetchCostData()
  }, [selectedService, timeRange])

  const fetchCostData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        days: timeRange.toString(),
        ...(selectedService !== "all" && { service: selectedService }),
      })

      const response = await fetch(`/api/cloudsentinel/cxo-costs?${params}`)
      const result = await response.json()

      if (result.success) {
        setCostData(result.data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch cost data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !costData) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-8 w-8 animate-spin text-terminal-green" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-terminal-green">CXO Cost Intelligence</h2>
          <p className="text-gray-400 mt-1">Real-time cost visibility across all services</p>
        </div>
        <div className="flex gap-2">
          <select
            className="bg-gray-800 border border-terminal-green/30 rounded px-3 py-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(Number.parseInt(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <Button onClick={fetchCostData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-terminal-green/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-terminal-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-green">${costData.summary.totalCost.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Last {timeRange} days</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-terminal-green/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Daily Cost</CardTitle>
            <TrendingUp className="h-4 w-4 text-terminal-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terminal-yellow">${costData.summary.avgDailyCost.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Per day</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-terminal-green/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Services</CardTitle>
            <Cpu className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{costData.summary.topServices.length}</div>
            <p className="text-xs text-gray-500 mt-1">Monitored services</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-terminal-green/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Cost Anomalies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{costData.anomalies.length}</div>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-900 border border-terminal-green/30">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">By Service</TabsTrigger>
          <TabsTrigger value="allocation">Shared Costs</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gray-900 border-terminal-green/30">
            <CardHeader>
              <CardTitle className="text-terminal-green">Cost Breakdown by Type</CardTitle>
              <CardDescription>Distribution across compute, storage, and network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costData.summary.topServices.map((service: any) => (
                  <div key={service.service} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">{service.service}</span>
                      <span className="text-sm font-bold text-terminal-green">${service.total.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-terminal-green to-terminal-yellow"
                        style={{ width: `${(service.total / costData.summary.totalCost) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card className="bg-gray-900 border-terminal-green/30">
            <CardHeader>
              <CardTitle className="text-terminal-green">Cost Per Service</CardTitle>
              <CardDescription>Detailed breakdown by service component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costData.summary.topServices.map((service: any) => (
                  <div key={service.service} className="p-4 bg-gray-800 rounded-lg border border-terminal-green/20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-terminal-green">{service.service}</h3>
                      <span className="text-xl font-bold text-terminal-yellow">${service.total.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-blue-400" />
                        <div>
                          <div className="text-gray-500">CPU</div>
                          <div className="font-medium text-blue-400">${(service.total * 0.4).toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-purple-400" />
                        <div>
                          <div className="text-gray-500">Memory</div>
                          <div className="font-medium text-purple-400">${(service.total * 0.3).toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-green-400" />
                        <div>
                          <div className="text-gray-500">Storage</div>
                          <div className="font-medium text-green-400">${(service.total * 0.15).toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-terminal-yellow" />
                        <div>
                          <div className="text-gray-500">Network</div>
                          <div className="font-medium text-terminal-yellow">${(service.total * 0.15).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card className="bg-gray-900 border-terminal-green/30">
            <CardHeader>
              <CardTitle className="text-terminal-green">Shared Infrastructure Allocation</CardTitle>
              <CardDescription>How cluster costs are distributed across services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costData.allocations.map((allocation: any) => (
                  <div
                    key={allocation.serviceName}
                    className="p-4 bg-gray-800 rounded-lg border border-terminal-green/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-terminal-green">{allocation.serviceName}</h3>
                        <p className="text-sm text-gray-500">{allocation.clusterName}</p>
                      </div>
                      <span className="text-xl font-bold text-terminal-yellow">
                        ${allocation.allocatedCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">CPU Allocation</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-400"
                              style={{ width: `${allocation.cpuAllocationPercent}%` }}
                            />
                          </div>
                          <span className="font-medium text-blue-400">{allocation.cpuAllocationPercent}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Memory Allocation</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-400"
                              style={{ width: `${allocation.memoryAllocationPercent}%` }}
                            />
                          </div>
                          <span className="font-medium text-purple-400">{allocation.memoryAllocationPercent}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card className="bg-gray-900 border-terminal-green/30">
            <CardHeader>
              <CardTitle className="text-terminal-green">Cost Anomalies Detected</CardTitle>
              <CardDescription>Services with unusual cost patterns</CardDescription>
            </CardHeader>
            <CardContent>
              {costData.anomalies.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No cost anomalies detected. All services operating within normal parameters.
                </div>
              ) : (
                <div className="space-y-4">
                  {costData.anomalies.map((anomaly: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg border-l-4 border-red-400">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <h3 className="font-semibold text-red-400">{anomaly.service}</h3>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                            ${anomaly.severity === "critical" ? "border-red-500 text-red-500" : ""}
                            ${anomaly.severity === "high" ? "border-orange-500 text-orange-500" : ""}
                            ${anomaly.severity === "medium" ? "border-yellow-500 text-yellow-500" : ""}
                          `}
                        >
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Current Cost</div>
                          <div className="font-medium text-red-400">${anomaly.currentCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Expected Cost</div>
                          <div className="font-medium text-gray-300">${anomaly.expectedCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Z-Score</div>
                          <div className="font-medium text-terminal-yellow">{anomaly.zscore.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card className="bg-gray-900 border-terminal-green/30">
            <CardHeader>
              <CardTitle className="text-terminal-green">30-Day Cost Forecast</CardTitle>
              <CardDescription>Predicted costs based on historical trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-terminal-green mx-auto mb-4" />
                <p className="text-gray-400">Forecasting engine calculating predictions...</p>
                <p className="text-sm text-gray-500 mt-2">Based on {timeRange} days of historical data</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
