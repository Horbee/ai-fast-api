module.exports = {
  apps: [
    {
      name: "ai-fast-api",
      script: "poetry",
      args: "run fastapi run app/main.py --port 8000",
      env: {
        ENVIRONMENT: "production",
        PERSP_API_KEY: "",
      },
    },
  ],
};
