from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.location import Location
from app.schemas.location import LocationCreate, LocationUpdate


async def get_location_by_id(
  db: AsyncSession, 
  location_id: int
) -> Location | None:
  """Get location by ID."""
  result = await db.execute(
    select(Location).where(Location.id == location_id)
  )
  return result.scalar_one_or_none()


async def get_location_by_coordinates(
  db: AsyncSession,
  latitude: float,
  longitude: float
) -> Location | None:
  """Get location by exact coordinates."""
  result = await db.execute(
    select(Location)
    .where(Location.latitude == latitude)
    .where(Location.longitude == longitude)
  )
  return result.scalar_one_or_none()


async def get_all_locations(
  db: AsyncSession, 
  skip: int = 0, 
  limit: int = 100
) -> list[Location]:
  """Get all locations with pagination."""
  result = await db.execute(
    select(Location).offset(skip).limit(limit)
  )
  return list(result.scalars().all())


async def create_location(
  db: AsyncSession, 
  location_create: LocationCreate
) -> Location:
  """Create a new location."""
  # Check if location with same coordinates already exists
  existing = await get_location_by_coordinates(
    db, 
    location_create.latitude, 
    location_create.longitude
  )
  if existing:
    return existing
  
  location = Location(
    latitude=location_create.latitude,
    longitude=location_create.longitude,
  )
  db.add(location)
  await db.commit()
  await db.refresh(location)
  return location


async def update_location(
  db: AsyncSession,
  location_id: int,
  location_update: LocationUpdate
) -> Location | None:
  """Update location coordinates."""
  location = await get_location_by_id(db, location_id)
  if not location:
    return None

  update_data = location_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(location, key, value)

  await db.commit()
  await db.refresh(location)
  return location


async def delete_location(db: AsyncSession, location_id: int) -> bool:
  """Delete a location."""
  location = await get_location_by_id(db, location_id)
  if not location:
    return False

  await db.delete(location)
  await db.commit()
  return True
  