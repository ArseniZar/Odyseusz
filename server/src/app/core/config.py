from functools import lru_cache
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
	"""Application settings loaded from environment variables."""

	USE_SQLITE: bool = os.getenv("USE_SQLITE", "false").lower() == "true"

	POSTGRES_DB: str = os.getenv("POSTGRES_DB", "db")
	POSTGRES_USER: str = os.getenv("POSTGRES_USER", "user")
	POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "password")
	POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
	POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")

	DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"
	SECRET_KEY: str = os.getenv("SECRET_KEY", "secret")

	PROJECT_NAME: str = "Odysseus Backend"
	VERSION: str = "0.1.0"
	API_PREFIX: str = "/api"


@lru_cache()
def get_settings() -> Settings:
	return Settings()


settings = get_settings()
