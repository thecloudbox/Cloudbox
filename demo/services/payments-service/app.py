from flask import Flask, jsonify, request
from prometheus_client import Counter, Histogram, generate_latest
import random
import time
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Prometheus metrics
PAYMENT_COUNT = Counter('payments_total', 'Total payments', ['status'])
PAYMENT_DURATION = Histogram('payments_duration_seconds', 'Payment processing duration')
PAYMENT_AMOUNT = Histogram('payments_amount_dollars', 'Payment amounts')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'payments-service'}), 200

@app.route('/metrics', methods=['GET'])
def metrics():
    return generate_latest()

@app.route('/api/payments/process', methods=['POST'])
@PAYMENT_DURATION.time()
def process_payment():
    try:
        data = request.get_json()
        amount = data.get('amount', 0)
        
        # Simulate payment processing
        processing_time = random.uniform(0.1, 0.5)
        time.sleep(processing_time)
        
        # Random success/failure (95% success rate)
        success = random.random() < 0.95
        
        if success:
            PAYMENT_COUNT.labels(status='success').inc()
            PAYMENT_AMOUNT.observe(amount)
            return jsonify({
                'transaction_id': f'TXN-{random.randint(100000, 999999)}',
                'status': 'completed',
                'amount': amount
            }), 200
        else:
            PAYMENT_COUNT.labels(status='failed').inc()
            return jsonify({'error': 'Payment declined'}), 402
            
    except Exception as e:
        PAYMENT_COUNT.labels(status='error').inc()
        logging.error(f"Payment processing error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/payments/refund', methods=['POST'])
def process_refund():
    try:
        data = request.get_json()
        transaction_id = data.get('transaction_id')
        
        # Simulate refund processing
        time.sleep(random.uniform(0.2, 0.6))
        
        PAYMENT_COUNT.labels(status='refunded').inc()
        
        return jsonify({
            'transaction_id': transaction_id,
            'status': 'refunded'
        }), 200
        
    except Exception as e:
        logging.error(f"Refund processing error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
