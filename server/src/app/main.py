import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import db_lifespan_context
from app.routes.router import api_router

logging.basicConfig(
	level=logging.DEBUG if settings.DEBUG else logging.INFO,
	format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
	datefmt="%Y-%m-%d %H:%M:%S",
	force=True
)

logging.getLogger('sqlalchemy').setLevel(logging.WARNING)
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)
logging.getLogger('aiosqlite').setLevel(logging.WARNING)
logging.getLogger('uvicorn.access').setLevel(logging.WARNING)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
	logger.info("Starting application lifespan")
	async with db_lifespan_context():
		logger.info("Database context initialized")
		try:
			yield
		finally:
			logger.info("Stopping application lifespan")
				

app = FastAPI(
	title=settings.PROJECT_NAME,
	version=settings.VERSION,
	lifespan=lifespan,
	debug=settings.DEBUG
)

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_PREFIX)

logger.info(f"FastAPI application configured (Debug: {settings.DEBUG})")


def main():
	uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
