"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Service } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClusterMetrics } from "./cluster-metrics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Server, Shield, Clock, Calendar, DollarSign, Cloud, Code, Download, Play } from "lucide-react"

interface ServiceDetailsDialogProps {
  service: Service | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SERVICE_ICONS: Record<string, string> = {
  kafka: "📨",
  redis: "⚡",
  mysql: "🗄️",
  elasticsearch: "🔍",
  mongodb: "🍃",
  "nat-gateway": "🌐",
}

export function ServiceDetailsDialog({ service, open, onOpenChange }: ServiceDetailsDialogProps) {
  if (!service) return null

  const statusColors = {
    running: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    stopped: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
    creating: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    deploying: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  }

  const handleDownloadTerraform = async () => {
    console.log("[v0] Downloading Terraform files for service:", service.id)
    // Call API to get Terraform files
    const response = await fetch("/api/deploy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    })
    const data = await response.json()
    console.log("[v0] Terraform files:", data.terraform)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{SERVICE_ICONS[service.serviceType]}</span>
                <Badge variant="outline">{service.serviceType.toUpperCase()}</Badge>
              </div>
              <DialogTitle className="text-2xl">{service.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Cloud className="h-3.5 w-3.5" />
                {service.cloudProvider.toUpperCase()} • {service.region}
              </DialogDescription>
            </div>
            <Badge variant="outline" className={statusColors[service.status]}>
              {service.status}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="terraform">Terraform</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    {service.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    Monthly Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-primary">${service.cost.monthly.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">${service.cost.hourly.toFixed(4)}/hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    Instance Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold font-mono">{service.config.instanceType}</p>
                  <p className="text-xs text-muted-foreground capitalize">{service.size} configuration</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{service.config.storageSize} GB</p>
                  <p className="text-xs text-muted-foreground">Per instance</p>
                </CardContent>
              </Card>
            </div>

            {service.deploymentId && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    Deployment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Deployment ID:</span>{" "}
                    <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{service.deploymentId}</code>
                  </p>
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">Terraform Status:</span>{" "}
                    <Badge variant={service.terraformGenerated ? "default" : "secondary"}>
                      {service.terraformGenerated ? "Generated" : "Pending"}
                    </Badge>
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your service</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3 flex-wrap">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start Service
                </Button>
                <Button variant="outline" size="sm">
                  Stop Service
                </Button>
                <Button variant="outline" size="sm">
                  Restart Service
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadTerraform}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Terraform
                </Button>
                <Button variant="destructive" size="sm">
                  Delete Service
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            {service.metrics ? (
              <ClusterMetrics cluster={service as any} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No metrics available for this service</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Service Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-semibold capitalize">{service.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cloud Provider</p>
                  <p className="font-semibold">{service.cloudProvider.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-semibold">{service.region}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instance Type</p>
                  <p className="font-semibold font-mono">{service.config.instanceType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage Size</p>
                  <p className="font-semibold">{service.config.storageSize} GB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Encryption at Rest</span>
                  </div>
                  <Badge variant={service.config.enableEncryption ? "default" : "secondary"}>
                    {service.config.enableEncryption ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Enhanced Monitoring</span>
                  </div>
                  <Badge variant={service.config.enableMonitoring ? "default" : "secondary"}>
                    {service.config.enableMonitoring ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terraform" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Infrastructure as Code
                </CardTitle>
                <CardDescription>Generated Terraform configuration for this service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Terraform Status</p>
                  <Badge variant={service.terraformGenerated ? "default" : "secondary"} className="mb-4">
                    {service.terraformGenerated ? "Generated & Deployed" : "Pending Generation"}
                  </Badge>
                  {service.deploymentId && (
                    <p className="text-xs font-mono bg-background p-2 rounded mt-2">{service.deploymentId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Generated Files:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• main.tf - Core infrastructure resources</li>
                    <li>• variables.tf - Configuration variables</li>
                    <li>• outputs.tf - Connection details and IPs</li>
                    <li>• README.md - Deployment instructions</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleDownloadTerraform}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Terraform Files
                  </Button>
                  <Button variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    View in Repository
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
