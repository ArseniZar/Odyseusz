from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import text

from contextlib import asynccontextmanager
import logging
from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

logger = logging.getLogger(__name__)


class Base(DeclarativeBase):
	"""Base class for all database models."""
	pass


class DatabaseManager:
	"""Manages PostgreSQL database connections and sessions."""
	
	def __init__(self):
		self._engine: Optional[AsyncEngine] = None
		self._session_factory: Optional[async_sessionmaker[AsyncSession]] = None
	
	def _get_database_url(self) -> str:
		"""Construct database URL from settings."""
		if settings.USE_SQLITE:
			return "sqlite+aiosqlite:///./odysseus.db"
		else:	
			return f"postgresql+asyncpg://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
	
	async def initialize(self) -> None:
		"""Initialize the database engine and session factory."""
		if self._engine is not None:
			logger.debug("Database engine already initialized")
			return
		
		database_url = self._get_database_url()
		
		if settings.USE_SQLITE:
			logger.debug("Initializing SQLite database")
		else:
			logger.debug(f"Initializing database connection to {settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}")
		
		engine_kwargs = {
			"echo": False,
		}
		
		if settings.USE_SQLITE:
			engine_kwargs["connect_args"] = {"check_same_thread": False}
		else:
			engine_kwargs["pool_pre_ping"] = True
		
		self._engine = create_async_engine(database_url, **engine_kwargs)
		
		self._session_factory = async_sessionmaker[AsyncSession](
			bind=self._engine,
			expire_on_commit=False,
		)
		
		logger.info("Database engine initialized successfully")
	
	async def close(self) -> None:
		"""Close the database engine."""
		if self._engine:
			logger.debug("Closing database engine")
			await self._engine.dispose()
			self._engine = None
			self._session_factory = None
			logger.info("Database engine closed")
	
	@asynccontextmanager
	async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
		"""Get an async database session."""
		if not self._session_factory:
			await self.initialize()
		
		logger.debug("Creating new database session")
		async with self._session_factory() as session:
			try:
				yield session
				logger.debug("Database session completed successfully")
			except Exception as e:
				logger.error(f"Database session error: {e}")
				await session.rollback()
				raise
	
	async def health_check(self) -> bool:
		"""Check if the database connection is healthy."""
		try:
			logger.debug("Performing database health check")
			async with self.get_session() as session:
				result = await session.execute(text("SELECT 1"))
				is_healthy = result.scalar() == 1
				
				if is_healthy:
					logger.debug("Database health check passed")
				else:
					logger.warning("Database health check failed: unexpected result")
				
				return is_healthy
		except Exception as e:
			logger.error(f"Database health check failed: {e}")
			return False
	
	async def create_tables(self) -> None:
		"""Create all database tables."""
		if not self._engine:
			await self.initialize()
		
		logger.info("Creating database tables...")
		async with self._engine.begin() as conn:
			await conn.run_sync(Base.metadata.create_all)
		logger.info("Database tables created successfully")


from app.models import *

db_manager = DatabaseManager()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
	"""FastAPI dependency for getting database sessions."""
	async with db_manager.get_session() as session:
		yield session


@asynccontextmanager
async def db_lifespan_context():
	"""Context manager for database lifespan events."""
	logger.info("Starting database initialization")
	await db_manager.initialize()
	
	await db_manager.create_tables()
	
	is_healthy = await db_manager.health_check()
	if not is_healthy:
		logger.critical("Database health check failed during startup")
		raise RuntimeError("Database health check failed")
	
	logger.info("Database connection established successfully")
	
	try:
		yield
	finally:
		logger.info("Shutting down database connection")
		await db_manager.close()
