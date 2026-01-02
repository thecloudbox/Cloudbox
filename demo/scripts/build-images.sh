#!/bin/bash
set -e

echo "=== Building Demo Service Images ==="

# Build orders service
echo "Building orders-service..."
cd demo/services/orders-service
docker build -t thecloudbox/orders-service:latest .
cd ../../..

# Build payments service
echo "Building payments-service..."
cd demo/services/payments-service
docker build -t thecloudbox/payments-service:latest .
cd ../../..

# Build notifications service
echo "Building notifications-service..."
cd demo/services/notifications-service
docker build -t thecloudbox/notifications-service:latest .
cd ../../..

# Build frontend
echo "Building frontend..."
cd demo/services/frontend
docker build -t thecloudbox/demo-frontend:latest .
cd ../../..

echo "=== All images built successfully ==="
echo ""
echo "To push to registry:"
echo "  docker push thecloudbox/orders-service:latest"
echo "  docker push thecloudbox/payments-service:latest"
echo "  docker push thecloudbox/notifications-service:latest"
echo "  docker push thecloudbox/demo-frontend:latest"
