package metrics

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	chaosEventTotal = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "chaos_event_total",
			Help: "Total number of chaos events",
		},
		[]string{"target", "scenario", "result"},
	)

	chaosEventDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "chaos_event_duration_seconds",
			Help:    "Duration of chaos events",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"target", "scenario"},
	)

	chaosImpactQueries = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "chaos_impact_queries_affected",
			Help: "Number of queries affected by chaos",
		},
		[]string{"target"},
	)

	chaosImpactConnections = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "chaos_impact_connections_affected",
			Help: "Number of connections affected by chaos",
		},
		[]string{"target"},
	)

	chaosRecoveryTime = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "chaos_recovery_time_seconds",
			Help:    "Time taken to recover from chaos",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"target", "scenario"},
	)

	mysqlUp = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "mysql_up",
			Help: "MySQL instance availability",
		},
		[]string{"instance"},
	)

	mysqlReplicationLag = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "mysql_replication_lag_seconds",
			Help: "MySQL replication lag in seconds",
		},
		[]string{"instance"},
	)

	mysqlConnections = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "mysql_connections_current",
			Help: "Current MySQL connections",
		},
		[]string{"instance"},
	)
)

type MetricsExporter struct {
	port     int
	registry *prometheus.Registry
	mu       sync.Mutex
}

func NewMetricsExporter(port int) *MetricsExporter {
	registry := prometheus.NewRegistry()
	
	// Register metrics
	registry.MustRegister(chaosEventTotal)
	registry.MustRegister(chaosEventDuration)
	registry.MustRegister(chaosImpactQueries)
	registry.MustRegister(chaosImpactConnections)
	registry.MustRegister(chaosRecoveryTime)
	registry.MustRegister(mysqlUp)
	registry.MustRegister(mysqlReplicationLag)
	registry.MustRegister(mysqlConnections)

	return &MetricsExporter{
		port:     port,
		registry: registry,
	}
}

func (m *MetricsExporter) Start() error {
	http.Handle("/metrics", promhttp.HandlerFor(m.registry, promhttp.HandlerOpts{}))
	
	addr := fmt.Sprintf(":%d", m.port)
	fmt.Printf("Starting metrics exporter on %s\n", addr)
	
	return http.ListenAndServe(addr, nil)
}

func (m *MetricsExporter) RecordChaosEvent(target, scenario, result string, duration float64) {
	chaosEventTotal.WithLabelValues(target, scenario, result).Inc()
	chaosEventDuration.WithLabelValues(target, scenario).Observe(duration)
}

func (m *MetricsExporter) RecordImpact(target string, queries, connections int) {
	chaosImpactQueries.WithLabelValues(target).Set(float64(queries))
	chaosImpactConnections.WithLabelValues(target).Set(float64(connections))
}

func (m *MetricsExporter) RecordRecovery(target, scenario string, recoveryTime float64) {
	chaosRecoveryTime.WithLabelValues(target, scenario).Observe(recoveryTime)
}

func (m *MetricsExporter) SetMySQLUp(instance string, up bool) {
	value := 0.0
	if up {
		value = 1.0
	}
	mysqlUp.WithLabelValues(instance).Set(value)
}

func (m *MetricsExporter) SetReplicationLag(instance string, lag float64) {
	mysqlReplicationLag.WithLabelValues(instance).Set(lag)
}

func (m *MetricsExporter) SetConnections(instance string, connections int) {
	mysqlConnections.WithLabelValues(instance).Set(float64(connections))
}
