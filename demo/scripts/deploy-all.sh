#!/bin/bash
set -e

echo "=== Deploying CloudSentinel Demo Environment ==="

# Create namespaces
echo "Creating namespaces..."
kubectl apply -f demo/kubernetes/namespace.yaml

# Deploy infrastructure components
echo "Deploying PostgreSQL..."
kubectl apply -f demo/kubernetes/postgres.yaml

echo "Deploying Redis..."
kubectl apply -f demo/kubernetes/redis.yaml

echo "Deploying RabbitMQ..."
kubectl apply -f demo/kubernetes/rabbitmq.yaml

# Wait for infrastructure to be ready
echo "Waiting for infrastructure to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n demo --timeout=180s
kubectl wait --for=condition=ready pod -l app=redis -n demo --timeout=180s
kubectl wait --for=condition=ready pod -l app=rabbitmq -n demo --timeout=180s

# Deploy microservices (will be created in next task)
echo "Deploying microservices..."
kubectl apply -f demo/kubernetes/orders-service.yaml
kubectl apply -f demo/kubernetes/payments-service.yaml
kubectl apply -f demo/kubernetes/notifications-service.yaml
kubectl apply -f demo/kubernetes/frontend.yaml

# Apply Istio configurations
echo "Applying Istio configurations..."
kubectl apply -f demo/istio/gateway.yaml
kubectl apply -f demo/istio/destination-rules.yaml
kubectl apply -f demo/istio/service-monitors.yaml

# Wait for services to be ready
echo "Waiting for services to be ready..."
kubectl wait --for=condition=ready pod -l app=orders-service -n demo --timeout=180s
kubectl wait --for=condition=ready pod -l app=payments-service -n demo --timeout=180s
kubectl wait --for=condition=ready pod -l app=notifications-service -n demo --timeout=180s
kubectl wait --for=condition=ready pod -l app=frontend -n demo --timeout=180s

echo "=== Deployment Complete ==="
echo ""
echo "Get Istio Ingress Gateway IP:"
echo "  kubectl get svc istio-ingressgateway -n istio-system"
echo ""
echo "Access demo application:"
echo "  http://<INGRESS-IP>/"
