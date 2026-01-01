"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, AlertTriangle, ArrowUpRight, Calendar, Cpu, HardDrive, Network } from "lucide-react"
import Link from "next/link"
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function InfraPredictDashboard() {
  // Sample prediction data
  const capacityData = [
    { month: "Jan", actual: 65, predicted: 68, threshold: 80 },
    { month: "Feb", actual: 72, predicted: 75, threshold: 80 },
    { month: "Mar", actual: 78, predicted: 82, threshold: 80 },
    { month: "Apr", actual: 85, predicted: 88, threshold: 80 },
    { month: "May", actual: 90, predicted: 93, threshold: 80 },
    { month: "Jun", actual: null, predicted: 96, threshold: 80 },
  ]

  const costProjection = [
    { month: "Jan", actual: 12500, projected: 12500 },
    { month: "Feb", actual: 13200, projected: 13200 },
    { month: "Mar", actual: 14100, projected: 14100 },
    { month: "Apr", actual: 15200, projected: 15200 },
    { month: "May", actual: 16100, projected: 16100 },
    { month: "Jun", actual: null, projected: 17500 },
    { month: "Jul", actual: null, projected: 18900 },
    { month: "Aug", actual: null, projected: 20200 },
  ]

  const resourcePredictions = [
    { resource: "CPU", current: 72, predicted: 89, action: "Scale Up", confidence: 94 },
    { resource: "Memory", current: 65, predicted: 78, action: "Monitor", confidence: 91 },
    { resource: "Storage", current: 81, predicted: 95, action: "Expand", confidence: 96 },
    { resource: "Network", current: 45, predicted: 52, action: "Normal", confidence: 88 },
  ]

  const anomalyForecasts = [
    { date: "May 15", type: "CPU Spike", probability: 78, impact: "High" },
    { date: "May 22", type: "Memory Leak", probability: 65, impact: "Medium" },
    { date: "Jun 3", type: "Disk Full", probability: 92, impact: "Critical" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-background to-muted/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-2 bg-terminal-green/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-terminal-green" />
                </div>
                InfraPredict Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">AI-powered capacity forecasting and anomaly prediction</p>
            </div>
            <Button asChild size="lg" className="bg-terminal-green hover:bg-terminal-green/90">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
            <TabsTrigger value="anomalies">Anomaly Forecasts</TabsTrigger>
            <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Prediction Accuracy</CardDescription>
                  <CardTitle className="text-3xl text-terminal-green">96.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.1% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Cost Savings</CardDescription>
                  <CardTitle className="text-3xl">$47.2K</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">This quarter from optimizations</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Alerts Predicted</CardDescription>
                  <CardTitle className="text-3xl">127</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">Next 30 days forecast</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Capacity Runway</CardDescription>
                  <CardTitle className="text-3xl text-amber-500">43</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">Days until scaling needed</div>
                </CardContent>
              </Card>
            </div>

            {/* Capacity Forecast Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Capacity Forecast</CardTitle>
                <CardDescription>Predicted vs actual usage with threshold alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    actual: { label: "Actual Usage", color: "hsl(var(--chart-1))" },
                    predicted: { label: "Predicted", color: "hsl(var(--chart-2))" },
                    threshold: { label: "Threshold", color: "hsl(var(--destructive))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={capacityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Line type="monotone" dataKey="threshold" stroke="var(--color-threshold)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Resource Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>Resource-Level Predictions</CardTitle>
                <CardDescription>30-day capacity forecasts by resource type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourcePredictions.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-muted rounded-lg">
                          {resource.resource === "CPU" && <Cpu className="h-5 w-5" />}
                          {resource.resource === "Memory" && <HardDrive className="h-5 w-5" />}
                          {resource.resource === "Storage" && <HardDrive className="h-5 w-5" />}
                          {resource.resource === "Network" && <Network className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{resource.resource}</div>
                          <div className="text-sm text-muted-foreground">
                            Current: {resource.current}% → Predicted: {resource.predicted}%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            resource.action === "Scale Up"
                              ? "destructive"
                              : resource.action === "Expand"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {resource.action}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{resource.confidence}% confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Projection</CardTitle>
                <CardDescription>3-month infrastructure cost forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    actual: { label: "Actual Cost", color: "hsl(var(--chart-1))" },
                    projected: { label: "Projected Cost", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={costProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--color-actual)"
                        fill="var(--color-actual)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="projected"
                        stroke="var(--color-projected)"
                        fill="var(--color-projected)"
                        fillOpacity={0.3}
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Predicted Anomalies</CardTitle>
                <CardDescription>Forecasted incidents and their impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {anomalyForecasts.map((anomaly, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="font-semibold">{anomaly.type}</div>
                          <div className="text-sm text-muted-foreground">Predicted: {anomaly.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            anomaly.impact === "Critical"
                              ? "destructive"
                              : anomaly.impact === "High"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {anomaly.impact} Impact
                        </Badge>
                        <div className="text-sm font-medium">{anomaly.probability}% probability</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What-If Scenario Modeling</CardTitle>
                <CardDescription>Test different scaling strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Scenario Planning</h3>
                  <p className="text-muted-foreground mb-6">
                    Model different infrastructure changes and see predicted outcomes
                  </p>
                  <Button size="lg" asChild className="bg-terminal-green hover:bg-terminal-green/90">
                    <Link href="/contact">Request Demo Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-terminal-green/10 to-terminal-yellow/10 border-terminal-green/20">
          <CardContent className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to predict your infrastructure needs?</h3>
                <p className="text-muted-foreground">
                  Get 3-6 month capacity forecasts with 95%+ accuracy. Schedule a demo to see InfraPredict in action.
                </p>
              </div>
              <Button size="lg" asChild className="bg-terminal-green hover:bg-terminal-green/90">
                <Link href="/contact">
                  Schedule Demo
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
