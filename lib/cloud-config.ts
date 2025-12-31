import type { CloudProvider, InstanceConfig, ClusterSize, ServiceType } from "./types"

// AWS Instance Configurations
export const AWS_INSTANCES: Record<string, Omit<InstanceConfig, "provider">> = {
  "t3.small": { type: "t3.small", vcpu: 2, memory: 2, storage: 20, networkPerformance: "Up to 5 Gbps" },
  "t3.medium": { type: "t3.medium", vcpu: 2, memory: 4, storage: 20, networkPerformance: "Up to 5 Gbps" },
  "t3.large": { type: "t3.large", vcpu: 2, memory: 8, storage: 20, networkPerformance: "Up to 5 Gbps" },
  "m5.large": { type: "m5.large", vcpu: 2, memory: 8, storage: 50, networkPerformance: "Up to 10 Gbps" },
  "m5.xlarge": { type: "m5.xlarge", vcpu: 4, memory: 16, storage: 100, networkPerformance: "Up to 10 Gbps" },
  "m5.2xlarge": { type: "m5.2xlarge", vcpu: 8, memory: 32, storage: 200, networkPerformance: "Up to 10 Gbps" },
  "m5.4xlarge": { type: "m5.4xlarge", vcpu: 16, memory: 64, storage: 400, networkPerformance: "10 Gbps" },
  "r5.large": { type: "r5.large", vcpu: 2, memory: 16, storage: 50, networkPerformance: "Up to 10 Gbps" },
  "r5.xlarge": { type: "r5.xlarge", vcpu: 4, memory: 32, storage: 100, networkPerformance: "Up to 10 Gbps" },
}

// GCP Instance Configurations
export const GCP_INSTANCES: Record<string, Omit<InstanceConfig, "provider">> = {
  "n1-standard-1": { type: "n1-standard-1", vcpu: 1, memory: 3.75, storage: 20, networkPerformance: "2 Gbps" },
  "n1-standard-2": { type: "n1-standard-2", vcpu: 2, memory: 7.5, storage: 20, networkPerformance: "10 Gbps" },
  "n1-standard-4": { type: "n1-standard-4", vcpu: 4, memory: 15, storage: 50, networkPerformance: "10 Gbps" },
  "n2-standard-2": { type: "n2-standard-2", vcpu: 2, memory: 8, storage: 50, networkPerformance: "10 Gbps" },
  "n2-standard-4": { type: "n2-standard-4", vcpu: 4, memory: 16, storage: 100, networkPerformance: "16 Gbps" },
  "n2-standard-8": { type: "n2-standard-8", vcpu: 8, memory: 32, storage: 200, networkPerformance: "16 Gbps" },
  "n2-highmem-2": { type: "n2-highmem-2", vcpu: 2, memory: 16, storage: 50, networkPerformance: "10 Gbps" },
  "n2-highmem-4": { type: "n2-highmem-4", vcpu: 4, memory: 32, storage: 100, networkPerformance: "16 Gbps" },
}

// Azure Instance Configurations
export const AZURE_INSTANCES: Record<string, Omit<InstanceConfig, "provider">> = {
  Standard_B2s: { type: "Standard_B2s", vcpu: 2, memory: 4, storage: 20, networkPerformance: "Moderate" },
  Standard_B2ms: { type: "Standard_B2ms", vcpu: 2, memory: 8, storage: 20, networkPerformance: "Moderate" },
  Standard_D2s_v3: { type: "Standard_D2s_v3", vcpu: 2, memory: 8, storage: 50, networkPerformance: "Moderate" },
  Standard_D4s_v3: { type: "Standard_D4s_v3", vcpu: 4, memory: 16, storage: 100, networkPerformance: "High" },
  Standard_D8s_v3: { type: "Standard_D8s_v3", vcpu: 8, memory: 32, storage: 200, networkPerformance: "High" },
  Standard_E2s_v3: { type: "Standard_E2s_v3", vcpu: 2, memory: 16, storage: 50, networkPerformance: "Moderate" },
  Standard_E4s_v3: { type: "Standard_E4s_v3", vcpu: 4, memory: 32, storage: 100, networkPerformance: "High" },
}

// Linode Instance Configurations
export const LINODE_INSTANCES: Record<string, Omit<InstanceConfig, "provider">> = {
  "g6-nanode-1": { type: "g6-nanode-1", vcpu: 1, memory: 1, storage: 25, networkPerformance: "1 Gbps" },
  "g6-standard-1": { type: "g6-standard-1", vcpu: 1, memory: 2, storage: 50, networkPerformance: "1 Gbps" },
  "g6-standard-2": { type: "g6-standard-2", vcpu: 2, memory: 4, storage: 80, networkPerformance: "2 Gbps" },
  "g6-standard-4": { type: "g6-standard-4", vcpu: 4, memory: 8, storage: 160, networkPerformance: "4 Gbps" },
  "g6-standard-6": { type: "g6-standard-6", vcpu: 6, memory: 16, storage: 320, networkPerformance: "6 Gbps" },
  "g6-highmem-2": { type: "g6-highmem-2", vcpu: 2, memory: 8, storage: 80, networkPerformance: "2 Gbps" },
  "g6-highmem-4": { type: "g6-highmem-4", vcpu: 4, memory: 16, storage: 160, networkPerformance: "4 Gbps" },
}

