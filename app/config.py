from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    environment: str
    persp_api_key: str | None = None
    database_url: str = "sqlite:///database.db"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding='utf-8'
    )


settings = Settings()
