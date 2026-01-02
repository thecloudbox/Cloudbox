FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir \
    flask==3.0.0 \
    prometheus-client==0.19.0 \
    pika==1.3.2

COPY app.py .

EXPOSE 8080

CMD ["python", "app.py"]
