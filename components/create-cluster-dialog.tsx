"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import type { ClusterSize, ClusterConfig } from "@/lib/types"
import {
  CLUSTER_PRESETS,
  AWS_REGIONS,
  EC2_INSTANCES,
  calculateClusterCost,
  getRecommendedInstanceType,
} from "@/lib/kafka-config"
import { Plus, Zap, Server, Shield, Clock, Database, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CreateClusterDialog() {
  const [open, setOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<ClusterSize>("medium")
  const [clusterName, setClusterName] = useState("")
  const [region, setRegion] = useState("us-east-1")
  const [config, setConfig] = useState<ClusterConfig>(CLUSTER_PRESETS.medium)

  const cost = calculateClusterCost(config)
  const recommendedInstance = getRecommendedInstanceType(selectedSize)

  const handleSizeChange = (size: ClusterSize) => {
    setSelectedSize(size)
    setConfig(CLUSTER_PRESETS[size])
  }

  const handleCreate = () => {
    console.log("[v0] Creating cluster:", { clusterName, region, size: selectedSize, config })
    setOpen(false)
    // Reset form
    setClusterName("")
    setSelectedSize("medium")
    setConfig(CLUSTER_PRESETS.medium)
  }

  const sizeRecommendations = {
    small: {
      title: "Small",
      description: "Development & Testing",
      icon: Zap,
      specs: ["Up to 10K msg/sec", "Low traffic apps", "3 brokers", "t3.medium instances"],
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20",
    },
    medium: {
      title: "Medium",
      description: "Production Workloads",
      icon: Server,
      specs: ["Up to 50K msg/sec", "Standard apps", "5 brokers", "m5.xlarge instances"],
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
    },
    large: {
      title: "Large",
      description: "High-Volume Systems",
      icon: Database,
      specs: ["100K+ msg/sec", "Mission critical", "7 brokers", "m5.4xlarge instances"],
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20",
    },
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Create Cluster
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Kafka Cluster</DialogTitle>
          <DialogDescription>Configure and deploy a new managed Kafka cluster on AWS EC2</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="size" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="size">Size & Type</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="review">Review & Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="size" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cluster-name">Cluster Name</Label>
                <Input
                  id="cluster-name"
                  placeholder="my-kafka-cluster"
                  value={clusterName}
                  onChange={(e) => setClusterName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="region">AWS Region</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AWS_REGIONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Choose Cluster Size</Label>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(sizeRecommendations) as ClusterSize[]).map((size) => {
                  const rec = sizeRecommendations[size]
                  const Icon = rec.icon
                  const isSelected = selectedSize === size

                  return (
                    <Card
                      key={size}
                      className={`cursor-pointer transition-all ${
                        isSelected ? `ring-2 ring-primary ${rec.bgColor}` : "hover:border-primary/50"
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${rec.bgColor}`}>
                            <Icon className={`h-5 w-5 ${rec.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{rec.title}</CardTitle>
                            <CardDescription className="text-xs">{rec.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {rec.specs.map((spec, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-current" />
                            {spec}
                          </p>
                        ))}
                        <div className="pt-3 mt-3 border-t">
                          <p className="text-sm font-semibold">
                            ${calculateClusterCost(CLUSTER_PRESETS[size]).monthly.toFixed(0)}/mo
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Recommended instance type for {selectedSize} workload: <strong>{recommendedInstance}</strong>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Cluster Configuration
                </h3>

                <div>
                  <Label htmlFor="brokers">Number of Brokers</Label>
                  <Input
                    id="brokers"
                    type="number"
                    min="3"
                    value={config.brokerCount}
                    onChange={(e) => setConfig({ ...config, brokerCount: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Minimum 3 brokers recommended</p>
                </div>

                <div>
                  <Label htmlFor="instance-type">Instance Type</Label>
                  <Select
                    value={config.instanceType}
                    onValueChange={(value) => setConfig({ ...config, instanceType: value })}
                  >
                    <SelectTrigger id="instance-type" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(EC2_INSTANCES).map(([key, instance]) => (
                        <SelectItem key={key} value={key}>
                          {instance.type} - {instance.vcpu} vCPU, {instance.memory} GB RAM
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="storage">Storage per Broker (GB)</Label>
                  <Input
                    id="storage"
                    type="number"
                    min="50"
                    step="50"
                    value={config.storageSize}
                    onChange={(e) => setConfig({ ...config, storageSize: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Kafka Settings
                </h3>

                <div>
                  <Label htmlFor="replication">Replication Factor</Label>
                  <Input
                    id="replication"
                    type="number"
                    min="1"
                    max={config.brokerCount}
                    value={config.replicationFactor}
                    onChange={(e) => setConfig({ ...config, replicationFactor: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="min-isr">Min In-Sync Replicas</Label>
                  <Input
                    id="min-isr"
                    type="number"
                    min="1"
                    max={config.replicationFactor}
                    value={config.minInSyncReplicas}
                    onChange={(e) => setConfig({ ...config, minInSyncReplicas: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="retention">Retention Period (hours)</Label>
                  <Input
                    id="retention"
                    type="number"
                    min="1"
                    value={config.retentionHours}
                    onChange={(e) => setConfig({ ...config, retentionHours: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{(config.retentionHours / 24).toFixed(0)} days</p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="encryption" className="cursor-pointer">
                        Enable Encryption
                      </Label>
                    </div>
                    <Switch
                      id="encryption"
                      checked={config.enableEncryption}
                      onCheckedChange={(checked) => setConfig({ ...config, enableEncryption: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="monitoring" className="cursor-pointer">
                        Enable Enhanced Monitoring
                      </Label>
                    </div>
                    <Switch
                      id="monitoring"
                      checked={config.enableMonitoring}
                      onCheckedChange={(checked) => setConfig({ ...config, enableMonitoring: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cluster Summary</CardTitle>
                <CardDescription>Review your configuration before deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Cluster Name</p>
                      <p className="font-semibold">{clusterName || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-semibold">{AWS_REGIONS.find((r) => r.value === region)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size Profile</p>
                      <Badge variant="secondary">{selectedSize.toUpperCase()}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Brokers</p>
                      <p className="font-semibold">
                        {config.brokerCount} x {config.instanceType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Storage</p>
                      <p className="font-semibold">{config.storageSize * config.brokerCount} GB</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Replication</p>
                      <p className="font-semibold">
                        {config.replicationFactor}x (min ISR: {config.minInSyncReplicas})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Estimated Cost</h4>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        EC2 Instances ({config.brokerCount}x {config.instanceType})
                      </span>
                      <span className="font-mono">${(cost.hourly * 730).toFixed(2)}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        EBS Storage ({config.storageSize * config.brokerCount} GB)
                      </span>
                      <span className="font-mono">
                        ${(config.storageSize * config.brokerCount * 0.1).toFixed(2)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="font-semibold">Total Monthly Cost</span>
                      <span className="text-xl font-bold text-primary">${cost.monthly.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">Hourly rate: ${cost.hourly.toFixed(3)}/hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!clusterName}>
            Deploy Cluster
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
