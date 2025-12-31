"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { KafkaCluster } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClusterMetrics } from "./cluster-metrics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Server, Shield, Clock, MapPin, Calendar, DollarSign } from "lucide-react"

interface ClusterDetailsDialogProps {
  cluster: KafkaCluster | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClusterDetailsDialog({ cluster, open, onOpenChange }: ClusterDetailsDialogProps) {
  if (!cluster) return null

  const statusColors = {
    running: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    stopped: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
    creating: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{cluster.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {cluster.region}
              </DialogDescription>
            </div>
            <Badge variant="outline" className={statusColors[cluster.status]}>
              {cluster.status}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
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
                    {cluster.createdAt.toLocaleDateString("en-US", {
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
                  <p className="text-lg font-semibold text-primary">${cluster.cost.monthly.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">${cluster.cost.hourly.toFixed(3)}/hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    Brokers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{cluster.config.brokerCount}</p>
                  <p className="text-xs text-muted-foreground font-mono">{cluster.config.instanceType}</p>
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
                  <p className="text-lg font-semibold">{cluster.config.storageSize * cluster.config.brokerCount} GB</p>
                  <p className="text-xs text-muted-foreground">{cluster.config.storageSize} GB per broker</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your cluster</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button variant="outline">Start Cluster</Button>
                <Button variant="outline">Stop Cluster</Button>
                <Button variant="outline">Restart Cluster</Button>
                <Button variant="destructive">Delete Cluster</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <ClusterMetrics cluster={cluster} />
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Cluster Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Broker Count</p>
                  <p className="font-semibold">{cluster.config.brokerCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instance Type</p>
                  <p className="font-semibold font-mono">{cluster.config.instanceType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage per Broker</p>
                  <p className="font-semibold">{cluster.config.storageSize} GB</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Storage</p>
                  <p className="font-semibold">{cluster.config.storageSize * cluster.config.brokerCount} GB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Kafka Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Replication Factor</p>
                  <p className="font-semibold">{cluster.config.replicationFactor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Min In-Sync Replicas</p>
                  <p className="font-semibold">{cluster.config.minInSyncReplicas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retention Period</p>
                  <p className="font-semibold">
                    {cluster.config.retentionHours} hours ({(cluster.config.retentionHours / 24).toFixed(0)} days)
                  </p>
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
                  <Badge variant={cluster.config.enableEncryption ? "default" : "secondary"}>
                    {cluster.config.enableEncryption ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Enhanced Monitoring</span>
                  </div>
                  <Badge variant={cluster.config.enableMonitoring ? "default" : "secondary"}>
                    {cluster.config.enableMonitoring ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
