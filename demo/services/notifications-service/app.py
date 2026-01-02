from flask import Flask, jsonify, request
from prometheus_client import Counter, Histogram, generate_latest
import random
import time
import logging
import pika
import os

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Prometheus metrics
NOTIFICATION_COUNT = Counter('notifications_sent_total', 'Total notifications', ['type', 'status'])
NOTIFICATION_DURATION = Histogram('notifications_duration_seconds', 'Notification delivery duration')

# RabbitMQ connection
RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'rabbitmq')
RABBITMQ_USER = os.getenv('RABBITMQ_USER', 'demo')
RABBITMQ_PASS = os.getenv('RABBITMQ_PASS', 'demo-password')

def get_rabbitmq_connection():
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASS)
    parameters = pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials)
    return pika.BlockingConnection(parameters)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'notifications-service'}), 200

@app.route('/metrics', methods=['GET'])
def metrics():
    return generate_latest()

@app.route('/api/notifications/send', methods=['POST'])
@NOTIFICATION_DURATION.time()
def send_notification():
    try:
        data = request.get_json()
        notification_type = data.get('type', 'email')
        recipient = data.get('recipient')
        message = data.get('message')
        
        if not recipient or not message:
            return jsonify({'error': 'Invalid request'}), 400
        
        # Simulate notification delivery
        delivery_time = random.uniform(0.05, 0.3)
        time.sleep(delivery_time)
        
        # Publish to RabbitMQ
        try:
            connection = get_rabbitmq_connection()
            channel = connection.channel()
            channel.queue_declare(queue='notifications', durable=True)
            channel.basic_publish(
                exchange='',
                routing_key='notifications',
                body=f'{notification_type}:{recipient}:{message}'
            )
            connection.close()
            
            NOTIFICATION_COUNT.labels(type=notification_type, status='sent').inc()
            
            return jsonify({
                'id': f'NOTIF-{random.randint(100000, 999999)}',
                'status': 'sent',
                'type': notification_type
            }), 200
            
        except Exception as e:
            NOTIFICATION_COUNT.labels(type=notification_type, status='failed').inc()
            logging.error(f"RabbitMQ error: {str(e)}")
            return jsonify({'error': 'Failed to queue notification'}), 500
            
    except Exception as e:
        NOTIFICATION_COUNT.labels(type='unknown', status='error').inc()
        logging.error(f"Notification error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
