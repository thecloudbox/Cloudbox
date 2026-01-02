FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir \
    flask==3.0.0 \
    prometheus-client==0.19.0 \
    psycopg2-binary==2.9.9 \
    redis==5.0.1

COPY app.py .

EXPOSE 8080

CMD ["python", "app.py"]
