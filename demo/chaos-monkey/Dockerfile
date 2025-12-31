FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY chaos_monkey.py .

CMD ["python", "chaos_monkey.py"]
