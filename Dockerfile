FROM node:22-alpine AS client_build

RUN corepack enable

WORKDIR /app

# Copy package files for dependency installation
COPY client/package.json client/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy the rest of the client code
COPY client .

RUN pnpm build

FROM python:3.13.5-slim-bullseye AS server_build

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-dev

COPY . .
COPY --from=client_build /app/dist /app/client/dist

ENV PORT=8000
ENV ENVIRONMENT=production

EXPOSE ${PORT}

CMD ["uv", "run", "fastapi", "run", "app/main.py"]
