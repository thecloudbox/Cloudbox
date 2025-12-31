import type {
  ClusterSize,
  KafkaConfig,
  RedisConfig,
  MySQLConfig,
  ElasticsearchConfig,
  MongoDBConfig,
  NATGatewayConfig,
  CloudProvider,
} from "./types"
import { getRecommendedInstanceType } from "./cloud-config"

export function getKafkaPreset(size: ClusterSize, provider: CloudProvider): KafkaConfig {
  const presets: Record<ClusterSize, Omit<KafkaConfig, "instanceType">> = {
    small: {
      brokerCount: 3,
      storageSize: 100,
      replicationFactor: 2,
      minInSyncReplicas: 1,
      retentionHours: 168,
      enableEncryption: false,
      enableMonitoring: true,
    },
    medium: {
      brokerCount: 5,
      storageSize: 500,
      replicationFactor: 3,
      minInSyncReplicas: 2,
      retentionHours: 336,
      enableEncryption: true,
      enableMonitoring: true,
    },
    large: {
      brokerCount: 7,
      storageSize: 1000,
      replicationFactor: 3,
      minInSyncReplicas: 2,
      retentionHours: 720,
      enableEncryption: true,
      enableMonitoring: true,
    },
  }

  return {
    ...presets[size],
    instanceType: getRecommendedInstanceType(provider, size, "kafka"),
  }
}

export function getRedisPreset(size: ClusterSize, provider: CloudProvider): RedisConfig {
  const presets: Record<ClusterSize, Omit<RedisConfig, "instanceType">> = {
    small: {
      nodeCount: 3,
      clusterMode: true,
      storageSize: 50,
      maxMemoryPolicy: "allkeys-lru",
      persistenceEnabled: true,
      enableEncryption: false,
      enableMonitoring: true,
    },
    medium: {
      nodeCount: 6,
      clusterMode: true,
      storageSize: 100,
      maxMemoryPolicy: "allkeys-lru",
      persistenceEnabled: true,
      enableEncryption: true,
      enableMonitoring: true,
    },
    large: {
      nodeCount: 9,
      clusterMode: true,
      storageSize: 200,
      maxMemoryPolicy: "allkeys-lru",
      persistenceEnabled: true,
      enableEncryption: true,
      enableMonitoring: true,
    },
  }

  return {
    ...presets[size],
    instanceType: getRecommendedInstanceType(provider, size, "redis"),
  }
}

export function getMySQLPreset(size: ClusterSize, provider: CloudProvider): MySQLConfig {
  const presets: Record<ClusterSize, Omit<MySQLConfig, "instanceType">> = {
    small: {
      mode: "master-slave",
      masterCount: 1,
      slaveCount: 1,
      storageSize: 100,
      enableEncryption: false,
      enableMonitoring: true,
      enableBackup: true,
    },
    medium: {
      mode: "orchestrated",
      masterCount: 1,
      slaveCount: 2,
      storageSize: 500,
      enableEncryption: true,
      enableMonitoring: true,
      enableBackup: true,
      orchestration: {
        autoFailover: true,
        readReplicas: 2,
        backupSchedule: "0 2 * * *",
      },
    },
    large: {
      mode: "orchestrated",
      masterCount: 1,
      slaveCount: 4,
      storageSize: 1000,
      enableEncryption: true,
      enableMonitoring: true,
      enableBackup: true,
      orchestration: {
        autoFailover: true,
        readReplicas: 4,
        backupSchedule: "0 2 * * *",
      },
    },
  }

  return {
    ...presets[size],
    instanceType: getRecommendedInstanceType(provider, size, "mysql"),
  }
}

