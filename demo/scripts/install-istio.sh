#!/bin/bash
set -e

echo "=== Installing Istio for CloudSentinel Demo ==="

# Check if istioctl is installed
if ! command -v istioctl &> /dev/null; then
    echo "Installing istioctl..."
    curl -L https://istio.io/downloadIstio | sh -
    cd istio-*/bin
    export PATH=$PWD:$PATH
    cd ../..
fi

# Install Istio with demo profile
echo "Installing Istio with demo profile..."
istioctl install --set profile=demo -y

# Enable sidecar injection for demo namespace
echo "Enabling sidecar injection for demo namespace..."
kubectl label namespace demo istio-injection=enabled --overwrite

# Install Kiali for service mesh visualization
echo "Installing Kiali dashboard..."
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/addons/kiali.yaml

# Install Jaeger for distributed tracing
echo "Installing Jaeger..."
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/addons/jaeger.yaml

# Install Prometheus for metrics (if not already installed)
echo "Installing Prometheus..."
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/addons/prometheus.yaml

# Install Grafana for visualization
echo "Installing Grafana..."
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/addons/grafana.yaml

# Wait for Istio to be ready
echo "Waiting for Istio components to be ready..."
kubectl wait --for=condition=ready pod -l app=istiod -n istio-system --timeout=300s

echo "=== Istio Installation Complete ==="
echo ""
echo "Access dashboards:"
echo "  Kiali:      kubectl port-forward -n istio-system svc/kiali 20001:20001"
echo "  Grafana:    kubectl port-forward -n istio-system svc/grafana 3000:3000"
echo "  Jaeger:     kubectl port-forward -n istio-system svc/tracing 16686:16686"
echo "  Prometheus: kubectl port-forward -n istio-system svc/prometheus 9090:9090"
