FROM node:lts-alpine as client_build

RUN corepack enable

WORKDIR /app

COPY ./client/package.json ./
COPY ./client/pnpm-lock.yaml ./

RUN pnpm install

COPY ./client .

RUN pnpm build

FROM python:3.11.5-slim as server_build

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY --from=client_build /app/dist /app/client/dist

ENV PORT 8000
ENV ENVIRONMENT "production"

EXPOSE ${PORT}

CMD ["sh", "-c", "fastapi run app/main.py --port $PORT"]
