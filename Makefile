.PHONY: help setup start stop restart logs clean build test deploy backup restore

help: ## Show this help message
	@echo 'TheCloudbox - Management Commands'
	@echo ''
	@echo 'Usage:'
	@echo '  make <target>'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Run initial setup
	@echo "Running setup..."
	@chmod +x setup.sh
	@./setup.sh

start: ## Start all services
	@echo "Starting services..."
	@docker-compose up -d
	@echo "Services started successfully!"
	@make status

stop: ## Stop all services
	@echo "Stopping services..."
	@docker-compose down
	@echo "Services stopped."

restart: ## Restart all services
	@echo "Restarting services..."
	@docker-compose restart
	@echo "Services restarted."

logs: ## View logs from all services
	@docker-compose logs -f

logs-web: ## View web application logs
	@docker-compose logs -f web

logs-db: ## View database logs
	@docker-compose logs -f postgres

logs-redis: ## View Redis logs
	@docker-compose logs -f redis

status: ## Check status of all services
	@echo "Service Status:"
	@docker-compose ps

build: ## Build Docker images
	@echo "Building Docker images..."
	@docker-compose build --no-cache
	@echo "Build complete."

rebuild: ## Rebuild and restart services
	@echo "Rebuilding services..."
	@docker-compose up -d --build
	@echo "Rebuild complete."

clean: ## Stop services and remove volumes (WARNING: Deletes data)
	@echo "WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v; \
		echo "Cleaned up successfully."; \
	fi

backup: ## Backup PostgreSQL database
	@echo "Creating database backup..."
	@mkdir -p backups
	@docker-compose exec -T postgres pg_dump -U postgres thecloudbox > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "Backup created in backups/ directory"

restore: ## Restore PostgreSQL database (specify file with FILE=backup.sql)
	@if [ -z "$(FILE)" ]; then \
		echo "Error: Please specify backup file with FILE=backup.sql"; \
		exit 1; \
	fi
	@echo "Restoring database from $(FILE)..."
	@docker-compose exec -T postgres psql -U postgres thecloudbox < $(FILE)
	@echo "Database restored successfully."

shell-web: ## Open shell in web container
	@docker-compose exec web sh

shell-db: ## Open PostgreSQL shell
	@docker-compose exec postgres psql -U postgres thecloudbox

shell-redis: ## Open Redis CLI
	@docker-compose exec redis redis-cli

test: ## Run tests
	@echo "Running tests..."
	@npm test

health: ## Check health of all services
	@echo "Checking service health..."
	@echo -n "Web: "
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 && echo " ✓" || echo " ✗"
	@echo -n "PostgreSQL: "
	@docker-compose exec -T postgres pg_isready -U postgres > /dev/null && echo "✓" || echo "✗"
	@echo -n "Redis: "
	@docker-compose exec -T redis redis-cli ping > /dev/null && echo "✓" || echo "✗"

stats: ## Show container resource usage
	@docker stats --no-stream

prune: ## Remove unused Docker resources
	@echo "Removing unused Docker resources..."
	@docker system prune -f
	@echo "Cleanup complete."

update: ## Update to latest version
	@echo "Updating to latest version..."
	@git pull origin main
	@make rebuild
	@echo "Update complete."

dev: ## Start development environment
	@echo "Starting development environment..."
	@npm run dev

prod: ## Start production environment
	@make build
	@make start
