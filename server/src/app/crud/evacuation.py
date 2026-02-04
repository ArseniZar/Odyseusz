from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.evacuation import Evacuation, EvacuationArea, AssemblyPoint
from app.schemas.evacuation import (
  EvacuationCreate,
  EvacuationUpdate,
  EvacuationAreaCreate,
  EvacuationAreaUpdate,
  AssemblyPointCreate,
  AssemblyPointUpdate
)


# Evacuation CRUD
async def get_evacuation_by_id(
  db: AsyncSession, 
  evacuation_id: int
) -> Evacuation | None:
  """Get evacuation by ID."""
  result = await db.execute(
    select(Evacuation).where(Evacuation.id == evacuation_id)
  )
  return result.scalar_one_or_none()


async def get_evacuation_with_details(
  db: AsyncSession, 
  evacuation_id: int
) -> Evacuation | None:
  """Get evacuation with areas, assembly points, and assistants loaded."""
  from app.models.evacuation import EvacuationArea, AssemblyPoint
  
  result = await db.execute(
    select(Evacuation)
    .options(
      selectinload(Evacuation.areas).selectinload(EvacuationArea.location),
      selectinload(Evacuation.assembly_points).selectinload(AssemblyPoint.location),
      selectinload(Evacuation.assistants)
    )
    .where(Evacuation.id == evacuation_id)
  )
  return result.scalar_one_or_none()


async def get_all_evacuations(
  db: AsyncSession, 
  skip: int = 0, 
  limit: int = 100,
  active_only: bool = False
) -> list[Evacuation]:
  """Get all evacuations with areas, assembly points, and assistants loaded."""
  from app.models.evacuation import EvacuationArea, AssemblyPoint
  
  query = select(Evacuation).options(
    selectinload(Evacuation.areas).selectinload(EvacuationArea.location),
    selectinload(Evacuation.assembly_points).selectinload(AssemblyPoint.location),
    selectinload(Evacuation.assistants)
  )
  
  if active_only:
    query = query.where(Evacuation.active == True)
  
  result = await db.execute(query.offset(skip).limit(limit))
  return list(result.scalars().all())


