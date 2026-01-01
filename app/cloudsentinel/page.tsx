"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudSentinelDashboard } from "@/components/cloudsentinel/dashboard"
import { NLQueryInterface } from "@/components/cloudsentinel/nl-query"
import { CostIntelligence } from "@/components/cloudsentinel/cost-intelligence"
import { BlastRadiusAnalyzer } from "@/components/cloudsentinel/blast-radius"
import { RunbookManager } from "@/components/cloudsentinel/runbook-manager"
import { CXOCostDashboard } from "@/components/cloudsentinel/cxo-cost-dashboard"

export default function CloudSentinelPage() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="border-b">
          <div className="container mx-auto px-4">
            <TabsList className="h-16 w-full justify-start gap-4 bg-transparent">
              <TabsTrigger value="dashboard" className="data-[state=active]:text-sea-green">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="nl-query" className="data-[state=active]:text-sea-green">
                Ask CloudSentinel
              </TabsTrigger>
              <TabsTrigger value="cost" className="data-[state=active]:text-sea-green">
                Cost Intelligence
              </TabsTrigger>
              <TabsTrigger value="cxo-costs" className="data-[state=active]:text-sea-green">
                CXO Cost Analytics
              </TabsTrigger>
              <TabsTrigger value="blast-radius" className="data-[state=active]:text-sea-green">
                Blast Radius
              </TabsTrigger>
              <TabsTrigger value="runbooks" className="data-[state=active]:text-sea-green">
                Auto-Runbooks
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="dashboard" className="mt-0">
          <CloudSentinelDashboard />
        </TabsContent>

        <TabsContent value="nl-query" className="mt-0">
          <NLQueryInterface />
        </TabsContent>

        <TabsContent value="cost" className="mt-0">
          <CostIntelligence />
        </TabsContent>

        <TabsContent value="cxo-costs" className="mt-0">
          <CXOCostDashboard />
        </TabsContent>

        <TabsContent value="blast-radius" className="mt-0">
          <BlastRadiusAnalyzer />
        </TabsContent>

        <TabsContent value="runbooks" className="mt-0">
          <RunbookManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
