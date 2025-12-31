import type { ServiceConfig, CloudProvider, ServiceType } from "./types"
import { PRICING, STORAGE_PRICING_PER_GB } from "./cloud-config"

export function calculateServiceCost(
  provider: CloudProvider,
  serviceType: ServiceType,
  config: ServiceConfig,
): { hourly: number; monthly: number } {
  const instanceHourlyCost = PRICING[provider][config.instanceType] || 0
  const storagePricePerGB = STORAGE_PRICING_PER_GB[provider]

  let instanceCount = 1
  let totalStorage = config.storageSize

  // Calculate instance count based on service type
  switch (serviceType) {
    case "kafka":
      if ("brokerCount" in config) {
        instanceCount = config.brokerCount
        totalStorage = config.storageSize * config.brokerCount
      }
      break
    case "redis":
      if ("nodeCount" in config) {
        instanceCount = config.nodeCount
        totalStorage = config.storageSize * config.nodeCount
      }
      break
    case "mysql":
      if ("masterCount" in config && "slaveCount" in config) {
        instanceCount = (config.masterCount || 1) + (config.slaveCount || 0)
        totalStorage = config.storageSize * instanceCount
        // Add small instance for orchestrator if enabled
        if (config.orchestration?.autoFailover) {
          instanceCount += 0.2 // Approximate cost of small orchestrator instance
        }
      }
      break
    case "elasticsearch":
      if ("masterNodes" in config && "dataNodes" in config && "ingestNodes" in config) {
        instanceCount = config.masterNodes + config.dataNodes + config.ingestNodes
        totalStorage = config.storageSize * config.dataNodes
      }
      break
    case "mongodb":
      if ("replicaSetMembers" in config) {
        instanceCount = config.replicaSetMembers
        totalStorage = config.storageSize * config.replicaSetMembers
        if (config.sharding && config.configServers && config.mongosRouters) {
          instanceCount += config.configServers * 0.2 + config.mongosRouters * 0.3
        }
      }
      break
    case "nat-gateway":
      instanceCount = 1
      totalStorage = config.storageSize
      break
  }

  const totalInstanceCost = instanceHourlyCost * instanceCount
  const storageMonthly = totalStorage * storagePricePerGB
  const storageHourly = storageMonthly / 730

  const hourly = totalInstanceCost + storageHourly
  const monthly = hourly * 730

  return { hourly, monthly }
}
