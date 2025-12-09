import logging
from fastapi import APIRouter

from app.routes.health_router import router as health_router


logger = logging.getLogger(__name__)

api_router = APIRouter()

api_router.include_router(
	health_router,
	prefix="/health",
	tags=["health"]
)

logger.debug("Main API router initialized with sub-routers")