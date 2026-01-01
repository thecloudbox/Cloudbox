-- CXO Cost Intelligence Database Schema

-- Service costs table (main cost data)
CREATE TABLE IF NOT EXISTS service_costs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service_name VARCHAR(255) NOT NULL,
    environment VARCHAR(50) NOT NULL,
    cost_center VARCHAR(100) NOT NULL,
    cloud_provider VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    cost_type VARCHAR(50) NOT NULL, -- compute, storage, network, database
    cost_usd DECIMAL(12, 4) NOT NULL,
    cpu_cost_usd DECIMAL(12, 4) DEFAULT 0,
    memory_cost_usd DECIMAL(12, 4) DEFAULT 0,
    storage_cost_usd DECIMAL(12, 4) DEFAULT 0,
    network_ingress_cost_usd DECIMAL(12, 4) DEFAULT 0,
    network_egress_cost_usd DECIMAL(12, 4) DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_costs_timestamp ON service_costs(timestamp DESC);
CREATE INDEX idx_service_costs_service ON service_costs(service_name);
CREATE INDEX idx_service_costs_type ON service_costs(cost_type);

-- Resource usage metrics
CREATE TABLE IF NOT EXISTS resource_usage (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service_name VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50) NOT NULL, -- pod, vm, container
    resource_id VARCHAR(255) NOT NULL,
    cpu_cores DECIMAL(6, 3) NOT NULL,
    memory_gb DECIMAL(8, 3) NOT NULL,
    storage_gb DECIMAL(10, 3) DEFAULT 0,
    network_ingress_gb DECIMAL(10, 3) DEFAULT 0,
    network_egress_gb DECIMAL(10, 3) DEFAULT 0,
    cloud_provider VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    tags JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_resource_usage_timestamp ON resource_usage(timestamp DESC);
CREATE INDEX idx_resource_usage_service ON resource_usage(service_name);
CREATE INDEX idx_resource_usage_resource ON resource_usage(resource_id);

