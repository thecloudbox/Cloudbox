# MySQL ChaosBox

Enterprise-grade chaos engineering tool for MySQL infrastructure.

## Quick Start

```bash
# Docker Compose (Fastest)
docker-compose up -d
./scripts/init.sh
./scripts/run-chaos.sh mysql-crash

# View Dashboard
open http://localhost:3000  # Grafana (admin/admin)
open http://localhost:9090  # Prometheus
open http://localhost:8080  # ChaosBox UI
```

## Features

- 40+ chaos scenarios for MySQL, ProxySQL, Replication, PXC
- Built-in Prometheus metrics and Grafana dashboards
- Safe rollback mechanisms
- REST API and CLI
- Multi-deployment support (Docker, K8s, On-prem, Vagrant)

## Documentation

See [docs/](./docs/) for complete documentation:
- [Getting Started](./docs/GETTING-STARTED.md)
- [All Scenarios](./docs/SCENARIOS.md)
- [Deployment Guides](./docs/DEPLOYMENT.md)
- [API Reference](./docs/API.md)

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ CLI/API     │────▶│  ChaosBox    │────▶│   MySQL     │
│             │     │  Controller  │     │   Cluster   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Prometheus  │
                    │   Metrics    │
                    └──────────────┘
```

## License

Apache-2.0

## Support

- Documentation: https://thecloudbox.io/tools/mysql-chaosbox
- Issues: https://github.com/thecloudbox/mysql-chaosbox/issues
- Website: https://thecloudbox.io
