"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, AlertTriangle, Lightbulb, Cloud } from "lucide-react"
import { CostIntelligenceEngine } from "@/lib/aiops/cost-intelligence"
import { CloudSentinel } from "@/lib/aiops/cloudsentinel"
import { MockDataGenerator } from "@/lib/aiops/mock-data-generator"

export function CostIntelligence() {
  const [costEngine] = useState(() => new CostIntelligenceEngine())
  const [sentinel] = useState(() => new CloudSentinel())
  const [generator] = useState(() => new MockDataGenerator())
  const [costAnomalies, setCostAnomalies] = useState<any[]>([])
  const [savings, setSavings] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    analyzeCosts()
  }, [])

  const analyzeCosts = () => {
    setIsAnalyzing(true)

    const metrics = generator.generateMetrics(200, true)
    const performanceAnomalies = sentinel.getAnomalies()

    const anomalies = costEngine.analyzeCosts(metrics, performanceAnomalies)
    const savingsOpportunity = costEngine.calculateSavingsOpportunity()

    setCostAnomalies(anomalies)
    setSavings(savingsOpportunity)
    setIsAnalyzing(false)
  }

  const cloudColors = {
    aws: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    gcp: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    azure: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    linode: "bg-green-500/10 text-green-500 border-green-500/20",
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <Badge variant="outline" className="text-sm">
              Market First
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Cost Intelligence</h1>
          <p className="text-xl text-muted-foreground">
            Cross-cloud cost analysis correlating spending with performance issues
          </p>
        </div>

        {/* Savings Opportunity */}
        {savings && (
          <Card className="mb-8 border-sea-green/50 bg-sea-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-sea-green" />
                Savings Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
                  <p className="text-3xl font-bold text-sea-green">${savings.monthly.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Savings</p>
                  <p className="text-3xl font-bold text-sea-green">${savings.annual.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Top Recommendations:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {savings.recommendations.slice(0, 2).map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sea-green" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cost Anomalies */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cost Anomalies</h2>
          <Button onClick={analyzeCosts} disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : "Refresh Analysis"}
          </Button>
        </div>

        {costAnomalies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <DollarSign className="mx-auto mb-4 h-12 w-12 text-sea-green" />
              <p className="text-lg font-medium">No cost anomalies detected</p>
              <p className="text-sm text-muted-foreground">Your spending patterns look normal</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {costAnomalies.map((anomaly) => (
              <Card key={anomaly.id} className="transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Cloud className="h-5 w-5" />
                        {anomaly.service}
                      </CardTitle>
                      <CardDescription>Cost spike detected on {anomaly.cloudProvider}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={cloudColors[anomaly.cloudProvider as keyof typeof cloudColors]}>
                        {anomaly.cloudProvider.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {anomaly.severity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Cost</p>
                      <p className="text-xl font-bold">${anomaly.expectedCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Actual Cost</p>
                      <p className="text-xl font-bold text-orange-500">${anomaly.actualCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost Increase</p>
                      <p className="flex items-center gap-1 text-xl font-bold text-red-500">
                        <TrendingUp className="h-4 w-4" />
                        {anomaly.costIncrease.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      {anomaly.linkedToPerformanceIssue ? (
                        <Badge variant="outline" className="mt-1 bg-orange-500/10 text-orange-500">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Linked to Issue
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1">
                          Normal Spike
                        </Badge>
                      )}
                    </div>
                  </div>
                  {anomaly.linkedToPerformanceIssue && (
                    <div className="mt-4 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                      <p className="text-sm font-medium text-orange-500">
                        This cost spike is correlated with a performance issue
                      </p>
                      <p className="text-xs text-muted-foreground">Incident ID: {anomaly.performanceIssueId}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {savings && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {savings.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-sea-green" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
