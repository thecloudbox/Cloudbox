#!/bin/bash

# Quick Local Development Start Script for TheCloudbox
# This script gets you up and running in seconds

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}"
cat << "EOF"
┌──────────────────────────────────────┐
│                                      │
│     TheCloudbox - Quick Start        │
│     $ delivering solutions           │
│                                      │
└──────────────────────────────────────┘
EOF
echo -e "${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${CYAN}Installing dependencies...${NC}"
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo -e "${CYAN}Creating .env.local...${NC}"
    cat > .env.local << 'EOF'
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=TheCloudbox
NEXT_PUBLIC_COMPANY_EMAIL=contact@thecloudbox.com
NEXT_PUBLIC_COMPANY_PHONE=+1 (555) 123-4567
EOF
fi

echo -e "${GREEN}Starting development server...${NC}"
echo -e "${CYAN}Access at: http://localhost:3000${NC}"
echo -e "${CYAN}CloudSentinel: http://localhost:3000/cloudsentinel${NC}"
echo -e "${CYAN}Logo demos: http://localhost:3000/1 through /5${NC}"
echo ""

npm run dev
