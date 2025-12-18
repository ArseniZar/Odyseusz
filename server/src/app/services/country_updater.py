import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.country import get_all_country_profiles, update_country_profile
from app.services.tugo_client import tugo_client
from app.schemas.country import CountryProfileUpdate

logger = logging.getLogger(__name__)


async def update_country_danger_levels(db: AsyncSession) -> dict:
	"""
	Update danger levels for all countries using TuGo API.
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
		
		# Get list of countries from TuGo API to map names/codes
		tugo_countries = await tugo_client.get_countries()
		tugo_country_map = {}
		
		# Create a map of country names/codes from TuGo
		for tugo_country in tugo_countries:
			if isinstance(tugo_country, dict):
				code = tugo_country.get("id", "").upper()
				name = tugo_country.get("name", "").lower()
				if code:
					tugo_country_map[code] = tugo_country
				if name:
					tugo_country_map[name] = tugo_country
		
		# Update each country
		for country in countries:
			try:
				# Try to find matching country in TuGo by name or code
				country_name_lower = country.name.lower()
				
				# Try to get country data from TuGo
				tugo_data = None
				country_code = None
				
				# First try by name
				if country_name_lower in tugo_country_map:
					tugo_data = tugo_country_map[country_name_lower]
					country_code = tugo_data.get("code", "")
				else:
					# Try to find by searching in the list
					for tugo_country in tugo_countries:
						if isinstance(tugo_country, dict):
							tugo_name = tugo_country.get("name", "").lower()
							if tugo_name == country_name_lower:
								tugo_data = tugo_country
								country_code = tugo_data.get("code", "")
								break
				
				# If we found a match, fetch detailed data
				if country_code:
					detailed_data = await tugo_client.get_country(country_code)
					if detailed_data:
						# advisoryState is a numeric value (0, 1, 2, 3)
						advisory_state = detailed_data.get("advisoryState")
						
						# Check if advisoryState exists (it can be 0, which is falsy but valid)
						if advisory_state is not None:
							new_danger_level = tugo_client.map_advisory_state_to_danger_level(advisory_state)
							
							# Only update if danger level changed
							if country.danger_level != new_danger_level:
								await update_country_profile(
									db,
									country.id,
									CountryProfileUpdate(danger_level=new_danger_level)
								)
								stats["updated"] += 1
								logger.info(f"Updated {country.name}: {country.danger_level} -> {new_danger_level} (advisoryState: {advisory_state})")
							else:
								stats["skipped"] += 1
						else:
							stats["skipped"] += 1
							logger.warning(f"No advisoryState for {country.name}")
					else:
						stats["not_found"] += 1
						logger.warning(f"Country {country.name} (code: {country_code}) not found in TuGo API")
				else:
					stats["not_found"] += 1
					logger.warning(f"Could not match {country.name} with TuGo countries")
			
			except Exception as e:
				stats["errors"] += 1
				logger.error(f"Error updating country {country.name}: {e}", exc_info=True)
		
		logger.info(f"Danger level update completed. Stats: {stats}")
		return stats
	
	except Exception as e:
		logger.error(f"Error in update_country_danger_levels: {e}", exc_info=True)
		raise
