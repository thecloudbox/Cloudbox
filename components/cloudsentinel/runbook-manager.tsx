"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play } from "lucide-react"
import { RunbookGenerator } from "@/lib/aiops/runbook-generator"
import { CloudSentinel } from "@/lib/aiops/cloudsentinel"
import { MockDataGenerator } from "@/lib/aiops/mock-data-generator"

export function RunbookManager() {
  const [runbookGen] = useState(() => new RunbookGenerator())
  const [sentinel] = useState(() => new CloudSentinel())
  const [generator] = useState(() => new MockDataGenerator())
  const [runbooks, setRunbooks] = useState<any[]>([])
  const [selectedRunbook, setSelectedRunbook] = useState<any>(null)

  useEffect(() => {
    generateRunbooks()
  }, [])

  const generateRunbooks = () => {
    // Generate sample incidents and learn from them
    const metrics = generator.generateMetrics(100, true)
    const logs = generator.generateLogs(200, true)

    sentinel.processMetrics(metrics)
    sentinel.processLogs(logs)

    const incidents = sentinel.getRecentIncidents(20)
    incidents.forEach((incident) => runbookGen.learnFromIncident(incident))

    setRunbooks(runbookGen.getRunbooks())
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <Badge variant="outline" className="text-sm">
              Self-Learning System
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Auto-Generated Runbooks</h1>
          <p className="text-xl text-muted-foreground">
            ML-powered runbooks that learn from past incidents and create automated remediation playbooks
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Runbooks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{runbooks.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-sea-green">
                {runbooks.length > 0
                  ? (runbooks.reduce((sum, r) => sum + r.successRate, 0) / runbooks.length).toFixed(1)
                  : 0}
                %
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{runbooks.reduce((sum, r) => sum + r.timesExecuted, 0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {runbooks.length > 0
                  ? (runbooks.reduce((sum, r) => sum + r.avgResolutionTime, 0) / runbooks.length / 1000).toFixed(1)
                  : 0}
                s
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Runbook List */}
        <div className="grid gap-6 lg:grid-cols-2">
          {runbooks.length === 0 ? (
            <Card className="lg:col-span-2">
              <CardContent className="py-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">No runbooks generated yet</p>
                <p className="text-sm text-muted-foreground">
                  Runbooks are automatically created after detecting incident patterns
                </p>
                <Button onClick={generateRunbooks} className="mt-4">
                  Generate Sample Runbooks
                </Button>
              </CardContent>
            </Card>
          ) : (
            runbooks.map((runbook) => (
              <Card
                key={runbook.id}
                className="cursor-pointer transition-all hover:border-sea-green hover:shadow-lg"
                onClick={() => setSelectedRunbook(runbook)}
              >
                <CardHeader>
                  <CardTitle>{runbook.title}</CardTitle>
                  <CardDescription>Triggered by: {runbook.triggeredBy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-medium text-sea-green">{runbook.successRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Times Executed</span>
                      <span className="font-medium">{runbook.timesExecuted}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Resolution Time</span>
                      <span className="font-medium">{(runbook.avgResolutionTime / 1000).toFixed(1)}s</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Steps</span>
                      <span className="font-medium">{runbook.steps.length}</span>
                    </div>
                  </div>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    View Runbook
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Runbook Details */}
        {selectedRunbook && (
          <Card className="mt-8 border-2 border-sea-green/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedRunbook.title}</CardTitle>
                  <CardDescription>
                    Last updated: {new Date(selectedRunbook.lastUpdated).toLocaleString()}
                  </CardDescription>
                </div>
                <Button onClick={() => setSelectedRunbook(null)} variant="ghost" size="sm">
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedRunbook.steps.map((step: any) => (
                  <Card key={step.order}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold">
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{step.action}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs font-medium text-muted-foreground">Command:</p>
                        <pre className="overflow-x-auto rounded bg-muted p-2 font-mono text-xs">{step.command}</pre>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium text-muted-foreground">Expected Outcome:</p>
                        <p className="text-sm">{step.expectedOutcome}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium text-muted-foreground">If Failed:</p>
                        <p className="text-sm text-orange-500">{step.failureHandling}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
