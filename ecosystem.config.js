module.exports = {
  apps: [
    {
      name: "ai-fastapi",
      script: "venv/bin/python",
      args: "-m fastapi run app/main.py --port 8000",
      env: {
        ENVIRONMENT: "production",
      },
    },
  ],
};
