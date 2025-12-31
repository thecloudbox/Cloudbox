"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { KafkaCluster } from "@/lib/types"
import { Activity, Cpu, HardDrive, MemoryStick, Network, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ClusterMetricsProps {
  cluster: KafkaCluster
}

export function ClusterMetrics({ cluster }: ClusterMetricsProps) {
  if (!cluster.metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Metrics</CardTitle>
          <CardDescription>No metrics available for this cluster</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const { metrics } = cluster

  const metricCards = [
    {
      icon: Activity,
      label: "Throughput",
      value: `${metrics.throughput} MB/s`,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Network,
      label: "Messages/sec",
      value: metrics.messagesPerSecond.toLocaleString(),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Users,
      label: "Active Connections",
      value: metrics.activeConnections.toString(),
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
  ]

  const utilizationMetrics = [
    {
      icon: Cpu,
      label: "CPU Usage",
      value: metrics.cpuUsage,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: MemoryStick,
      label: "Memory Usage",
      value: metrics.memoryUsage,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: HardDrive,
      label: "Disk Usage",
      value: metrics.diskUsage,
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>Current usage across cluster resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {utilizationMetrics.map((metric) => {
            const Icon = metric.icon
            const isHigh = metric.value >= 80
            const isMedium = metric.value >= 60 && metric.value < 80

            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isHigh
                        ? "text-red-600 dark:text-red-400"
                        : isMedium
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {metric.value}%
                  </span>
                </div>
                <Progress
                  value={metric.value}
                  className={`h-2 ${
                    isHigh ? "[&>div]:bg-red-500" : isMedium ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"
                  }`}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
