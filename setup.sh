#!/bin/bash

# TheCloudbox Setup Script - Local Development
# This script sets up the local development environment

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
cat << "EOF"
╔════════════════════════════════════════╗
║                                        ║
║         TheCloudbox Setup              ║
║         Delivering Solutions           ║
║         Local Development Mode         ║
║                                        ║
╚════════════════════════════════════════╝
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

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    print_warning "Please don't run this script as root"
    exit 1
fi

# Check prerequisites
print_info "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi
print_message "Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi
print_message "npm found: $(npm --version)"

# Install dependencies
print_info "Installing dependencies..."
npm install
print_message "Dependencies installed successfully"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    print_warning ".env.local file not found. Creating from template..."
    cat > .env.local << 'ENV_FILE'
# Application
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000

# Company Info
NEXT_PUBLIC_COMPANY_NAME=TheCloudbox
NEXT_PUBLIC_COMPANY_EMAIL=contact@thecloudbox.com
NEXT_PUBLIC_COMPANY_PHONE=+1 (555) 123-4567
ENV_FILE
    print_message ".env.local file created"
fi

# Build the application
print_info "Building the application..."
npm run build
print_message "Application built successfully"

# Display completion message
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Setup Complete! 🎉             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}To start development server:${NC}"
echo -e "  ${YELLOW}npm run dev${NC}"
echo ""
echo -e "${BLUE}Or use Docker:${NC}"
echo -e "  ${YELLOW}docker-compose up${NC}"
echo ""
echo -e "${BLUE}Application will be available at:${NC}"
echo -e "  🌐 ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}Logo options available at:${NC}"
echo -e "  ${GREEN}http://localhost:3000/1${NC} (Terminal with Cloud Output)"
echo -e "  ${GREEN}http://localhost:3000/2${NC} (Command Transform)"
echo -e "  ${GREEN}http://localhost:3000/3${NC} (Container Cube)"
echo -e "  ${GREEN}http://localhost:3000/4${NC} (Circuit Cloud)"
echo -e "  ${GREEN}http://localhost:3000/5${NC} (Infrastructure Stack)"
echo ""
print_message "Ready to start developing!"
