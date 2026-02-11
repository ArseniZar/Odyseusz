import logging
from typing import Optional
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)


class ExternalAPIClient:
  """Client for interacting with external API for country danger levels."""
  
  def __init__(self):
    self.base_url = settings.EXTERNAL_API_BASE_URL
  
  async def get_countries(self) -> list[dict]:
    """Get list of all countries with danger levels from external API."""
    async with httpx.AsyncClient(timeout=30.0) as client:
      try:
        response = await client.get(
          f"{self.base_url}/danger"
        )
        response.raise_for_status()
        return response.json()
      except httpx.HTTPError as e:
        logger.error(f"Error fetching countries from external API: {e}")
        raise
  
  async def get_country(self, country_id: str) -> Optional[dict]:
    """Get country information by ID."""
    try:
      countries = await self.get_countries()
      for country in countries:
        if country.get("id", "").upper() == country_id.upper():
          return country
      return None
    except Exception as e:
      logger.error(f"Error fetching country {country_id} from external API: {e}")
      return None


external_api_client = ExternalAPIClient()
