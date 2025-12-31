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
import type { CloudProvider, ServiceType, ClusterSize, Service } from "@/lib/types"
import { REGIONS } from "@/lib/cloud-config"
import { calculateServiceCost } from "@/lib/cost-calculator"
import {
  getKafkaPreset,
  getRedisPreset,
  getMySQLPreset,
  getElasticsearchPreset,
  getMongoDBPreset,
  getNATGatewayPreset,
} from "@/lib/service-presets"
import { Plus, Database, Boxes, Cloud, Gauge, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ServiceConfigForm } from "./service-config-form"

const SERVICE_TYPES = [
  {
    value: "kafka" as ServiceType,
    label: "Apache Kafka",
    description: "Distributed event streaming platform",
    icon: "📨",
  },
  {
    value: "redis" as ServiceType,
    label: "Redis Cluster",
    description: "In-memory data store and cache",
    icon: "⚡",
  },
  {
    value: "mysql" as ServiceType,
    label: "MySQL Database",
    description: "Relational database with replication",
    icon: "🗄️",
  },
  {
    value: "elasticsearch" as ServiceType,
    label: "Elasticsearch",
    description: "Search and analytics engine",
    icon: "🔍",
  },
  {
    value: "mongodb" as ServiceType,
    label: "MongoDB",
    description: "NoSQL document database",
    icon: "🍃",
  },
  {
    value: "nat-gateway" as ServiceType,
    label: "NAT Gateway",
    description: "Network address translation with iptables",
    icon: "🌐",
  },
]

const CLOUD_PROVIDERS = [
  { value: "aws" as CloudProvider, label: "Amazon Web Services", logo: "AWS" },
  { value: "gcp" as CloudProvider, label: "Google Cloud Platform", logo: "GCP" },
  { value: "azure" as CloudProvider, label: "Microsoft Azure", logo: "Azure" },
  { value: "linode" as CloudProvider, label: "Akamai / Linode", logo: "Linode" },
]

