-- CloudSentinel Database Schema

CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    affected_services TEXT[],
    root_cause TEXT,
    resolution TEXT,
    auto_remediated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    mttr_seconds INTEGER
);

CREATE TABLE IF NOT EXISTS anomalies (
    id SERIAL PRIMARY KEY,
    service VARCHAR(100) NOT NULL,
    metric VARCHAR(100) NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    expected_value DOUBLE PRECISION,
    deviation DOUBLE PRECISION,
    severity VARCHAR(50) NOT NULL,
    anomaly_score DOUBLE PRECISION,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    incident_id INTEGER REFERENCES incidents(id)
);

CREATE TABLE IF NOT EXISTS runbooks (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(50) NOT NULL,
    triggers TEXT[],
    affected_services TEXT[],
    steps JSONB NOT NULL,
    validation_steps TEXT[],
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    total_execution_time INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cost_anomalies (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(50) NOT NULL,
    service VARCHAR(100) NOT NULL,
    cost DOUBLE PRECISION NOT NULL,
    cost_increase DOUBLE PRECISION,
    severity VARCHAR(50) NOT NULL,
    correlated_incidents TEXT[],
    recommendations TEXT[],
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blast_radius_predictions (
    id SERIAL PRIMARY KEY,
    service VARCHAR(100) NOT NULL,
    change_type VARCHAR(50) NOT NULL,
    risk_level VARCHAR(50) NOT NULL,
    risk_score INTEGER NOT NULL,
    affected_services TEXT[],
    estimated_user_impact INTEGER,
    confidence DOUBLE PRECISION,
    mitigation_strategies TEXT[],
    rollback_plan TEXT[],
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nl_queries (
    id SERIAL PRIMARY KEY,
    query TEXT NOT NULL,
    intent VARCHAR(100),
    entities JSONB,
    answer TEXT,
    confidence DOUBLE PRECISION,
    response_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_severity ON incidents(severity);
CREATE INDEX idx_incidents_created_at ON incidents(created_at);
CREATE INDEX idx_anomalies_service ON anomalies(service);
CREATE INDEX idx_anomalies_detected_at ON anomalies(detected_at);
CREATE INDEX idx_runbooks_severity ON runbooks(severity);
CREATE INDEX idx_cost_anomalies_provider ON cost_anomalies(provider);
CREATE INDEX idx_cost_anomalies_detected_at ON cost_anomalies(detected_at);

-- Insert sample data
INSERT INTO runbooks (id, name, description, severity, triggers, affected_services, steps, validation_steps) VALUES
('rb-1', 'High CPU Auto-Scale', 'Automatically scale services when CPU exceeds threshold', 'high', 
 ARRAY['cpu_high', 'performance_degradation'], 
 ARRAY['api-gateway', 'user-service'],
 '[{"action": "Scale up service", "params": {"replicas": 3}, "expectedDuration": 30}]',
 ARRAY['Check service health', 'Verify CPU normalized']
);

INSERT INTO incidents (title, description, severity, status, affected_services, auto_remediated) VALUES
('High API Latency Detected', 'API response time increased by 300%', 'high', 'resolved', 
 ARRAY['api-gateway'], true
);
