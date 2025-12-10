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
  """Get evacuation with areas and assembly points loaded."""
  result = await db.execute(
    select(Evacuation)
    .options(
      selectinload(Evacuation.areas),
      selectinload(Evacuation.assembly_points)
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
  """Get all evacuations with pagination."""
  query = select(Evacuation)
  
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
  """Get evacuations by coordinator."""
  result = await db.execute(
    select(Evacuation)
    .where(Evacuation.coordinator_id == coordinator_id)
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def create_evacuation(
  db: AsyncSession, 
  evacuation_create: EvacuationCreate
) -> Evacuation:
  """Create a new evacuation."""
  evacuation = Evacuation(
    name=evacuation_create.name,
    reason=evacuation_create.reason,
    description=evacuation_create.description,
    active=evacuation_create.active,
    coordinator_id=evacuation_create.coordinator_id,
  )
  db.add(evacuation)
  await db.commit()
  await db.refresh(evacuation)
  return evacuation


async def update_evacuation(
  db: AsyncSession,
  evacuation_id: int,
  evacuation_update: EvacuationUpdate
) -> Evacuation | None:
  """Update evacuation."""
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  if not evacuation:
    return None

  update_data = evacuation_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(evacuation, key, value)

  await db.commit()
  await db.refresh(evacuation)
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
  