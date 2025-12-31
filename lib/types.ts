export type CloudProvider = "aws" | "gcp" | "azure" | "linode"
export type ServiceType = "kafka" | "redis" | "mysql" | "elasticsearch" | "mongodb" | "nat-gateway"
export type ClusterSize = "small" | "medium" | "large"
export type ClusterStatus = "running" | "stopped" | "creating" | "error" | "warning" | "deploying"
export type MySQLMode = "standalone" | "master-slave" | "orchestrated"

export interface InstanceConfig {
  type: string
  vcpu: number
  memory: number
  storage: number
  networkPerformance: string
  provider: CloudProvider
}

export interface BaseServiceConfig {
  instanceType: string
  storageSize: number
  enableEncryption: boolean
  enableMonitoring: boolean
  enableBackup?: boolean
}

// Kafka specific configuration
export interface KafkaConfig extends BaseServiceConfig {
  brokerCount: number
  replicationFactor: number
  minInSyncReplicas: number
  retentionHours: number
}

export interface RedisConfig extends BaseServiceConfig {
  nodeCount: number
  clusterMode: boolean
  maxMemoryPolicy: "allkeys-lru" | "volatile-lru" | "noeviction"
  persistenceEnabled: boolean
}

export interface MySQLConfig extends BaseServiceConfig {
  mode: MySQLMode
  masterCount?: number
  slaveCount?: number
  orchestration?: {
    autoFailover: boolean
    readReplicas: number
    backupSchedule: string
  }
}

export interface ElasticsearchConfig extends BaseServiceConfig {
  masterNodes: number
  dataNodes: number
  ingestNodes: number
  shardCount: number
  replicaCount: number
}

export interface MongoDBConfig extends BaseServiceConfig {
  replicaSetMembers: number
  sharding: boolean
  configServers?: number
  mongosRouters?: number
}

export interface NATGatewayConfig extends BaseServiceConfig {
  publicSubnets: number
  privateSubnets: number
  firewallRules: FirewallRule[]
  enableIptables: boolean
}

export interface FirewallRule {
  id: string
  name: string
  protocol: "tcp" | "udp" | "icmp" | "all"
  port?: string
  sourceIP: string
  action: "allow" | "deny"
}

export type ServiceConfig =
  | KafkaConfig
  | RedisConfig
  | MySQLConfig
  | ElasticsearchConfig
  | MongoDBConfig
  | NATGatewayConfig

export interface Service {
  id: string
  name: string
  serviceType: ServiceType
  cloudProvider: CloudProvider
  size: ClusterSize
  status: ClusterStatus
  region: string
  createdAt: Date
  config: ServiceConfig
  metrics?: ServiceMetrics
  cost: {
    hourly: number
    monthly: number
  }
  terraformGenerated?: boolean
  deploymentId?: string
}

export interface ServiceMetrics {
  throughput?: number
  messagesPerSecond?: number
  diskUsage: number
  cpuUsage: number
  memoryUsage: number
  activeConnections: number
  requestsPerSecond?: number
  cacheHitRate?: number
}

export interface TerraformOutput {
  provider: CloudProvider
  serviceType: ServiceType
  mainTf: string
  variablesTf: string
  outputsTf: string
  readmeMd: string
}

// Legacy type alias for backward compatibility
export type KafkaCluster = Service & { serviceType: "kafka" }