export function getElasticsearchPreset(size: ClusterSize, provider: CloudProvider): ElasticsearchConfig {
  const presets: Record<ClusterSize, Omit<ElasticsearchConfig, "instanceType">> = {
    small: {
      masterNodes: 3,
      dataNodes: 2,
      ingestNodes: 1,
      shardCount: 5,
      replicaCount: 1,
      storageSize: 200,
      enableEncryption: false,
      enableMonitoring: true,
    },
    medium: {
      masterNodes: 3,
      dataNodes: 4,
      ingestNodes: 2,
      shardCount: 10,
      replicaCount: 2,
      storageSize: 500,
      enableEncryption: true,
      enableMonitoring: true,
    },
    large: {
      masterNodes: 5,
      dataNodes: 8,
      ingestNodes: 3,
      shardCount: 20,
      replicaCount: 2,
      storageSize: 1000,
      enableEncryption: true,
      enableMonitoring: true,
    },
  }

  return {
    ...presets[size],
    instanceType: getRecommendedInstanceType(provider, size, "elasticsearch"),
  }
}

export function getMongoDBPreset(size: ClusterSize, provider: CloudProvider): MongoDBConfig {
  const presets: Record<ClusterSize, Omit<MongoDBConfig, "instanceType">> = {
    small: {
      replicaSetMembers: 3,
      sharding: false,
      storageSize: 100,
      enableEncryption: false,
      enableMonitoring: true,
    },
    medium: {
      replicaSetMembers: 3,
      sharding: true,
      configServers: 3,
      mongosRouters: 2,
      storageSize: 500,
      enableEncryption: true,
      enableMonitoring: true,
    },
    large: {
      replicaSetMembers: 5,
      sharding: true,
      configServers: 3,
      mongosRouters: 3,
      storageSize: 1000,
      enableEncryption: true,
      enableMonitoring: true,
    },
  }

  return {
    ...presets[size],
    instanceType: getRecommendedInstanceType(provider, size, "mongodb"),
  }
}

export function getNATGatewayPreset(size: ClusterSize, provider: CloudProvider): NATGatewayConfig {
  const presets: Record<ClusterSize, Omit<NATGatewayConfig, "instanceType">> = {
    small: {
      publicSubnets: 1,
      privateSubnets: 2,
      storageSize: 20,
      enableIptables: true,
      firewallRules: [
        {
          id: "1",
          name: "Allow HTTP",
          protocol: "tcp",
          port: "80",
          sourceIP: "0.0.0.0/0",
          action: "allow",
        },
        {
          id: "2",
          name: "Allow HTTPS",
          protocol: "tcp",
          port: "443",
          sourceIP: "0.0.0.0/0",
          action: "allow",
        },
      ],
      enableEncryption: false,
      enableMonitoring: true,
    },
    medium: {
      publicSubnets: 2,
      privateSubnets: 4,
      storageSize: 50,
      enableIptables: true,
      firewallRules: [
        {
          id: "1",
          name: "Allow HTTP",
          protocol: "tcp",
          port: "80",
          sourceIP: "0.0.0.0/0",
          action: "allow",
        },
        {
          id: "2",
          name: "Allow HTTPS",
          protocol: "tcp",
          port: "443",
          sourceIP: "0.0.0.0/0",
          action: "allow",
        },
        {
          id: "3",
          name: "Allow SSH",
          protocol: "tcp",
          port: "22",
          sourceIP: "10.0.0.0/8",
          action: "allow",
        },
      ],
      enableEncryption: true,
      enableMonitoring: true,
    },
    large: {
      publicSubnets: 3,
      privateSubnets: 6,
      storageSize: 100,
      enableIptables: true,
      firewallRules: [
        {
          id: "1",
          name: "Allow HTTP",
          protocol: "tcp",
          port: "80",
          sourceIP: "0.0.0.0/0",
          action: "allow",
        },
        {
          id: "2",
          name: "Allow HTTPS",
          protocol: "tcp",
          port: "443",
          sourceIP: "0.0.0.0/0",
          action: "allow",
        },
        {
          id: "3",
          name: "Allow SSH",
          protocol: "tcp",
          port: "22",
          sourceIP: "10.0.0.0/8",
          action: "allow",
        },
        {
          id: "4",
          name: "Allow Internal",
          protocol: "all",
          sourceIP: "10.0.0.0/8",
          action: "allow",
        },
      ],
      enableEncryption: true,
      enableMonitoring: true,
    },
  }

  return {
    ...presets[size],
    instanceType: getRecommendedInstanceType(provider, size, "nat-gateway"),
  }
}
