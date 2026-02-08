from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.travel import Travel, TravelStage
from app.schemas.travel import (
  TravelCreate,
  TravelStageCreate,
  TravelStageUpdate
)


# Travel CRUD
async def get_travel_by_id(
  db: AsyncSession, 
  travel_id: int
) -> Travel | None:
  """Get travel by ID."""
  result = await db.execute(
    select(Travel).where(Travel.id == travel_id)
  )
  return result.scalar_one_or_none()


async def get_travel_with_stages(
  db: AsyncSession, 
  travel_id: int
) -> Travel | None:
  """Get travel with stages and locations loaded."""
  result = await db.execute(
    select(Travel)
    .options(selectinload(Travel.stages).selectinload(TravelStage.location))
    .where(Travel.id == travel_id)
  )
  return result.scalar_one_or_none()


async def get_travels_by_traveler(
  db: AsyncSession,
  traveler_id: int,
  skip: int = 0,
  limit: int = 100
) -> list[Travel]:
  """Get all travels for a traveler with stages and locations loaded."""
  result = await db.execute(
    select(Travel)
    .options(selectinload(Travel.stages).selectinload(TravelStage.location))
    .where(Travel.traveler_id == traveler_id)
    .order_by(Travel.created_at.desc())
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def create_travel(
	db: AsyncSession,
	travel_create: TravelCreate,
	traveler_id: int
) -> Travel:
	"""Create a new travel with stages and locations."""
	from app.models.location import Location
	
	travel = Travel(
		traveler_id=traveler_id,
		cancelled=travel_create.cancelled,
	)
	db.add(travel)
	await db.flush()
	
	# Create stages with locations
	for stage_data in travel_create.stages:
		# Create location
		location = Location(
			latitude=stage_data.latitude,
			longitude=stage_data.longitude
		)
		db.add(location)
		await db.flush()
		
		# Create stage
		stage = TravelStage(
			travel_id=travel.id,
			location_id=location.id,
			start_date=stage_data.start_date,
			end_date=stage_data.end_date,
			people_count=stage_data.people_count,
		)
		db.add(stage)
	
	await db.commit()
	await db.refresh(travel, ["stages"])
	return travel


async def update_travel(
	db: AsyncSession,
	travel_id: int,
	travel_update
) -> Travel | None:
	"""Update travel with full replacement of stages."""
	from app.models.location import Location
	
	travel = await get_travel_by_id(db, travel_id)
	if not travel:
		return None
	
	# Update cancelled field
	travel.cancelled = travel_update.cancelled
	
	# Delete existing stages
	for stage in travel.stages:
		await db.delete(stage)
	await db.flush()
	
	# Create new stages with locations
	for stage_data in travel_update.stages:
		location = Location(
			latitude=stage_data.latitude,
			longitude=stage_data.longitude
		)
		db.add(location)
		await db.flush()
		
		stage = TravelStage(
			travel_id=travel.id,
			location_id=location.id,
			start_date=stage_data.start_date,
			end_date=stage_data.end_date,
			people_count=stage_data.people_count,
		)
		db.add(stage)
	
	await db.commit()
	await db.refresh(travel, ["stages"])
	return travel


async def delete_travel(db: AsyncSession, travel_id: int) -> bool:
  """Delete a travel (cascades to stages)."""
  travel = await get_travel_by_id(db, travel_id)
  if not travel:
    return False

  await db.delete(travel)
  await db.commit()
  return True


# TravelStage CRUD
async def get_travel_stage_by_id(
  db: AsyncSession, 
  stage_id: int
) -> TravelStage | None:
  """Get travel stage by ID."""
  result = await db.execute(
    select(TravelStage).where(TravelStage.id == stage_id)
  )
  return result.scalar_one_or_none()


async def get_travel_stages_by_travel(
  db: AsyncSession,
  travel_id: int
) -> list[TravelStage]:
  """Get all stages for a travel."""
  result = await db.execute(
    select(TravelStage)
    .where(TravelStage.travel_id == travel_id)
    .order_by(TravelStage.start_date)
  )
  return list(result.scalars().all())


async def get_travel_stages_by_location(
  db: AsyncSession,
  location_id: int,
  skip: int = 0,
  limit: int = 100
) -> list[TravelStage]:
  """Get all travel stages for a specific location."""
  result = await db.execute(
    select(TravelStage)
    .where(TravelStage.location_id == location_id)
    .order_by(TravelStage.start_date.desc())
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def create_travel_stage(
  db: AsyncSession, 
  travel_id: int,
  stage_create: TravelStageCreate
) -> TravelStage:
  """Create a new travel stage."""
  stage = TravelStage(
    travel_id=travel_id,
    location_id=stage_create.location_id,
    start_date=stage_create.start_date,
    end_date=stage_create.end_date,
    people_count=stage_create.people_count,
  )
  db.add(stage)
  await db.commit()
  await db.refresh(stage)
  return stage


async def update_travel_stage(
  db: AsyncSession,
  stage_id: int,
  stage_update: TravelStageUpdate
) -> TravelStage | None:
  """Update travel stage."""
  stage = await get_travel_stage_by_id(db, stage_id)
  if not stage:
    return None

  update_data = stage_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(stage, key, value)

  await db.commit()
  await db.refresh(stage)
  return stage


async def delete_travel_stage(db: AsyncSession, stage_id: int) -> bool:
  """Delete a travel stage."""
  stage = await get_travel_stage_by_id(db, stage_id)
  if not stage:
    return False

  await db.delete(stage)
  await db.commit()
  return True
  