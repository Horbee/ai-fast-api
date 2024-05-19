FROM python:3.11.5-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT 8000

EXPOSE ${PORT}

CMD ["sh", "-c", "fastapi run main.py --port $PORT"]
