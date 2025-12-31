import type { Service, TerraformOutput, CloudProvider, ServiceType } from "./types"

export function generateTerraform(service: Service): TerraformOutput {
  const { cloudProvider, serviceType } = service

  return {
    provider: cloudProvider,
    serviceType,
    mainTf: generateMainTf(service),
    variablesTf: generateVariablesTf(service),
    outputsTf: generateOutputsTf(service),
    readmeMd: generateReadme(service),
  }
}

function generateMainTf(service: Service): string {
  const providerBlock = getProviderBlock(service.cloudProvider)
  const resourceBlocks = getResourceBlocks(service)

  return `terraform {
  required_version = ">= 1.0"
  required_providers {
    ${getProviderRequirements(service.cloudProvider)}
  }
}

${providerBlock}

${resourceBlocks}
`
}

function getProviderBlock(provider: CloudProvider): string {
  switch (provider) {
    case "aws":
      return `provider "aws" {
  region = var.region
  # Credentials managed via centralized service account
}`
    case "gcp":
      return `provider "google" {
  project = var.project_id
  region  = var.region
  # Credentials managed via centralized service account
}`
    case "azure":
      return `provider "azurerm" {
  features {}
  # Credentials managed via centralized service account
}`
    case "linode":
      return `provider "linode" {
  # Credentials managed via centralized service account
}`
  }
}

function getProviderRequirements(provider: CloudProvider): string {
  switch (provider) {
    case "aws":
      return `aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }`
    case "gcp":
      return `google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }`
    case "azure":
      return `azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }`
    case "linode":
      return `linode = {
      source  = "linode/linode"
      version = "~> 2.0"
    }`
  }
}

function getResourceBlocks(service: Service): string {
  const generators: Record<ServiceType, (service: Service) => string> = {
    kafka: generateKafkaResources,
    redis: generateRedisResources,
    mysql: generateMySQLResources,
    elasticsearch: generateElasticsearchResources,
    mongodb: generateMongoDBResources,
    "nat-gateway": generateNATGatewayResources,
  }

  return generators[service.serviceType](service)
}

function generateKafkaResources(service: Service): string {
  if (service.serviceType !== "kafka") return ""
  const config = service.config

  if (service.cloudProvider === "aws") {
    return `# Kafka Cluster - ${service.name}
resource "aws_instance" "kafka_broker" {
  count         = ${config.brokerCount}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  root_block_device {
    volume_size = ${config.storageSize}
    volume_type = "gp3"
    encrypted   = ${config.enableEncryption}
  }

  user_data = file("\${path.module}/kafka-bootstrap.sh")

  tags = {
    Name        = "${service.name}-broker-\${count.index + 1}"
    Service     = "kafka"
    Environment = var.environment
  }
}

resource "aws_security_group" "kafka" {
  name_prefix = "${service.name}-kafka-"
  
  ingress {
    from_port   = 9092
    to_port     = 9092
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}
`
  }

  // Similar templates for other providers
  return `# Kafka resources for ${service.cloudProvider} - implementation specific to provider`
}

function generateRedisResources(service: Service): string {
  if (service.serviceType !== "redis") return ""
  const config = service.config

  return `# Redis Cluster - ${service.name}
resource "aws_instance" "redis_node" {
  count         = ${config.nodeCount}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  root_block_device {
    volume_size = ${config.storageSize}
    encrypted   = ${config.enableEncryption}
  }

  user_data = templatefile("\${path.module}/redis-bootstrap.sh", {
    cluster_mode = ${config.clusterMode}
    max_memory_policy = "${config.maxMemoryPolicy}"
  })

  tags = {
    Name    = "${service.name}-redis-\${count.index + 1}"
    Service = "redis"
  }
}
`
}

