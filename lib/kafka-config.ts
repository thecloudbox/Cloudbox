import type { ClusterSize, EC2InstanceConfig, ClusterConfig } from "./types"

export const EC2_INSTANCES: Record<string, EC2InstanceConfig> = {
  "t3.small": { type: "t3.small", vcpu: 2, memory: 2, storage: 20, networkPerformance: "Up to 5 Gbps" },
  "t3.medium": { type: "t3.medium", vcpu: 2, memory: 4, storage: 20, networkPerformance: "Up to 5 Gbps" },
  "t3.large": { type: "t3.large", vcpu: 2, memory: 8, storage: 20, networkPerformance: "Up to 5 Gbps" },
  "m5.large": { type: "m5.large", vcpu: 2, memory: 8, storage: 50, networkPerformance: "Up to 10 Gbps" },
  "m5.xlarge": { type: "m5.xlarge", vcpu: 4, memory: 16, storage: 100, networkPerformance: "Up to 10 Gbps" },
  "m5.2xlarge": { type: "m5.2xlarge", vcpu: 8, memory: 32, storage: 200, networkPerformance: "Up to 10 Gbps" },
  "m5.4xlarge": { type: "m5.4xlarge", vcpu: 16, memory: 64, storage: 400, networkPerformance: "10 Gbps" },
  "r5.large": { type: "r5.large", vcpu: 2, memory: 16, storage: 50, networkPerformance: "Up to 10 Gbps" },
  "r5.xlarge": { type: "r5.xlarge", vcpu: 4, memory: 32, storage: 100, networkPerformance: "Up to 10 Gbps" },
  "r5.2xlarge": { type: "r5.2xlarge", vcpu: 8, memory: 64, storage: 200, networkPerformance: "Up to 10 Gbps" },
}

export const CLUSTER_PRESETS: Record<ClusterSize, ClusterConfig> = {
  small: {
    brokerCount: 3,
    instanceType: "t3.medium",
    storageSize: 100,
    replicationFactor: 2,
    minInSyncReplicas: 1,
    retentionHours: 168, // 7 days
    enableEncryption: false,
    enableMonitoring: true,
  },
  medium: {
    brokerCount: 5,
    instanceType: "m5.xlarge",
    storageSize: 500,
    replicationFactor: 3,
    minInSyncReplicas: 2,
    retentionHours: 336, // 14 days
    enableEncryption: true,
    enableMonitoring: true,
  },
  large: {
    brokerCount: 7,
    instanceType: "m5.4xlarge",
    storageSize: 1000,
    replicationFactor: 3,
    minInSyncReplicas: 2,
    retentionHours: 720, // 30 days
    enableEncryption: true,
    enableMonitoring: true,
  },
}

export const AWS_REGIONS = [
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-east-2", label: "US East (Ohio)" },
  { value: "us-west-1", label: "US West (N. California)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "EU (Ireland)" },
  { value: "eu-central-1", label: "EU (Frankfurt)" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
]

export const EC2_PRICING: Record<string, number> = {
  "t3.small": 0.0208,
  "t3.medium": 0.0416,
  "t3.large": 0.0832,
  "m5.large": 0.096,
  "m5.xlarge": 0.192,
  "m5.2xlarge": 0.384,
  "m5.4xlarge": 0.768,
  "r5.large": 0.126,
  "r5.xlarge": 0.252,
  "r5.2xlarge": 0.504,
}

export const EBS_PRICING_PER_GB = 0.1 // per GB per month

export function calculateClusterCost(config: ClusterConfig): { hourly: number; monthly: number } {
  const instanceHourlyCost = EC2_PRICING[config.instanceType] || 0
  const totalInstanceCost = instanceHourlyCost * config.brokerCount

  const totalStorage = config.storageSize * config.brokerCount
  const storageMonthly = totalStorage * EBS_PRICING_PER_GB
  const storageHourly = storageMonthly / 730 // Average hours per month

  const hourly = totalInstanceCost + storageHourly
  const monthly = hourly * 730

  return { hourly, monthly }
}

export function getRecommendedInstanceType(
  size: ClusterSize,
  workloadType: "balanced" | "memory" | "compute" = "balanced",
): string {
  const preset = CLUSTER_PRESETS[size]

  if (workloadType === "memory") {
    return size === "small" ? "r5.large" : size === "medium" ? "r5.xlarge" : "r5.2xlarge"
  }

  return preset.instanceType
}
