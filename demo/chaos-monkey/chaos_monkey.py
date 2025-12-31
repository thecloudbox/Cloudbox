#!/usr/bin/env python3
"""
Chaos Monkey for CloudSentinel Demo
Injects failures to demonstrate AIOps capabilities
"""

import os
import time
import random
import requests
from prometheus_client import Counter, Gauge, start_http_server

# Metrics
chaos_events = Counter('chaos_events_total', 'Total chaos events', ['type'])
service_health = Gauge('chaos_service_health', 'Service health status', ['service'])

TARGETS = os.getenv('TARGETS', 'frontend-service,api-gateway').split(',')
FAILURE_RATE = float(os.getenv('FAILURE_RATE', '0.1'))
PROMETHEUS_URL = os.getenv('PROMETHEUS_URL', 'http://prometheus:9090')

class ChaosMonkey:
    def __init__(self):
        self.targets = TARGETS
        self.failure_types = [
            'cpu_spike',
            'memory_leak',
            'network_latency',
            'service_crash',
            'disk_fill'
        ]
        
    def inject_cpu_spike(self, target):
        """Inject CPU spike"""
        print(f"[Chaos] Injecting CPU spike on {target}")
        chaos_events.labels(type='cpu_spike').inc()
        # Implementation would depend on target service
        
    def inject_memory_leak(self, target):
        """Inject memory leak"""
        print(f"[Chaos] Injecting memory leak on {target}")
        chaos_events.labels(type='memory_leak').inc()
        
    def inject_network_latency(self, target):
        """Inject network latency"""
        print(f"[Chaos] Injecting network latency on {target}")
        chaos_events.labels(type='network_latency').inc()
        
    def inject_service_crash(self, target):
        """Crash service"""
        print(f"[Chaos] Crashing {target}")
        chaos_events.labels(type='service_crash').inc()
        
    def inject_disk_fill(self, target):
        """Fill disk space"""
        print(f"[Chaos] Filling disk on {target}")
        chaos_events.labels(type='disk_fill').inc()
        
    def run(self):
        """Main chaos injection loop"""
        print(f"Chaos Monkey started. Targeting: {', '.join(self.targets)}")
        print(f"Failure rate: {FAILURE_RATE * 100}%")
        
        while True:
            try:
                # Randomly select target and failure type
                if random.random() < FAILURE_RATE:
                    target = random.choice(self.targets)
                    failure_type = random.choice(self.failure_types)
                    
                    # Execute chaos
                    method = getattr(self, f'inject_{failure_type}')
                    method(target)
                    
                # Update service health metrics
                for service in self.targets:
                    health = random.uniform(0.7, 1.0)
                    service_health.labels(service=service).set(health)
                    
                # Wait before next chaos event
                time.sleep(random.randint(30, 120))
                
            except Exception as e:
                print(f"[Chaos] Error: {e}")
                time.sleep(10)

if __name__ == '__main__':
    # Start Prometheus metrics server
    start_http_server(8000)
    
    # Start chaos monkey
    monkey = ChaosMonkey()
    monkey.run()
