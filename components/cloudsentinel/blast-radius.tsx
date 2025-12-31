"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Target, AlertTriangle, GitBranch, Shield, FileText } from "lucide-react"
import { BlastRadiusPredictor } from "@/lib/aiops/blast-radius-predictor"
import type { BlastRadiusAnalysis } from "@/lib/aiops/types"

export function BlastRadiusAnalyzer() {
  const [predictor] = useState(() => new BlastRadiusPredictor())
  const [targetService, setTargetService] = useState("")
  const [changeType, setChangeType] = useState<"deployment" | "config" | "scaling" | "migration">("deployment")
  const [analysis, setAnalysis] = useState<BlastRadiusAnalysis | null>(null)

  const services = [
    "api-gateway",
    "auth-service",
    "user-service",
    "payment-service",
    "notification-service",
    "database",
    "cache",
  ]

  const analyzeChange = () => {
    if (!targetService) return
    const result = predictor.analyzeChange(targetService, changeType)
    setAnalysis(result)
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-500"
    if (score >= 50) return "text-orange-500"
    if (score >= 30) return "text-yellow-500"
    return "text-sea-green"
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            <Badge variant="outline" className="text-sm">
              Predictive Analytics
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Blast Radius Predictor</h1>
          <p className="text-xl text-muted-foreground">
            Forecast impact scope before deploying changes - Predict affected services and user impact
          </p>
        </div>

        {/* Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Change Impact</CardTitle>
            <CardDescription>Select the service and type of change you're planning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Target Service</label>
                <Select value={targetService} onValueChange={setTargetService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Change Type</label>
                <Select value={changeType} onValueChange={(v: any) => setChangeType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deployment">Deployment</SelectItem>
                    <SelectItem value="config">Configuration</SelectItem>
                    <SelectItem value="scaling">Scaling</SelectItem>
                    <SelectItem value="migration">Migration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={analyzeChange} disabled={!targetService} className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Analyze Impact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Risk Score */}
            <Card className="border-2 border-orange-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <p className="mb-2 text-sm text-muted-foreground">Risk Score</p>
                    <p className={`text-5xl font-bold ${getRiskColor(analysis.riskScore)}`}>{analysis.riskScore}</p>
                    <p className="mt-1 text-xs font-medium uppercase">
                      {analysis.riskScore >= 70 ? "High Risk" : analysis.riskScore >= 50 ? "Medium Risk" : "Low Risk"}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="mb-2 text-sm text-muted-foreground">Affected Services</p>
                    <p className="text-5xl font-bold">{analysis.affectedServices.length}</p>
                    <p className="mt-1 text-xs text-muted-foreground">services impacted</p>
                  </div>

                  <div className="text-center">
                    <p className="mb-2 text-sm text-muted-foreground">Impacted Users</p>
                    <p className="text-5xl font-bold">{analysis.impactedUsers.toLocaleString()}</p>
                    <p className="mt-1 text-xs text-muted-foreground">estimated users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Affected Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Dependency Chain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.dependencyChain.map((service, idx) => (
                    <Badge key={idx} variant="outline" className="px-3 py-1">
                      {idx === 0 ? <span className="font-bold">{service} (target)</span> : <span>{service}</span>}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">All Affected Services:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {analysis.affectedServices.map((service, idx) => (
                      <Badge key={idx} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-sea-green/50 bg-sea-green/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sea-green" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sea-green" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Rollback Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Rollback Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 font-mono text-sm">
                  {analysis.rollbackPlan}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
