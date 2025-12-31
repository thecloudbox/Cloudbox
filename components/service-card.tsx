"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Service } from "@/lib/types"
import { Activity, ChevronRight, Database, Cloud } from "lucide-react"

interface ServiceCardProps {
  service: Service
  onViewDetails: (service: Service) => void
}

const SERVICE_ICONS: Record<string, string> = {
  kafka: "📨",
  redis: "⚡",
  mysql: "🗄️",
  elasticsearch: "🔍",
  mongodb: "🍃",
  "nat-gateway": "🌐",
}

const CLOUD_LABELS: Record<string, string> = {
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
  linode: "Linode",
}

export function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
  const statusColors = {
    running: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    stopped: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
    creating: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    deploying: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  }

  const sizeColors = {
    small: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    medium: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    large: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{SERVICE_ICONS[service.serviceType]}</span>
              <Badge variant="outline" className="text-xs">
                {service.serviceType.toUpperCase()}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2 text-sm">
              <Cloud className="h-3.5 w-3.5" />
              {CLOUD_LABELS[service.cloudProvider]} • {service.region}
            </CardDescription>
          </div>
          <Badge variant="outline" className={statusColors[service.status]}>
            {service.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Cluster Size</p>
            <Badge variant="secondary" className={sizeColors[service.size]}>
              {service.size.toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Instance Type</p>
            <p className="text-sm font-medium font-mono">{service.config.instanceType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Storage</p>
            <div className="flex items-center gap-1.5">
              <Database className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">{service.config.storageSize} GB</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">IaC Status</p>
            <Badge variant={service.terraformGenerated ? "default" : "secondary"} className="text-xs">
              {service.terraformGenerated ? "Generated" : "Pending"}
            </Badge>
          </div>
        </div>

        {service.metrics && (
          <div className="pt-4 border-t space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              Live Metrics
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">CPU</p>
                <p className="font-semibold">{service.metrics.cpuUsage}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Memory</p>
                <p className="font-semibold">{service.metrics.memoryUsage}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Disk</p>
                <p className="font-semibold">{service.metrics.diskUsage}%</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Estimated Cost</span>
            <div className="text-right">
              <p className="text-lg font-bold">${service.cost.monthly.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onViewDetails(service)} variant="outline" className="w-full">
          View Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
