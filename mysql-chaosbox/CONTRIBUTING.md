# Contributing to MySQL ChaosBox

Thank you for your interest in contributing!

## Development Setup

```bash
# Clone repository
git clone https://github.com/thecloudbox/mysql-chaosbox
cd mysql-chaosbox

# Install dependencies
go mod download

# Run tests
go test ./...

# Build
go build ./cmd/chaosbox

# Run locally
./chaosbox --help
```

## Adding New Scenarios

1. Create scenario in `pkg/scenarios/`
2. Implement the Scenario interface
3. Add tests in `pkg/scenarios/*_test.go`
4. Update documentation in `docs/SCENARIOS.md`
5. Submit PR

## Code Style

- Follow Go conventions
- Run `go fmt` before committing
- Add tests for new features
- Update documentation

## Submitting Changes

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## Questions?

- Open an issue: https://github.com/thecloudbox/mysql-chaosbox/issues
- Visit: https://thecloudbox.io/tools/mysql-chaosbox
