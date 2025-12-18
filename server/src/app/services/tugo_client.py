import logging
from typing import Optional
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)


class TuGoClient:
	"""Client for interacting with TuGo TravelSafe API."""
	
	def __init__(self):
		self.base_url = settings.TUGO_API_BASE_URL
		self.api_key = settings.TUGO_API_KEY
		self.headers = {
			"X-Auth-API-Key": self.api_key,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	
	async def get_countries(self) -> list[dict]:
		"""Get list of all countries from TuGo API."""
		async with httpx.AsyncClient(timeout=120.0) as client:
			try:
				response = await client.get(
					f"{self.base_url}/countries",
					headers=self.headers
				)
				response.raise_for_status()
				return response.json()
			except httpx.HTTPError as e:
				logger.error(f"Error fetching countries from TuGo API: {e}")
				raise
	
	async def get_country(self, country_code: str) -> Optional[dict]:
		"""Get country information by ISO code."""
		async with httpx.AsyncClient(timeout=120.0) as client:
			try:
				response = await client.get(
					f"{self.base_url}/countries/{country_code}",
					headers=self.headers
				)
				if response.status_code == 404:
					return None
				response.raise_for_status()
				return response.json()
			except httpx.HTTPError as e:
				logger.error(f"Error fetching country {country_code} from TuGo API: {e}")
				return None
	
	def map_advisory_state_to_danger_level(self, advisory_state: int) -> str:
		"""
		Map TuGo numeric advisoryState to our danger level.
		
		TuGo advisoryState values:
		- 0 = Exercise normal security precautions -> LOW
		- 1 = Exercise a high degree of caution -> MODERATE
		- 2 = Avoid non-essential travel -> HIGH
		- 3 = Avoid all travel -> SEVERE
		"""
		mapping = {
			0: "low",      # Exercise normal security precautions
			1: "moderate", # Exercise a high degree of caution
			2: "high",     # Avoid non-essential travel
			3: "severe",   # Avoid all travel
		}
		
		if advisory_state in mapping:
			return mapping[advisory_state]
		else:
			# Default to moderate if we get an unexpected value
			logger.warning(f"Unknown advisory state value: {advisory_state}, defaulting to moderate")
			return "moderate"


tugo_client = TuGoClient()