export function CreateServiceDialog() {
  const [open, setOpen] = useState(false)
  const [serviceName, setServiceName] = useState("")
  const [serviceType, setServiceType] = useState<ServiceType>("kafka")
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>("aws")
  const [region, setRegion] = useState(REGIONS.aws[0].value)
  const [size, setSize] = useState<ClusterSize>("medium")
  const [config, setConfig] = useState(getKafkaPreset("medium", "aws"))

  const cost = calculateServiceCost(cloudProvider, serviceType, config)
  const availableRegions = REGIONS[cloudProvider]

  const handleServiceTypeChange = (newType: ServiceType) => {
    setServiceType(newType)
    updateConfig(newType, cloudProvider, size)
  }

  const handleProviderChange = (newProvider: CloudProvider) => {
    setCloudProvider(newProvider)
    setRegion(REGIONS[newProvider][0].value)
    updateConfig(serviceType, newProvider, size)
  }

  const handleSizeChange = (newSize: ClusterSize) => {
    setSize(newSize)
    updateConfig(serviceType, cloudProvider, newSize)
  }

  const updateConfig = (type: ServiceType, provider: CloudProvider, sz: ClusterSize) => {
    const presetMap = {
      kafka: getKafkaPreset,
      redis: getRedisPreset,
      mysql: getMySQLPreset,
      elasticsearch: getElasticsearchPreset,
      mongodb: getMongoDBPreset,
      "nat-gateway": getNATGatewayPreset,
    }
    setConfig(presetMap[type](sz, provider))
  }

  const handleCreate = async () => {
    const newService: Service = {
      id: `svc-${Date.now()}`,
      name: serviceName,
      serviceType,
      cloudProvider,
      size,
      status: "creating",
      region,
      createdAt: new Date(),
      config,
      cost,
    }

    console.log("[v0] Creating service:", newService)

    // Call API to create service and generate IaC
    const response = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newService),
    })

    if (response.ok) {
      // Trigger deployment
      await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      })
    }

    setOpen(false)
    // Reset form
    setServiceName("")
    setServiceType("kafka")
    setCloudProvider("aws")
    setSize("medium")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Create Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Managed Service</DialogTitle>
          <DialogDescription>Deploy infrastructure across AWS, GCP, Azure, or Linode</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="service" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="service">Service Type</TabsTrigger>
            <TabsTrigger value="provider">Cloud Provider</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="review">Review & Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="service" className="space-y-6 mt-6">
            <div>
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                placeholder="my-production-service"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="space-y-4">
              <Label>Select Service Type</Label>
              <div className="grid grid-cols-2 gap-4">
                {SERVICE_TYPES.map((service) => {
                  const isSelected = serviceType === service.value

                  return (
                    <Card
                      key={service.value}
                      className={`cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => handleServiceTypeChange(service.value)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{service.icon}</div>
                          <div className="flex-1">
                            <CardTitle className="text-base">{service.label}</CardTitle>
                            <CardDescription className="text-xs">{service.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="provider" className="space-y-6 mt-6">
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Choose Cloud Provider
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {CLOUD_PROVIDERS.map((provider) => {
                  const isSelected = cloudProvider === provider.value

                  return (
                    <Card
                      key={provider.value}
                      className={`cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => handleProviderChange(provider.value)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">{provider.label}</CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {provider.logo}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="region" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableRegions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Select Size
              </Label>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {(["small", "medium", "large"] as ClusterSize[]).map((sz) => {
                  const isSelected = size === sz
                  const tempConfig = sz === size ? config : updateConfig(serviceType, cloudProvider, sz) || config
                  const tempCost = calculateServiceCost(cloudProvider, serviceType, tempConfig)

                  return (
                    <Card
                      key={sz}
                      className={`cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => handleSizeChange(sz)}
                    >
                      <CardHeader>
                        <CardTitle className="text-sm capitalize">{sz}</CardTitle>
                        <CardDescription className="text-lg font-bold text-foreground">
                          ${tempCost.monthly.toFixed(0)}/mo
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Using <strong>{cloudProvider.toUpperCase()}</strong> in <strong>{region}</strong>. Estimated cost: $
                {cost.monthly.toFixed(2)}/month
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="config" className="space-y-6 mt-6">
            <ServiceConfigForm
              serviceType={serviceType}
              cloudProvider={cloudProvider}
              config={config}
              onConfigChange={setConfig}
            />
          </TabsContent>

          <TabsContent value="review" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Summary</CardTitle>
                <CardDescription>Review your configuration before deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Service Name</p>
                      <p className="font-semibold">{serviceName || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Service Type</p>
                      <Badge variant="secondary">{serviceType.toUpperCase()}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cloud Provider</p>
                      <p className="font-semibold">{cloudProvider.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-semibold">{availableRegions.find((r) => r.value === region)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size Profile</p>
                      <Badge variant="secondary">{size.toUpperCase()}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instance Type</p>
                      <p className="font-semibold">{config.instanceType}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-4">Infrastructure as Code</h4>
                  <Alert>
                    <Database className="h-4 w-4" />
                    <AlertDescription>
                      Terraform templates will be generated and executed automatically. Deployment uses centralized
                      service account with proper IAM permissions.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Estimated Cost</h4>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Compute Instances</span>
                      <span className="font-mono">${(cost.hourly * 730 * 0.8).toFixed(2)}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-mono">${(cost.hourly * 730 * 0.2).toFixed(2)}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="font-semibold">Total Monthly Cost</span>
                      <span className="text-xl font-bold text-primary">${cost.monthly.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">Hourly rate: ${cost.hourly.toFixed(4)}/hour</p>
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
          <Button onClick={handleCreate} disabled={!serviceName}>
            <Boxes className="h-4 w-4 mr-2" />
            Generate IaC & Deploy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