function generateMySQLResources(service: Service): string {
  if (service.serviceType !== "mysql") return ""
  const config = service.config

  return `# MySQL Cluster - ${service.name}
# Master Instance
resource "aws_instance" "mysql_master" {
  count         = ${config.masterCount || 1}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  root_block_device {
    volume_size = ${config.storageSize}
    encrypted   = ${config.enableEncryption}
  }

  user_data = file("\${path.module}/mysql-master-bootstrap.sh")

  tags = {
    Name = "${service.name}-mysql-master-\${count.index + 1}"
    Role = "master"
  }
}

# Slave Instances
resource "aws_instance" "mysql_slave" {
  count         = ${config.slaveCount || 0}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  root_block_device {
    volume_size = ${config.storageSize}
    encrypted   = ${config.enableEncryption}
  }

  user_data = templatefile("\${path.module}/mysql-slave-bootstrap.sh", {
    master_host = aws_instance.mysql_master[0].private_ip
  })

  tags = {
    Name = "${service.name}-mysql-slave-\${count.index + 1}"
    Role = "slave"
  }
}

${
  config.orchestration?.autoFailover
    ? `
# Orchestrator for MySQL failover
resource "aws_instance" "mysql_orchestrator" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.small"
  
  user_data = file("\${path.module}/orchestrator-bootstrap.sh")

  tags = {
    Name = "${service.name}-orchestrator"
  }
}
`
    : ""
}
`
}

function generateElasticsearchResources(service: Service): string {
  if (service.serviceType !== "elasticsearch") return ""
  const config = service.config

  return `# Elasticsearch Cluster - ${service.name}
resource "aws_instance" "es_master" {
  count         = ${config.masterNodes}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  user_data = file("\${path.module}/es-master-bootstrap.sh")

  tags = {
    Name = "${service.name}-es-master-\${count.index + 1}"
    Role = "master"
  }
}

resource "aws_instance" "es_data" {
  count         = ${config.dataNodes}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  root_block_device {
    volume_size = ${config.storageSize}
    encrypted   = ${config.enableEncryption}
  }

  user_data = file("\${path.module}/es-data-bootstrap.sh")

  tags = {
    Name = "${service.name}-es-data-\${count.index + 1}"
    Role = "data"
  }
}
`
}

function generateMongoDBResources(service: Service): string {
  if (service.serviceType !== "mongodb") return ""
  const config = service.config

  return `# MongoDB Cluster - ${service.name}
resource "aws_instance" "mongodb_replica" {
  count         = ${config.replicaSetMembers}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${config.instanceType}"
  
  root_block_device {
    volume_size = ${config.storageSize}
    encrypted   = ${config.enableEncryption}
  }

  user_data = file("\${path.module}/mongodb-bootstrap.sh")

  tags = {
    Name = "${service.name}-mongodb-\${count.index + 1}"
  }
}

${
  config.sharding
    ? `
# Config Servers for sharding
resource "aws_instance" "mongodb_config" {
  count         = ${config.configServers || 3}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.small"
  
  user_data = file("\${path.module}/mongodb-config-bootstrap.sh")

  tags = {
    Name = "${service.name}-mongodb-config-\${count.index + 1}"
    Role = "config"
  }
}

# Mongos Routers
resource "aws_instance" "mongodb_mongos" {
  count         = ${config.mongosRouters || 2}
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"
  
  user_data = file("\${path.module}/mongodb-mongos-bootstrap.sh")

  tags = {
    Name = "${service.name}-mongodb-mongos-\${count.index + 1}"
    Role = "mongos"
  }
}
`
    : ""
}
`
}

function generateNATGatewayResources(service: Service): string {
  if (service.serviceType !== "nat-gateway") return ""
  const config = service.config

  return `# NAT Gateway with iptables - ${service.name}
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${service.name}-vpc"
  }
}

resource "aws_subnet" "public" {
  count                   = ${config.publicSubnets}
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.\${count.index}.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "${service.name}-public-\${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count      = ${config.privateSubnets}
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.\${count.index + 10}.0/24"

  tags = {
    Name = "${service.name}-private-\${count.index + 1}"
  }
}

resource "aws_instance" "nat_gateway" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "${config.instanceType}"
  subnet_id              = aws_subnet.public[0].id
  source_dest_check      = false

  user_data = templatefile("\${path.module}/nat-bootstrap.sh", {
    firewall_rules = jsonencode(${JSON.stringify(config.firewallRules)})
  })

  tags = {
    Name = "${service.name}-nat"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${service.name}-igw"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block  = "0.0.0.0/0"
    instance_id = aws_instance.nat_gateway.id
  }

  tags = {
    Name = "${service.name}-private-rt"
  }
}
`
}

