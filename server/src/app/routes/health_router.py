import logging
from fastapi import APIRouter

from app.core.db import db_manager
from app.core.config import settings
from app.schemas.health import HealthResponse, DatabaseHealthResponse

logger = logging.getLogger(__name__)

router = APIRouter(tags=["health"])


@router.get("/", response_model=HealthResponse)
async def health():
  logger.debug("Health endpoint accessed")
  return {
    "status": "ok",
    "version": settings.VERSION, 
    "debug": settings.DEBUG,
  }


@router.get("/db", response_model=DatabaseHealthResponse)
async def database_health():
  logger.debug("Database health endpoint accessed")
  is_healthy = await db_manager.health_check()
  return {
    "status": "healthy" if is_healthy else "unhealthy"
  }
	