export function getInstancesByProvider(provider: CloudProvider): Record<string, Omit<InstanceConfig, "provider">> {
  switch (provider) {
    case "aws":
      return AWS_INSTANCES
    case "gcp":
      return GCP_INSTANCES
    case "azure":
      return AZURE_INSTANCES
    case "linode":
      return LINODE_INSTANCES
  }
}

// Pricing per hour (approximate)
export const PRICING: Record<CloudProvider, Record<string, number>> = {
  aws: {
    "t3.small": 0.0208,
    "t3.medium": 0.0416,
    "t3.large": 0.0832,
    "m5.large": 0.096,
    "m5.xlarge": 0.192,
    "m5.2xlarge": 0.384,
    "m5.4xlarge": 0.768,
    "r5.large": 0.126,
    "r5.xlarge": 0.252,
  },
  gcp: {
    "n1-standard-1": 0.0475,
    "n1-standard-2": 0.095,
    "n1-standard-4": 0.19,
    "n2-standard-2": 0.0971,
    "n2-standard-4": 0.1942,
    "n2-standard-8": 0.3884,
    "n2-highmem-2": 0.1186,
    "n2-highmem-4": 0.2372,
  },
  azure: {
    Standard_B2s: 0.0416,
    Standard_B2ms: 0.0832,
    Standard_D2s_v3: 0.096,
    Standard_D4s_v3: 0.192,
    Standard_D8s_v3: 0.384,
    Standard_E2s_v3: 0.12,
    Standard_E4s_v3: 0.24,
  },
  linode: {
    "g6-nanode-1": 0.0075,
    "g6-standard-1": 0.015,
    "g6-standard-2": 0.03,
    "g6-standard-4": 0.06,
    "g6-standard-6": 0.12,
    "g6-highmem-2": 0.045,
    "g6-highmem-4": 0.09,
  },
}

export const STORAGE_PRICING_PER_GB: Record<CloudProvider, number> = {
  aws: 0.1,
  gcp: 0.04,
  azure: 0.05,
  linode: 0.1,
}

export const REGIONS: Record<CloudProvider, Array<{ value: string; label: string }>> = {
  aws: [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-2", label: "US West (Oregon)" },
    { value: "eu-west-1", label: "EU (Ireland)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  ],
  gcp: [
    { value: "us-central1", label: "US Central (Iowa)" },
    { value: "us-west1", label: "US West (Oregon)" },
    { value: "europe-west1", label: "Europe West (Belgium)" },
    { value: "asia-southeast1", label: "Asia Southeast (Singapore)" },
  ],
  azure: [
    { value: "eastus", label: "East US (Virginia)" },
    { value: "westus2", label: "West US 2 (Washington)" },
    { value: "westeurope", label: "West Europe (Netherlands)" },
    { value: "southeastasia", label: "Southeast Asia (Singapore)" },
  ],
  linode: [
    { value: "us-east", label: "Newark, NJ" },
    { value: "us-west", label: "Fremont, CA" },
    { value: "eu-west", label: "London, UK" },
    { value: "ap-south", label: "Singapore, SG" },
  ],
}

export function getRecommendedInstanceType(
  provider: CloudProvider,
  size: ClusterSize,
  serviceType: ServiceType,
): string {
  const sizeMap: Record<CloudProvider, Record<ClusterSize, string>> = {
    aws: {
      small: serviceType === "redis" || serviceType === "nat-gateway" ? "t3.medium" : "m5.large",
      medium: serviceType === "mysql" || serviceType === "mongodb" ? "r5.xlarge" : "m5.xlarge",
      large: serviceType === "elasticsearch" ? "r5.2xlarge" : "m5.4xlarge",
    },
    gcp: {
      small: "n2-standard-2",
      medium: serviceType === "mysql" || serviceType === "mongodb" ? "n2-highmem-4" : "n2-standard-4",
      large: "n2-standard-8",
    },
    azure: {
      small: "Standard_B2ms",
      medium: serviceType === "mysql" || serviceType === "mongodb" ? "Standard_E4s_v3" : "Standard_D4s_v3",
      large: "Standard_D8s_v3",
    },
    linode: {
      small: "g6-standard-2",
      medium: serviceType === "mysql" || serviceType === "mongodb" ? "g6-highmem-4" : "g6-standard-4",
      large: "g6-standard-6",
    },
  }

  return sizeMap[provider][size]
}
