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

# Install poetry
RUN pip install poetry

# Copy poetry files
COPY pyproject.toml poetry.lock ./

# Configure poetry to not create a virtual environment since we're in a container
RUN poetry config virtualenvs.create false

# Install dependencies
RUN poetry install --no-root

COPY . .
COPY --from=client_build /app/dist /app/client/dist

ENV PORT 8000
ENV ENVIRONMENT "production"

EXPOSE ${PORT}

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "${PORT}"]