-- Shared infrastructure allocation
CREATE TABLE IF NOT EXISTS shared_infrastructure_allocation (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service_name VARCHAR(255) NOT NULL,
    cluster_name VARCHAR(255),
    resource_type VARCHAR(50) NOT NULL, -- kubernetes, load_balancer, nat_gateway
    total_cost_usd DECIMAL(12, 4) NOT NULL,
    allocated_cost_usd DECIMAL(12, 4) NOT NULL,
    allocation_method VARCHAR(50) NOT NULL, -- usage_based, weighted, equal
    cpu_allocation_percent DECIMAL(5, 2),
    memory_allocation_percent DECIMAL(5, 2),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shared_infra_timestamp ON shared_infrastructure_allocation(timestamp DESC);
CREATE INDEX idx_shared_infra_service ON shared_infrastructure_allocation(service_name);

-- Pod costs (Kubernetes specific)
CREATE TABLE IF NOT EXISTS pod_costs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    pod_name VARCHAR(255) NOT NULL,
    namespace VARCHAR(255) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    cluster_name VARCHAR(255) NOT NULL,
    cpu_cores DECIMAL(6, 3) NOT NULL,
    memory_gb DECIMAL(8, 3) NOT NULL,
    cpu_cost_usd DECIMAL(10, 4) NOT NULL,
    memory_cost_usd DECIMAL(10, 4) NOT NULL,
    storage_cost_usd DECIMAL(10, 4) DEFAULT 0,
    total_cost_usd DECIMAL(12, 4) NOT NULL,
    labels JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pod_costs_timestamp ON pod_costs(timestamp DESC);
CREATE INDEX idx_pod_costs_service ON pod_costs(service_name);
CREATE INDEX idx_pod_costs_cluster ON pod_costs(cluster_name);

-- Storage costs
CREATE TABLE IF NOT EXISTS storage_costs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service_name VARCHAR(255) NOT NULL,
    storage_type VARCHAR(50) NOT NULL, -- ssd, hdd, object_storage
    storage_gb DECIMAL(12, 3) NOT NULL,
    iops INT,
    throughput_mbps INT,
    cost_usd DECIMAL(12, 4) NOT NULL,
    cloud_provider VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_storage_costs_timestamp ON storage_costs(timestamp DESC);
CREATE INDEX idx_storage_costs_service ON storage_costs(service_name);

-- Network costs
CREATE TABLE IF NOT EXISTS network_costs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service_name VARCHAR(255) NOT NULL,
    direction VARCHAR(20) NOT NULL, -- ingress, egress
    data_gb DECIMAL(12, 3) NOT NULL,
    cost_usd DECIMAL(12, 4) NOT NULL,
    destination VARCHAR(100), -- internet, inter_region, intra_region
    cloud_provider VARCHAR(50) NOT NULL,
    region VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_network_costs_timestamp ON network_costs(timestamp DESC);
CREATE INDEX idx_network_costs_service ON network_costs(service_name);

-- Cost anomalies
CREATE TABLE IF NOT EXISTS cost_anomalies (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service_name VARCHAR(255) NOT NULL,
    cost_type VARCHAR(50) NOT NULL,
    cost_usd DECIMAL(12, 4) NOT NULL,
    expected_cost DECIMAL(12, 4) NOT NULL,
    zscore DECIMAL(6, 3) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
    alerted BOOLEAN DEFAULT FALSE,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cost_anomalies_timestamp ON cost_anomalies(timestamp DESC);
CREATE INDEX idx_cost_anomalies_service ON cost_anomalies(service_name);
CREATE INDEX idx_cost_anomalies_severity ON cost_anomalies(severity);

-- Service budgets
CREATE TABLE IF NOT EXISTS service_budgets (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL UNIQUE,
    monthly_budget_usd DECIMAL(12, 2) NOT NULL,
    alert_threshold_percent INT DEFAULT 80,
    cost_center VARCHAR(100),
    owner_email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cloud provider pricing (reference data)
CREATE TABLE IF NOT EXISTS cloud_pricing (
    id SERIAL PRIMARY KEY,
    cloud_provider VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    sku VARCHAR(255),
    cpu_hour_cost DECIMAL(8, 6),
    memory_gb_hour_cost DECIMAL(8, 6),
    storage_gb_month_cost DECIMAL(8, 6),
    network_gb_cost DECIMAL(8, 6),
    effective_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cloud_provider, region, resource_type, sku, effective_date)
);

CREATE INDEX idx_cloud_pricing_provider ON cloud_pricing(cloud_provider, region);

-- Materialized view for quick cost summaries
CREATE MATERIALIZED VIEW IF NOT EXISTS daily_cost_summary AS
SELECT 
    DATE(timestamp) as date,
    service_name,
    cloud_provider,
    cost_type,
    SUM(cost_usd) as total_cost_usd,
    SUM(cpu_cost_usd) as cpu_cost_usd,
    SUM(memory_cost_usd) as memory_cost_usd,
    SUM(storage_cost_usd) as storage_cost_usd,
    SUM(network_ingress_cost_usd) as ingress_cost_usd,
    SUM(network_egress_cost_usd) as egress_cost_usd
FROM service_costs
GROUP BY DATE(timestamp), service_name, cloud_provider, cost_type;

CREATE UNIQUE INDEX idx_daily_cost_summary ON daily_cost_summary(date, service_name, cloud_provider, cost_type);

-- Refresh materialized view daily
CREATE OR REPLACE FUNCTION refresh_daily_cost_summary()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_cost_summary;
END;
$$ LANGUAGE plpgsql;

-- Insert sample pricing data
INSERT INTO cloud_pricing (cloud_provider, region, resource_type, cpu_hour_cost, memory_gb_hour_cost, storage_gb_month_cost, network_gb_cost, effective_date) VALUES
('aws', 'us-east-1', 'ec2', 0.0416, 0.0052, 0.10, 0.09, '2025-01-01'),
('aws', 'us-west-2', 'ec2', 0.0464, 0.0058, 0.10, 0.09, '2025-01-01'),
('gcp', 'us-central1', 'compute', 0.0310, 0.0041, 0.04, 0.12, '2025-01-01'),
('azure', 'eastus', 'vm', 0.0416, 0.0052, 0.05, 0.08, '2025-01-01'),
('linode', 'us-east', 'linode', 0.0075, 0.0094, 0.10, 0.01, '2025-01-01')
ON CONFLICT (cloud_provider, region, resource_type, sku, effective_date) DO NOTHING;
