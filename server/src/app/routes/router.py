import logging
from fastapi import APIRouter

from app.routes.health_router import router as health_router
from app.routes.auth_router import router as auth_router
from app.routes.country_router import router as country_router
from app.routes.user_router import router as users_router
from app.routes.travel_router import router as travel_router
from app.routes.evacuation_router import router as evacuation_router


logger = logging.getLogger(__name__)

api_router = APIRouter()

api_router.include_router(
	health_router,
	prefix="/health",
	tags=["health"]
)

api_router.include_router(
	users_router,
	prefix="/users",
	tags=["users"]
)

api_router.include_router(
	auth_router,
	prefix="/auth",
	tags=["authentication"]
)

api_router.include_router(
	country_router,
	prefix="/countries",
	tags=["countries"]
)

api_router.include_router(
	travel_router,
	prefix="/travels",
	tags=["travels"]
)

api_router.include_router(
	evacuation_router,
	prefix="/evacuations",
	tags=["evacuations"]
)

logger.debug("Main API router initialized with sub-routers")
