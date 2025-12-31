"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getInstancesByProvider } from "@/lib/cloud-config"
import type { ServiceType, CloudProvider, ServiceConfig } from "@/lib/types"
import { Server, Database, Shield, Activity } from "lucide-react"

interface ServiceConfigFormProps {
  serviceType: ServiceType
  cloudProvider: CloudProvider
  config: ServiceConfig
  onConfigChange: (config: ServiceConfig) => void
}

export function ServiceConfigForm({ serviceType, cloudProvider, config, onConfigChange }: ServiceConfigFormProps) {
  const instances = getInstancesByProvider(cloudProvider)

  const updateConfig = (updates: Partial<ServiceConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  return (
    <div className="space-y-6">
      {/* Common Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Server className="h-4 w-4" />
            Instance Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="instance-type">Instance Type</Label>
            <Select value={config.instanceType} onValueChange={(value) => updateConfig({ instanceType: value })}>
              <SelectTrigger id="instance-type" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(instances).map(([key, instance]) => (
                  <SelectItem key={key} value={key}>
                    {instance.type} - {instance.vcpu} vCPU, {instance.memory} GB RAM
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="storage">Storage Size (GB)</Label>
            <Input
              id="storage"
              type="number"
              min="20"
              step="10"
              value={config.storageSize}
              onChange={(e) => updateConfig({ storageSize: Number.parseInt(e.target.value) })}
              className="mt-2"
            />
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
                onCheckedChange={(checked) => updateConfig({ enableEncryption: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="monitoring" className="cursor-pointer">
                  Enable Monitoring
                </Label>
              </div>
              <Switch
                id="monitoring"
                checked={config.enableMonitoring}
                onCheckedChange={(checked) => updateConfig({ enableMonitoring: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service-Specific Configuration */}
      {serviceType === "kafka" && "brokerCount" in config && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              Kafka Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brokers">Number of Brokers</Label>
              <Input
                id="brokers"
                type="number"
                min="3"
                value={config.brokerCount}
                onChange={(e) => updateConfig({ brokerCount: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="replication">Replication Factor</Label>
              <Input
                id="replication"
                type="number"
                min="1"
                value={config.replicationFactor}
                onChange={(e) => updateConfig({ replicationFactor: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="min-isr">Min In-Sync Replicas</Label>
              <Input
                id="min-isr"
                type="number"
                min="1"
                value={config.minInSyncReplicas}
                onChange={(e) => updateConfig({ minInSyncReplicas: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="retention">Retention (hours)</Label>
              <Input
                id="retention"
                type="number"
                min="1"
                value={config.retentionHours}
                onChange={(e) => updateConfig({ retentionHours: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {serviceType === "redis" && "nodeCount" in config && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              Redis Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nodes">Number of Nodes</Label>
              <Input
                id="nodes"
                type="number"
                min="3"
                value={config.nodeCount}
                onChange={(e) => updateConfig({ nodeCount: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="memory-policy">Max Memory Policy</Label>
              <Select
                value={config.maxMemoryPolicy}
                onValueChange={(value: "allkeys-lru" | "volatile-lru" | "noeviction") =>
                  updateConfig({ maxMemoryPolicy: value })
                }
              >
                <SelectTrigger id="memory-policy" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allkeys-lru">All Keys LRU</SelectItem>
                  <SelectItem value="volatile-lru">Volatile LRU</SelectItem>
                  <SelectItem value="noeviction">No Eviction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between col-span-2">
              <Label htmlFor="cluster-mode">Cluster Mode</Label>
              <Switch
                id="cluster-mode"
                checked={config.clusterMode}
                onCheckedChange={(checked) => updateConfig({ clusterMode: checked })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {serviceType === "mysql" && "mode" in config && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              MySQL Configuration
            </CardTitle>
            <CardDescription>Master-slave replication with optional orchestration</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mysql-mode">Mode</Label>
              <Select
                value={config.mode}
                onValueChange={(value: "standalone" | "master-slave" | "orchestrated") => updateConfig({ mode: value })}
              >
                <SelectTrigger id="mysql-mode" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standalone">Standalone</SelectItem>
                  <SelectItem value="master-slave">Master-Slave</SelectItem>
                  <SelectItem value="orchestrated">Orchestrated (Auto-Failover)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {config.mode !== "standalone" && (
              <>
                <div>
                  <Label htmlFor="slave-count">Slave Count</Label>
                  <Input
                    id="slave-count"
                    type="number"
                    min="1"
                    value={config.slaveCount || 1}
                    onChange={(e) => updateConfig({ slaveCount: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {serviceType === "elasticsearch" && "masterNodes" in config && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              Elasticsearch Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="master-nodes">Master Nodes</Label>
              <Input
                id="master-nodes"
                type="number"
                min="3"
                value={config.masterNodes}
                onChange={(e) => updateConfig({ masterNodes: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="data-nodes">Data Nodes</Label>
              <Input
                id="data-nodes"
                type="number"
                min="2"
                value={config.dataNodes}
                onChange={(e) => updateConfig({ dataNodes: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="ingest-nodes">Ingest Nodes</Label>
              <Input
                id="ingest-nodes"
                type="number"
                min="1"
                value={config.ingestNodes}
                onChange={(e) => updateConfig({ ingestNodes: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="shards">Shard Count</Label>
              <Input
                id="shards"
                type="number"
                min="1"
                value={config.shardCount}
                onChange={(e) => updateConfig({ shardCount: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {serviceType === "mongodb" && "replicaSetMembers" in config && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              MongoDB Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="replica-members">Replica Set Members</Label>
              <Input
                id="replica-members"
                type="number"
                min="3"
                value={config.replicaSetMembers}
                onChange={(e) => updateConfig({ replicaSetMembers: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sharding">Enable Sharding</Label>
              <Switch
                id="sharding"
                checked={config.sharding}
                onCheckedChange={(checked) => updateConfig({ sharding: checked })}
              />
            </div>
            {config.sharding && (
              <>
                <div>
                  <Label htmlFor="config-servers">Config Servers</Label>
                  <Input
                    id="config-servers"
                    type="number"
                    min="3"
                    value={config.configServers || 3}
                    onChange={(e) => updateConfig({ configServers: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="mongos">Mongos Routers</Label>
                  <Input
                    id="mongos"
                    type="number"
                    min="2"
                    value={config.mongosRouters || 2}
                    onChange={(e) => updateConfig({ mongosRouters: Number.parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {serviceType === "nat-gateway" && "firewallRules" in config && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4" />
              NAT Gateway Configuration
            </CardTitle>
            <CardDescription>Network topology with iptables firewall</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="public-subnets">Public Subnets</Label>
              <Input
                id="public-subnets"
                type="number"
                min="1"
                max="5"
                value={config.publicSubnets}
                onChange={(e) => updateConfig({ publicSubnets: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="private-subnets">Private Subnets</Label>
              <Input
                id="private-subnets"
                type="number"
                min="1"
                max="10"
                value={config.privateSubnets}
                onChange={(e) => updateConfig({ privateSubnets: Number.parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between col-span-2">
              <Label htmlFor="iptables">Enable iptables Firewall</Label>
              <Switch
                id="iptables"
                checked={config.enableIptables}
                onCheckedChange={(checked) => updateConfig({ enableIptables: checked })}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