function generateVariablesTf(service: Service): string {
  return `variable "region" {
  description = "Cloud region for deployment"
  type        = string
  default     = "${service.region}"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

${
  service.cloudProvider === "gcp"
    ? `
variable "project_id" {
  description = "GCP Project ID"
  type        = string
}
`
    : ""
}
`
}

function generateOutputsTf(service: Service): string {
  const outputs: Record<ServiceType, string> = {
    kafka: `output "kafka_broker_ips" {
  description = "Private IPs of Kafka brokers"
  value       = aws_instance.kafka_broker[*].private_ip
}

output "kafka_connection_string" {
  description = "Kafka bootstrap servers"
  value       = join(",", formatlist("%s:9092", aws_instance.kafka_broker[*].private_ip))
}`,
    redis: `output "redis_node_ips" {
  description = "Private IPs of Redis nodes"
  value       = aws_instance.redis_node[*].private_ip
}`,
    mysql: `output "mysql_master_ip" {
  description = "MySQL master instance IP"
  value       = aws_instance.mysql_master[0].private_ip
}

output "mysql_slave_ips" {
  description = "MySQL slave instance IPs"
  value       = aws_instance.mysql_slave[*].private_ip
}`,
    elasticsearch: `output "es_master_ips" {
  description = "Elasticsearch master node IPs"
  value       = aws_instance.es_master[*].private_ip
}

output "es_data_ips" {
  description = "Elasticsearch data node IPs"
  value       = aws_instance.es_data[*].private_ip
}`,
    mongodb: `output "mongodb_replica_ips" {
  description = "MongoDB replica set member IPs"
  value       = aws_instance.mongodb_replica[*].private_ip
}`,
    "nat-gateway": `output "nat_gateway_ip" {
  description = "NAT Gateway public IP"
  value       = aws_instance.nat_gateway.public_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}`,
  }

  return `${outputs[service.serviceType]}`
}

function generateReadme(service: Service): string {
  return `# ${service.name} - ${service.serviceType.toUpperCase()} on ${service.cloudProvider.toUpperCase()}

This Terraform configuration deploys a ${service.size} ${service.serviceType} cluster on ${service.cloudProvider}.

## Prerequisites

- Terraform >= 1.0
- ${service.cloudProvider.toUpperCase()} CLI configured with credentials
- Centralized service account with appropriate permissions

## Deployment

1. Initialize Terraform:
   \`\`\`bash
   terraform init
   \`\`\`

2. Review the plan:
   \`\`\`bash
   terraform plan
   \`\`\`

3. Apply the configuration:
   \`\`\`bash
   terraform apply
   \`\`\`

## Configuration

Service Size: ${service.size}
Instance Type: ${service.config.instanceType}
Region: ${service.region}
Estimated Cost: $${service.cost.monthly.toFixed(2)}/month

## Outputs

After deployment, Terraform will output connection details and IP addresses for your ${service.serviceType} cluster.

## Bootstrap Scripts

The following bootstrap scripts are referenced in the configuration:
${getBootstrapScriptsList(service.serviceType)}

These scripts should be created in the same directory as your Terraform files.

## Managed by

This infrastructure is managed via centralized orchestration service.
Deployment ID: ${service.deploymentId || "pending"}
`
}

function getBootstrapScriptsList(serviceType: ServiceType): string {
  const scripts: Record<ServiceType, string[]> = {
    kafka: ["kafka-bootstrap.sh"],
    redis: ["redis-bootstrap.sh"],
    mysql: ["mysql-master-bootstrap.sh", "mysql-slave-bootstrap.sh", "orchestrator-bootstrap.sh"],
    elasticsearch: ["es-master-bootstrap.sh", "es-data-bootstrap.sh"],
    mongodb: ["mongodb-bootstrap.sh", "mongodb-config-bootstrap.sh", "mongodb-mongos-bootstrap.sh"],
    "nat-gateway": ["nat-bootstrap.sh"],
  }

  return scripts[serviceType].map((script) => `- ${script}`).join("\n")
}
