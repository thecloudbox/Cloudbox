#!/bin/bash

# TheCloudbox Setup Script - Complete Setup for All Environments
# This script sets up local development, Docker, Kubernetes, or Vagrant

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║            ╔════════════════════════════╗             ║
║            ║   TheCloudbox              ║             ║
║            ║   $ delivering solutions   ║             ║
║            ╚════════════════════════════╝             ║
║                                                       ║
║            Complete Setup & Deployment                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

print_header() {
    echo -e "\n${CYAN}═══════════════════════════════════════${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}\n"
}

# Main menu
show_menu() {
    echo -e "${CYAN}Choose deployment mode:${NC}\n"
    echo "  1) Local Development (npm)"
    echo "  2) Docker Compose (Full Stack)"
    echo "  3) Kubernetes (Production)"
    echo "  4) Vagrant VM (Testing)"
    echo "  5) CloudSentinel Demo Setup"
    echo "  6) Clean Rebuild (Remove cache & volumes)"
    echo "  7) Exit"
    echo ""
    read -p "Enter choice [1-7]: " choice
}

# Local development setup
setup_local() {
    print_header "LOCAL DEVELOPMENT SETUP"
    
    # Check prerequisites
    print_info "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+ first."
        exit 1
    fi
    print_message "Node.js found: $(node --version)"
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_message "npm found: $(npm --version)"
    
    # Install dependencies
    print_info "Installing dependencies..."
    npm install
    print_message "Dependencies installed"
    
    # Create .env.local
    if [ ! -f .env.local ]; then
        print_warning "Creating .env.local file..."
        cat > .env.local << 'ENV_FILE'
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=TheCloudbox
NEXT_PUBLIC_COMPANY_EMAIL=contact@thecloudbox.com
NEXT_PUBLIC_COMPANY_PHONE=+1 (555) 123-4567
ENV_FILE
        print_message ".env.local created"
    fi
    
    # Build
    print_info "Building application..."
    npm run build
    print_message "Build complete"
    
    echo ""
    print_message "Setup complete! Start with: npm run dev"
    echo -e "Access at: ${GREEN}http://localhost:3000${NC}"
}

# Docker Compose setup
setup_docker() {
    print_header "DOCKER COMPOSE SETUP"
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed."
        exit 1
    fi
    print_message "Docker found: $(docker --version)"
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed."
        exit 1
    fi
    print_message "Docker Compose found"
    
    print_info "Starting Docker Compose stack..."
    docker-compose -f docker-compose.prod.yml up -d
    
    print_message "Docker stack started!"
    echo ""
    echo -e "Services available at:"
    echo -e "  App:        ${GREEN}http://localhost:3000${NC}"
    echo -e "  Prometheus: ${GREEN}http://localhost:9090${NC}"
    echo -e "  Grafana:    ${GREEN}http://localhost:3001${NC} (admin/admin)"
    echo -e "  Redis:      ${GREEN}localhost:6379${NC}"
    echo ""
    echo -e "To view logs: ${YELLOW}docker-compose -f docker-compose.prod.yml logs -f${NC}"
    echo -e "To stop:      ${YELLOW}docker-compose -f docker-compose.prod.yml down${NC}"
}

# Kubernetes setup
setup_kubernetes() {
    print_header "KUBERNETES DEPLOYMENT"
    
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed."
        exit 1
    fi
    print_message "kubectl found: $(kubectl version --client --short 2>/dev/null || echo 'installed')"
    
    print_info "Creating namespace..."
    kubectl apply -f k8s/namespace.yaml
    
    print_info "Creating ConfigMap..."
    kubectl apply -f k8s/configmap.yaml
    
    print_info "Deploying Redis..."
    kubectl apply -f k8s/redis-deployment.yaml
    
    print_info "Deploying Prometheus..."
    kubectl apply -f k8s/prometheus-deployment.yaml
    
    print_info "Deploying CloudSentinel app..."
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    
    print_info "Setting up autoscaling..."
    kubectl apply -f k8s/hpa.yaml
    
    print_message "Kubernetes deployment complete!"
    echo ""
    echo -e "Check status: ${YELLOW}kubectl get pods -n cloudsentinel${NC}"
    echo -e "Get service:  ${YELLOW}kubectl get svc -n cloudsentinel${NC}"
    echo -e "View logs:    ${YELLOW}kubectl logs -f -n cloudsentinel -l app=cloudsentinel${NC}"
}

