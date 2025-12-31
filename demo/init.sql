-- CloudSentinel Database Schema

CREATE TABLE IF NOT EXISTS incidents (
    id VARCHAR(255) PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    severity VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    affected_services TEXT[],
    status VARCHAR(50) NOT NULL,
    mttr REAL,
    root_cause TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS anomalies (
    id VARCHAR(255) PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    service VARCHAR(255) NOT NULL,
    metric VARCHAR(255) NOT NULL,
    value REAL NOT NULL,
    expected_value REAL NOT NULL,
    deviation REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS runbooks (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    triggered_by VARCHAR(255) NOT NULL,
    steps JSONB NOT NULL,
    success_rate REAL NOT NULL,
    times_executed INTEGER DEFAULT 0,
    avg_resolution_time REAL,
    last_updated BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cost_anomalies (
    id VARCHAR(255) PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    service VARCHAR(255) NOT NULL,
    cloud_provider VARCHAR(50) NOT NULL,
    expected_cost REAL NOT NULL,
    actual_cost REAL NOT NULL,
    cost_increase REAL NOT NULL,
    linked_to_performance_issue BOOLEAN DEFAULT FALSE,
    performance_issue_id VARCHAR(255),
    severity VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incidents_timestamp ON incidents(timestamp DESC);
CREATE INDEX idx_anomalies_timestamp ON anomalies(timestamp DESC);
CREATE INDEX idx_runbooks_triggered_by ON runbooks(triggered_by);
CREATE INDEX idx_cost_anomalies_timestamp ON cost_anomalies(timestamp DESC);
