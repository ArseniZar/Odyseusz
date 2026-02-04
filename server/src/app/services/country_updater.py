import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.country import get_all_country_profiles, update_country_profile
from app.services.external_api_client import external_api_client
from app.schemas.country import CountryProfileUpdate

logger = logging.getLogger(__name__)


async def update_country_danger_levels(db: AsyncSession) -> dict:
	"""
	Update danger levels for all countries using external API.
	Returns statistics about the update process.
	"""
	stats = {
		"total": 0,
		"updated": 0,
		"not_found": 0,
		"errors": 0,
		"skipped": 0
	}
	
	try:
		# Get all countries from our database
		countries = await get_all_country_profiles(db, skip=0, limit=10000)
		stats["total"] = len(countries)
		
		logger.info(f"Starting danger level update for {stats['total']} countries")
		
		# Get list of countries from external API
		api_countries = await external_api_client.get_countries()
		api_country_map = {}
		
		# Create a map of country names/codes from external API
		for api_country in api_countries:
			if isinstance(api_country, dict):
				country_id = api_country.get("id", "").upper()
				name = api_country.get("name", "").lower()
				if country_id:
					api_country_map[country_id] = api_country
				if name:
					api_country_map[name] = api_country
		
		# Update each country
		for country in countries:
			try:
				# Try to find matching country in external API by code or name
				country_name_lower = country.name.lower()
				country_code_upper = country.country_code.upper()
				
				api_data = None
				
				# First try by country code
				if country_code_upper in api_country_map:
					api_data = api_country_map[country_code_upper]
				# Then try by name
				elif country_name_lower in api_country_map:
					api_data = api_country_map[country_name_lower]
				else:
					# Try to find by searching in the list
					for api_country in api_countries:
						if isinstance(api_country, dict):
							api_name = api_country.get("name", "").lower()
							api_code = api_country.get("id", "").upper()
							if api_name == country_name_lower or api_code == country_code_upper:
								api_data = api_country
								break
				
				# If we found a match, update the danger level
				if api_data:
					new_danger_level = api_data.get("danger")
					
					if new_danger_level:
						# Only update if danger level changed
						if country.danger_level != new_danger_level:
							await update_country_profile(
								db,
								country.id,
								CountryProfileUpdate(danger_level=new_danger_level)
							)
							stats["updated"] += 1
							logger.info(f"Updated {country.name}: {country.danger_level} -> {new_danger_level}")
						else:
							stats["skipped"] += 1
					else:
						stats["skipped"] += 1
						logger.warning(f"No danger level for {country.name}")
				else:
					stats["not_found"] += 1
					logger.warning(f"Could not match {country.name} with external API countries")
			
			except Exception as e:
				stats["errors"] += 1
				logger.error(f"Error updating country {country.name}: {e}", exc_info=True)
		
		logger.info(f"Danger level update completed. Stats: {stats}")
		return stats
	
	except Exception as e:
		logger.error(f"Error in update_country_danger_levels: {e}", exc_info=True)
		raise
