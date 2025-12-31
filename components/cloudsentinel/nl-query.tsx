"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Search, Sparkles, Clock, AlertTriangle } from "lucide-react"
import { NLQueryEngine } from "@/lib/aiops/nl-query-engine"
import { CloudSentinel } from "@/lib/aiops/cloudsentinel"
import { MockDataGenerator } from "@/lib/aiops/mock-data-generator"
import type { NaturalLanguageQuery } from "@/lib/aiops/types"

export function NLQueryInterface() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<NaturalLanguageQuery | null>(null)
  const [loading, setLoading] = useState(false)
  const [nlEngine] = useState(() => new NLQueryEngine())
  const [sentinel] = useState(() => new CloudSentinel())
  const [generator] = useState(() => new MockDataGenerator())

  const exampleQueries = [
    "Why was the API slow at 3pm yesterday?",
    "What services failed in the last hour?",
    "Show me all database issues today",
    "Which services are causing high costs?",
    "What anomalies were detected last week?",
  ]

  const handleQuery = async (queryText: string) => {
    setLoading(true)
    setQuery(queryText)

    // Generate mock data for demo
    const metrics = generator.generateMetrics(100, true)
    const logs = generator.generateLogs(200, true)
    sentinel.processMetrics(metrics)
    sentinel.processLogs(logs)

    // Update NL engine with data
    const incidents = sentinel.getRecentIncidents(50)
    const anomalies = sentinel.getAnomalies()
    nlEngine.updateData(incidents, anomalies)

    // Process query
    const queryResult = await nlEngine.processQuery(queryText)
    setResult(queryResult)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <Badge variant="outline" className="text-sm">
              Revolutionary Feature
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Ask CloudSentinel Anything</h1>
          <p className="text-xl text-muted-foreground">
            Natural language queries powered by AI - Ask questions in plain English about your infrastructure
          </p>
        </div>

        {/* Query Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>Type your question in natural language or try one of the examples below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Why was the API slow at 3pm?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery(query)}
                className="flex-1"
              />
              <Button onClick={() => handleQuery(query)} disabled={loading || !query}>
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Ask
                  </>
                )}
              </Button>
            </div>

            {/* Example Queries */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((example, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuery(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Insights */}
            {result.results.insights.length > 0 && (
              <Card className="border-sea-green/50 bg-sea-green/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-sea-green" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.results.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sea-green" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Incidents */}
            {result.results.incidents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Related Incidents ({result.results.incidents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.results.incidents.slice(0, 5).map((incident) => (
                      <div key={incident.id} className="flex items-start justify-between rounded-lg border p-3">
                        <div className="flex-1">
                          <p className="font-medium">{incident.title}</p>
                          <p className="text-sm text-muted-foreground">{incident.description}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(incident.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {incident.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Anomalies */}
            {result.results.anomalies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Detected Anomalies ({result.results.anomalies.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.results.anomalies.slice(0, 10).map((anomaly) => (
                      <div key={anomaly.id} className="flex items-center justify-between rounded border p-2 text-sm">
                        <span>
                          {anomaly.service} - {anomaly.metric}
                        </span>
                        <span className="font-mono text-xs">
                          {anomaly.value.toFixed(2)} (expected: {anomaly.expected.toFixed(2)})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No Results */}
            {result.results.incidents.length === 0 && result.results.anomalies.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-lg font-medium">No issues found</p>
                  <p className="text-sm text-muted-foreground">Everything looks healthy in the specified time range</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