# Vagrant setup
setup_vagrant() {
    print_header "VAGRANT VM SETUP"
    
    if ! command -v vagrant &> /dev/null; then
        print_error "Vagrant is not installed."
        exit 1
    fi
    print_message "Vagrant found: $(vagrant --version)"
    
    print_info "Starting Vagrant VM..."
    vagrant up
    
    print_message "Vagrant VM started!"
    echo ""
    echo -e "SSH into VM:  ${YELLOW}vagrant ssh${NC}"
    echo -e "Then run:     ${YELLOW}cd /vagrant && ./setup.sh${NC}"
    echo -e "Stop VM:      ${YELLOW}vagrant halt${NC}"
    echo -e "Destroy VM:   ${YELLOW}vagrant destroy${NC}"
}

# CloudSentinel demo setup
setup_cloudsentinel() {
    print_header "CLOUDSENTINEL DEMO SETUP"
    
    print_info "Starting CloudSentinel full stack..."
    
    # Start demo environment
    if [ -d "demo" ]; then
        cd demo
        docker-compose up -d
        cd ..
        print_message "CloudSentinel demo started!"
        echo ""
        echo -e "CloudSentinel: ${GREEN}http://localhost:3000/cloudsentinel${NC}"
        echo -e "Prometheus:    ${GREEN}http://localhost:9090${NC}"
        echo -e "Grafana:       ${GREEN}http://localhost:3001${NC} (admin/admin)"
        echo ""
        echo -e "Test scenarios available in: ${YELLOW}demo/scenarios/${NC}"
        echo -e "Run test: ${YELLOW}bash demo/scenarios/high-cpu.sh${NC}"
    else
        print_warning "Demo directory not found. Starting main app with CloudSentinel..."
        npm run dev &
        sleep 3
        print_message "CloudSentinel available at: ${GREEN}http://localhost:3000/cloudsentinel${NC}"
    fi
}

# Clean rebuild function
clean_rebuild() {
    print_header "CLEAN REBUILD - REMOVING CLOUDBOX CACHE & VOLUMES"
    
    print_warning "This will stop CloudBox containers, remove CloudBox volumes, and clear build caches!"
    read -p "Are you sure? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        print_info "Cancelled."
        exit 0
    fi
    
    print_info "Stopping CloudBox Docker containers..."
    docker-compose down -v 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
    docker-compose -f cloudsentinel-docker-compose.yml down -v 2>/dev/null || true
    if [ -d "demo" ]; then
        cd demo && docker-compose down -v 2>/dev/null || true && cd ..
    fi
    if [ -d "cloudsentinel-deploy" ]; then
        cd cloudsentinel-deploy && docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true && cd ..
    fi
    print_message "CloudBox containers stopped and volumes removed"
    
    print_info "Removing CloudBox Docker images..."
    docker images | grep -E 'cloudbox|cloudsentinel' | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true
    print_message "CloudBox images removed"
    
    # Remove Next.js build cache
    print_info "Removing Next.js build cache..."
    rm -rf .next
    rm -rf node_modules/.cache
    rm -rf .turbo
    print_message "Build cache removed"
    
    print_info "Cleaning up CloudBox dangling resources..."
    docker volume ls -qf dangling=true -f name=cloudbox | xargs -r docker volume rm 2>/dev/null || true
    docker volume ls -qf dangling=true -f name=cloudsentinel | xargs -r docker volume rm 2>/dev/null || true
    print_message "Dangling volumes cleaned"
    
    # Rebuild everything
    print_info "Rebuilding CloudBox Docker images (no cache)..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    print_message "Images rebuilt"
    
    # Start containers
    print_info "Starting CloudBox containers..."
    docker-compose -f docker-compose.prod.yml up -d
    print_message "Containers started"
    
    echo ""
    print_message "Clean rebuild complete!"
    echo ""
    echo -e "Services available at:"
    echo -e "  Website:        ${GREEN}http://localhost:3030${NC}"
    echo -e "  CloudSentinel:  ${GREEN}http://localhost:3030/cloudsentinel${NC}"
    echo ""
    echo -e "To view logs: ${YELLOW}docker-compose -f docker-compose.prod.yml logs -f${NC}"
}

# Main execution
show_menu

case $choice in
    1)
        setup_local
        ;;
    2)
        setup_docker
        ;;
    3)
        setup_kubernetes
        ;;
    4)
        setup_vagrant
        ;;
    5)
        setup_cloudsentinel
        ;;
    6)
        clean_rebuild
        ;;
    7)
        echo "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid option"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                  Setup Complete!                      ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
