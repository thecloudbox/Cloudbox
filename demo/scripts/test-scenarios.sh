#!/bin/bash

GATEWAY_IP=$(kubectl get svc istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

if [ -z "$GATEWAY_IP" ]; then
    echo "Using port-forward instead of LoadBalancer..."
    kubectl port-forward -n istio-system svc/istio-ingressgateway 8080:80 &
    PF_PID=$!
    sleep 3
    GATEWAY_IP="localhost:8080"
fi

echo "=== CloudSentinel Demo Scenarios ==="
echo "Gateway: $GATEWAY_IP"
echo ""

# Scenario 1: Normal Load
echo "Scenario 1: Normal Load (100 requests)"
for i in {1..100}; do
    curl -s -X POST http://$GATEWAY_IP/api/orders \
        -H "Content-Type: application/json" \
        -d '{"items":[{"id":1,"qty":1}]}' > /dev/null &
done
wait
echo "✓ Completed"
echo ""

# Scenario 2: High CPU
echo "Scenario 2: High CPU (triggers anomaly detection)"
curl -X POST http://$GATEWAY_IP/chaos/high-cpu \
    -H "Content-Type: application/json" \
    -d '{"duration":30}'
echo "✓ High CPU triggered - watch CloudSentinel dashboard"
echo ""

# Scenario 3: Payment Load
echo "Scenario 3: Payment Processing Load"
for i in {1..50}; do
    curl -s -X POST http://$GATEWAY_IP/api/payments/process \
        -H "Content-Type: application/json" \
        -d '{"amount":100}' > /dev/null &
done
wait
echo "✓ Completed"
echo ""

# Scenario 4: Notification Burst
echo "Scenario 4: Notification Burst"
for i in {1..30}; do
    curl -s -X POST http://$GATEWAY_IP/api/notifications/send \
        -H "Content-Type: application/json" \
        -d '{"type":"email","recipient":"test@example.com","message":"Test"}' > /dev/null &
done
wait
echo "✓ Completed"
echo ""

echo "=== All scenarios completed ==="
echo "Check CloudSentinel dashboard: http://thecloudbox.io/cloudsentinel"

# Cleanup port-forward if used
if [ ! -z "$PF_PID" ]; then
    kill $PF_PID
fi