async def get_evacuations_by_coordinator(
  db: AsyncSession,
  coordinator_id: int,
  skip: int = 0,
  limit: int = 100
) -> list[Evacuation]:
  """Get evacuations by coordinator with areas, assembly points, and assistants loaded."""
  from app.models.evacuation import EvacuationArea, AssemblyPoint
  
  result = await db.execute(
    select(Evacuation)
    .options(
      selectinload(Evacuation.areas).selectinload(EvacuationArea.location),
      selectinload(Evacuation.assembly_points).selectinload(AssemblyPoint.location),
      selectinload(Evacuation.assistants)
    )
    .where(Evacuation.coordinator_id == coordinator_id)
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def create_evacuation(
  db: AsyncSession, 
  evacuation_create: EvacuationCreate
) -> Evacuation:
  """Create a new evacuation with areas, assembly points, and assistants."""
  from app.models.location import Location
  from datetime import datetime, timezone
  
  # Create the evacuation
  evacuation = Evacuation(
    name=evacuation_create.name,
    reason=evacuation_create.reason,
    description=evacuation_create.description,
    active=evacuation_create.active,
    coordinator_id=evacuation_create.coordinator_id,
    last_active_at=datetime.now(timezone.utc) if evacuation_create.active else None,
  )
  db.add(evacuation)
  await db.flush()  # Flush to get the evacuation ID
  
  # Create areas with locations
  for area_data in evacuation_create.areas:
    # Create or find location
    location = Location(
      latitude=area_data.latitude,
      longitude=area_data.longitude
    )
    db.add(location)
    await db.flush()  # Get location ID
    
    area = EvacuationArea(
      evacuation_id=evacuation.id,
      location_id=location.id,
      radius=area_data.radius,
    )
    db.add(area)
  
  # Create assembly points with locations
  for point_data in evacuation_create.assembly_points:
    # Create or find location
    location = Location(
      latitude=point_data.latitude,
      longitude=point_data.longitude
    )
    db.add(location)
    await db.flush()  # Get location ID
    
    point = AssemblyPoint(
      evacuation_id=evacuation.id,
      location_id=location.id,
      name=point_data.name,
      description=point_data.description,
    )
    db.add(point)
  
  # Link assistants
  if evacuation_create.assistant_ids:
    from app.models.user import EvacuationAssistantProfile
    
    for assistant_id in evacuation_create.assistant_ids:
      assistant = await db.execute(
        select(EvacuationAssistantProfile)
        .options(selectinload(EvacuationAssistantProfile.evacuations))
        .where(EvacuationAssistantProfile.id == assistant_id)
      )
      assistant = assistant.scalar_one_or_none()
      if assistant:
        assistant.evacuations.append(evacuation)
  
  await db.commit()
  await db.refresh(evacuation, ["areas", "assembly_points", "assistants"])
  return evacuation


async def update_evacuation(
  db: AsyncSession,
  evacuation_id: int,
  evacuation_update: EvacuationUpdate
) -> Evacuation | None:
  """Update evacuation with full replacement of related entities."""
  from app.models.location import Location
  from app.models.user import EvacuationAssistantProfile
  from datetime import datetime, timezone
  
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  if not evacuation:
    return None

  # Check if active status is changing from False to True
  was_inactive = not evacuation.active
  will_be_active = evacuation_update.active
  
  # Update basic fields
  evacuation.name = evacuation_update.name
  evacuation.reason = evacuation_update.reason
  evacuation.description = evacuation_update.description
  evacuation.active = evacuation_update.active
  
  # Update last_active_at when activating
  if was_inactive and will_be_active:
    evacuation.last_active_at = datetime.now(timezone.utc)
  
  # Delete existing areas
  await db.execute(
    select(EvacuationArea).where(EvacuationArea.evacuation_id == evacuation_id)
  )
  for area in evacuation.areas:
    await db.delete(area)
  await db.flush()
  
  # Delete existing assembly points
  for point in evacuation.assembly_points:
    await db.delete(point)
  await db.flush()
  
  # Clear existing assistants
  evacuation.assistants.clear()
  await db.flush()
  
  # Create new areas
  for area_data in evacuation_update.areas:
    location = Location(
      latitude=area_data.latitude,
      longitude=area_data.longitude
    )
    db.add(location)
    await db.flush()
    
    area = EvacuationArea(
      evacuation_id=evacuation.id,
      location_id=location.id,
      radius=area_data.radius,
    )
    db.add(area)
  
  # Create new assembly points
  for point_data in evacuation_update.assembly_points:
    location = Location(
      latitude=point_data.latitude,
      longitude=point_data.longitude
    )
    db.add(location)
    await db.flush()
    
    point = AssemblyPoint(
      evacuation_id=evacuation.id,
      location_id=location.id,
      name=point_data.name,
      description=point_data.description,
    )
    db.add(point)
  
  # Link new assistants
  if evacuation_update.assistant_ids:
    for assistant_id in evacuation_update.assistant_ids:
      assistant = await db.execute(
        select(EvacuationAssistantProfile)
        .options(selectinload(EvacuationAssistantProfile.evacuations))
        .where(EvacuationAssistantProfile.id == assistant_id)
      )
      assistant = assistant.scalar_one_or_none()
      if assistant:
        assistant.evacuations.append(evacuation)

  await db.commit()
  await db.refresh(evacuation, ["areas", "assembly_points", "assistants"])
  return evacuation


async def delete_evacuation(db: AsyncSession, evacuation_id: int) -> bool:
  """Delete an evacuation."""
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  if not evacuation:
    return False

  await db.delete(evacuation)
  await db.commit()
  return True


# EvacuationArea CRUD
async def get_evacuation_area_by_id(
  db: AsyncSession, 
  area_id: int
) -> EvacuationArea | None:
  """Get evacuation area by ID."""
  result = await db.execute(
    select(EvacuationArea).where(EvacuationArea.id == area_id)
  )
  return result.scalar_one_or_none()


async def get_evacuation_areas_by_evacuation(
  db: AsyncSession,
  evacuation_id: int
) -> list[EvacuationArea]:
  """Get all areas for an evacuation."""
  result = await db.execute(
    select(EvacuationArea)
    .where(EvacuationArea.evacuation_id == evacuation_id)
  )
  return list(result.scalars().all())


async def create_evacuation_area(
  db: AsyncSession, 
  area_create: EvacuationAreaCreate
) -> EvacuationArea:
  """Create a new evacuation area."""
  area = EvacuationArea(
    evacuation_id=area_create.evacuation_id,
    location_id=area_create.location_id,
    radius=area_create.radius,
  )
  db.add(area)
  await db.commit()
  await db.refresh(area)
  return area


async def update_evacuation_area(
  db: AsyncSession,
  area_id: int,
  area_update: EvacuationAreaUpdate
) -> EvacuationArea | None:
  """Update evacuation area."""
  area = await get_evacuation_area_by_id(db, area_id)
  if not area:
    return None

  update_data = area_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(area, key, value)

  await db.commit()
  await db.refresh(area)
  return area


async def delete_evacuation_area(db: AsyncSession, area_id: int) -> bool:
  """Delete an evacuation area."""
  area = await get_evacuation_area_by_id(db, area_id)
  if not area:
    return False

  await db.delete(area)
  await db.commit()
  return True


# AssemblyPoint CRUD
async def get_assembly_point_by_id(
  db: AsyncSession, 
  point_id: int
) -> AssemblyPoint | None:
  """Get assembly point by ID."""
  result = await db.execute(
    select(AssemblyPoint).where(AssemblyPoint.id == point_id)
  )
  return result.scalar_one_or_none()


async def get_assembly_points_by_evacuation(
  db: AsyncSession,
  evacuation_id: int
) -> list[AssemblyPoint]:
  """Get all assembly points for an evacuation."""
  result = await db.execute(
    select(AssemblyPoint)
    .where(AssemblyPoint.evacuation_id == evacuation_id)
  )
  return list(result.scalars().all())


async def create_assembly_point(
  db: AsyncSession, 
  point_create: AssemblyPointCreate
) -> AssemblyPoint:
  """Create a new assembly point."""
  point = AssemblyPoint(
    evacuation_id=point_create.evacuation_id,
    location_id=point_create.location_id,
    name=point_create.name,
    description=point_create.description,
  )
  db.add(point)
  await db.commit()
  await db.refresh(point)
  return point


async def update_assembly_point(
  db: AsyncSession,
  point_id: int,
  point_update: AssemblyPointUpdate
) -> AssemblyPoint | None:
  """Update assembly point."""
  point = await get_assembly_point_by_id(db, point_id)
  if not point:
    return None

  update_data = point_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(point, key, value)

  await db.commit()
  await db.refresh(point)
  return point


async def delete_assembly_point(db: AsyncSession, point_id: int) -> bool:
  """Delete an assembly point."""
  point = await get_assembly_point_by_id(db, point_id)
  if not point:
    return False

  await db.delete(point)
  await db.commit()
  return True


# Get all assistants
async def get_all_assistants(
  db: AsyncSession,
  skip: int = 0,
  limit: int = 1000
) -> list:
  """Get all evacuation assistants."""
  from app.models.user import EvacuationAssistantProfile
  
  result = await db.execute(
    select(EvacuationAssistantProfile)
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


# Association operations
async def link_assistant_to_evacuation(
  db: AsyncSession,
  assistant_id: int,
  evacuation_id: int
) -> bool:
  """Link an evacuation assistant to an evacuation."""
  from app.models.user import EvacuationAssistantProfile
  
  assistant = await db.execute(
    select(EvacuationAssistantProfile)
    .options(selectinload(EvacuationAssistantProfile.evacuations))
    .where(EvacuationAssistantProfile.id == assistant_id)
  )
  assistant = assistant.scalar_one_or_none()
  
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  
  if not assistant or not evacuation:
    return False
  
  if evacuation not in assistant.evacuations:
    assistant.evacuations.append(evacuation)
    await db.commit()
  
  return True


async def unlink_assistant_from_evacuation(
  db: AsyncSession,
  assistant_id: int,
  evacuation_id: int
) -> bool:
  """Unlink an evacuation assistant from an evacuation."""
  from app.models.user import EvacuationAssistantProfile
  
  assistant = await db.execute(
    select(EvacuationAssistantProfile)
    .options(selectinload(EvacuationAssistantProfile.evacuations))
    .where(EvacuationAssistantProfile.id == assistant_id)
  )
  assistant = assistant.scalar_one_or_none()
  
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  
  if not assistant or not evacuation:
    return False
  
  if evacuation in assistant.evacuations:
    assistant.evacuations.remove(evacuation)
    await db.commit()
  
  return True
  