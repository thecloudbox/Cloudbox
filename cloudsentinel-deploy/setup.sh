#!/bin/bash

set -e

echo "======================================"
echo "CloudSentinel Production Setup"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"
echo ""

# Create necessary directories
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p prometheus grafana/provisioning alertmanager nginx/ssl
echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# Generate environment file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}Generating .env file...${NC}"
    cat > .env <<EOF
# CloudSentinel Environment Variables
NODE_ENV=production
POSTGRES_PASSWORD=$(openssl rand -base64 32)
GRAFANA_ADMIN_PASSWORD=admin123
PROMETHEUS_URL=http://prometheus:9090
GRAFANA_URL=http://grafana:3001
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi
echo ""

# Pull Docker images
echo -e "${YELLOW}Pulling Docker images (this may take a few minutes)...${NC}"
docker-compose -f docker-compose.prod.yml pull
echo -e "${GREEN}✓ Images pulled${NC}"
echo ""

# Start services
echo -e "${YELLOW}Starting CloudSentinel services...${NC}"
docker-compose -f docker-compose.prod.yml up -d
echo -e "${GREEN}✓ Services started${NC}"
echo ""

# Wait for services to be healthy
echo -e "${YELLOW}Waiting for services to be healthy (30 seconds)...${NC}"
sleep 30

# Check health
echo -e "${YELLOW}Checking service health...${NC}"

if curl -f http://localhost:3000/api/health &> /dev/null; then
    echo -e "${GREEN}✓ CloudSentinel is healthy${NC}"
else
    echo -e "${YELLOW}⚠ CloudSentinel health check failed (may still be starting)${NC}"
fi

if curl -f http://localhost:9090/-/healthy &> /dev/null; then
    echo -e "${GREEN}✓ Prometheus is healthy${NC}"
else
    echo -e "${YELLOW}⚠ Prometheus health check failed${NC}"
fi

echo ""
echo "======================================"
echo -e "${GREEN}CloudSentinel Setup Complete!${NC}"
echo "======================================"
echo ""
echo "Access your services:"
echo "  • CloudSentinel UI:  http://localhost:3000"
echo "  • Prometheus:        http://localhost:9090"
echo "  • Grafana:           http://localhost:3001 (admin/admin123)"
echo "  • AlertManager:      http://localhost:9093"
echo ""
echo "Useful commands:"
echo "  • View logs:         docker-compose -f docker-compose.prod.yml logs -f"
echo "  • Stop services:     docker-compose -f docker-compose.prod.yml down"
echo "  • Restart services:  docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "Documentation: ./DEPLOYMENT.md"
echo ""
