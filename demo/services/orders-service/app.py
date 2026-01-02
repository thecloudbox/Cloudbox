from flask import Flask, jsonify, request
from prometheus_client import Counter, Histogram, Gauge, generate_latest
import random
import time
import logging
import psycopg2
import redis
import os

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Prometheus metrics
REQUEST_COUNT = Counter('orders_requests_total', 'Total requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('orders_request_duration_seconds', 'Request duration')
ACTIVE_ORDERS = Gauge('orders_active_total', 'Number of active orders')
ERROR_RATE = Counter('orders_errors_total', 'Total errors', ['type'])

# Database connection
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'postgres'),
    'database': os.getenv('DB_NAME', 'demo'),
    'user': os.getenv('DB_USER', 'demouser'),
    'password': os.getenv('DB_PASSWORD', 'demo-password-change-in-production')
}

# Redis connection
REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
redis_client = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'orders-service'}), 200

@app.route('/metrics', methods=['GET'])
def metrics():
    return generate_latest()

@app.route('/api/orders', methods=['GET'])
@REQUEST_DURATION.time()
def get_orders():
    start_time = time.time()
    
    try:
        # Simulate database query
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        conn.close()
        
        # Simulate some processing
        processing_time = random.uniform(0.01, 0.1)
        time.sleep(processing_time)
        
        orders = [
            {'id': i, 'status': random.choice(['pending', 'processing', 'completed']), 
             'total': round(random.uniform(10, 500), 2)}
            for i in range(1, random.randint(5, 20))
        ]
        
        ACTIVE_ORDERS.set(len([o for o in orders if o['status'] != 'completed']))
        REQUEST_COUNT.labels(method='GET', endpoint='/api/orders', status='200').inc()
        
        return jsonify(orders), 200
        
    except Exception as e:
        ERROR_RATE.labels(type='database').inc()
        REQUEST_COUNT.labels(method='GET', endpoint='/api/orders', status='500').inc()
        logging.error(f"Error fetching orders: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/orders', methods=['POST'])
@REQUEST_DURATION.time()
def create_order():
    try:
        data = request.get_json()
        
        # Validate request
        if not data or 'items' not in data:
            REQUEST_COUNT.labels(method='POST', endpoint='/api/orders', status='400').inc()
            return jsonify({'error': 'Invalid request'}), 400
        
        # Simulate order creation
        order_id = random.randint(1000, 9999)
        
        # Cache in Redis
        redis_client.setex(f'order:{order_id}', 3600, 'pending')
        
        # Simulate processing time
        time.sleep(random.uniform(0.05, 0.2))
        
        REQUEST_COUNT.labels(method='POST', endpoint='/api/orders', status='201').inc()
        
        return jsonify({'id': order_id, 'status': 'created'}), 201
        
    except Exception as e:
        ERROR_RATE.labels(type='processing').inc()
        REQUEST_COUNT.labels(method='POST', endpoint='/api/orders', status='500').inc()
        logging.error(f"Error creating order: {str(e)}")
        return jsonify({'error': 'Failed to create order'}), 500

@app.route('/api/orders/<int:order_id>', methods=['GET'])
@REQUEST_DURATION.time()
def get_order(order_id):
    try:
        # Check cache first
        cached = redis_client.get(f'order:{order_id}')
        if cached:
            REQUEST_COUNT.labels(method='GET', endpoint='/api/orders/:id', status='200').inc()
            return jsonify({'id': order_id, 'status': cached}), 200
        
        REQUEST_COUNT.labels(method='GET', endpoint='/api/orders/:id', status='404').inc()
        return jsonify({'error': 'Order not found'}), 404
        
    except Exception as e:
        ERROR_RATE.labels(type='cache').inc()
        REQUEST_COUNT.labels(method='GET', endpoint='/api/orders/:id', status='500').inc()
        logging.error(f"Error fetching order {order_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# Chaos endpoint for testing
@app.route('/chaos/high-cpu', methods=['POST'])
def chaos_high_cpu():
    """Simulate high CPU usage"""
    duration = request.json.get('duration', 30)
    end_time = time.time() + duration
    
    while time.time() < end_time:
        # Busy loop to consume CPU
        _ = sum(i**2 for i in range(10000))
    
    return jsonify({'message': f'High CPU simulation completed for {duration}s'}), 200

@app.route('/chaos/memory-leak', methods=['POST'])
def chaos_memory_leak():
    """Simulate memory leak"""
    leak = []
    size = request.json.get('size_mb', 100)
    
    # Allocate memory
    for _ in range(size):
        leak.append('x' * 1024 * 1024)  # 1MB chunks
    
    # Keep reference to prevent GC
    app.config['memory_leak'] = leak
    
    return jsonify({'message': f'Allocated {size}MB'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
