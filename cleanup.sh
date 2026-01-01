#!/bin/bash

# TheCloudbox Cleanup Script
# Removes all Docker volumes, caches, and build artifacts for a fresh rebuild

set -e

echo "======================================"
echo "  TheCloudbox Cleanup & Rebuild"
echo "======================================"
echo ""

# Function to print colored output
print_success() {
    echo -e "\033[0;32m✓ $1\033[0m"
}

print_info() {
    echo -e "\033[0;34m→ $1\033[0m"
}

print_warning() {
    echo -e "\033[0;33m⚠ $1\033[0m"
}

# Stop all running containers
print_info "Stopping all Docker containers..."
docker-compose down 2>/dev/null || true
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
docker-compose -f cloudsentinel-docker-compose.yml down 2>/dev/null || true
cd demo && docker-compose down 2>/dev/null || true
cd .. && cd cloudsentinel-deploy && docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
cd ..
print_success "Containers stopped"

# Remove Docker volumes
print_info "Removing Docker volumes..."
docker volume prune -f
print_success "Volumes removed"

# Remove Next.js build cache
print_info "Removing Next.js build cache..."
rm -rf .next
rm -rf node_modules/.cache
print_success "Build cache removed"

# Remove node_modules (optional - uncomment if needed)
# print_warning "Removing node_modules..."
# rm -rf node_modules
# print_success "node_modules removed"

# Docker system prune
print_info "Pruning Docker system..."
docker system prune -af --volumes
print_success "Docker system pruned"

# Rebuild everything
print_info "Rebuilding Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache
print_success "Images rebuilt"

# Start containers
print_info "Starting containers..."
docker-compose -f docker-compose.prod.yml up -d
print_success "Containers started"

echo ""
print_success "Cleanup and rebuild complete!"
echo ""
echo "Services available at:"
echo "  - Website: http://localhost:3030"
echo "  - CloudSentinel: http://localhost:3030/cloudsentinel"
echo ""
echo "To view logs: docker-compose -f docker-compose.prod.yml logs -f"
echo ""
