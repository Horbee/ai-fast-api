# AI FastAPI Project

A modern web application that demonstrates the integration of machine learning models with FastAPI backend and Vue frontend. The project includes multiple ML models for different purposes including comment analysis, rain prediction, and Titanic survival prediction.

## 🚀 Features

- FastAPI backend with multiple ML model endpoints
- Modern Vue.js frontend with TypeScript
- Docker containerization for easy deployment
- UV for Python dependency management
- PNPM for frontend package management
- SQLite database for data persistence

## 🏗️ Project Structure

```
.
├── app/                    # Backend FastAPI application
│   ├── api/               # API endpoints
│   ├── comment_analyser/  # Comment analysis ML model
│   ├── rain_predictor/    # Rain prediction ML model
│   ├── titanic_predictor/ # Titanic survival prediction model
│   ├── main.py           # FastAPI application entry point
│   ├── db.py             # Database configuration
│   └── config.py         # Application configuration
├── client/                # Frontend Vue.js application
│   ├── src/              # Source code
│   ├── dist/             # Production build output
│   └── public/           # Static assets
└── docker-compose.yml    # Docker compose configuration
```

## 🛠️ Prerequisites

- Python 3.8+
- Node.js 16+
- Docker and Docker Compose
- UV (Python package manager)
- PNPM (Node.js package manager)

## 🚀 Getting Started

### Development Setup

1. Install UV:

   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. Install backend dependencies:

   ```bash
   uv sync
   ```

3. Start the backend development server:

   ```bash
   fastapi dev app/main.py
   ```

   For production:

   ```bash
   uv run fastapi run app/main.py
   ```

4. In a new terminal, set up the frontend:
   ```bash
   cd client
   pnpm install
   pnpm dev
   ```

The application will now be running with:

- Backend API at: http://localhost:8000
- Frontend at: http://localhost:5173

### Production Setup

1. Build the frontend:

   ```bash
   cd client
   pnpm install
   pnpm build
   ```

   This will create a production build in the `client/dist` directory.

2. Set the environment variable:

   ```bash
   export ENVIRONMENT=production
   ```

3. Start the production server:
   ```bash
   fastapi run app/main.py
   ```

In production mode, the FastAPI server will serve the static frontend content from the built `dist` directory, making the application available at:

- http://localhost:8000

### Docker Setup

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## 📚 API Documentation

Once the server is running, you can access:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=sqlite:///./database.db
ENVIRONMENT=development  # or 'production' to serve static frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
