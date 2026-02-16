from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.country import CountryProfile, Consulate
from app.schemas.country import (
  CountryProfileCreate,
  CountryProfileUpdate,
  CountryProfileDangerLevelUpdate,
  ConsulateCreate,
  ConsulateUpdate
)


# CountryProfile CRUD
async def get_country_profile_by_id(
  db: AsyncSession, 
  country_id: int
) -> CountryProfile | None:
  """Get country profile by ID."""
  result = await db.execute(
    select(CountryProfile).where(CountryProfile.id == country_id)
  )
  return result.scalar_one_or_none()


async def get_country_profile_by_name(
  db: AsyncSession, 
  name: str
) -> CountryProfile | None:
  """Get country profile by name."""
  result = await db.execute(
    select(CountryProfile).where(CountryProfile.name == name)
  )
  return result.scalar_one_or_none()


async def get_country_profile_with_details(
  db: AsyncSession, 
  country_id: int
) -> CountryProfile | None:
  """Get country profile with consulates loaded."""
  result = await db.execute(
    select(CountryProfile)
    .options(selectinload(CountryProfile.consulates))
    .where(CountryProfile.id == country_id)
  )
  return result.scalar_one_or_none()


async def get_all_country_profiles(
  db: AsyncSession, 
  skip: int = 0, 
  limit: int = 100
) -> list[CountryProfile]:
  """Get all country profiles with consulates loaded."""
  result = await db.execute(
    select(CountryProfile)
    .options(selectinload(CountryProfile.consulates))
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def get_editor_country_profiles(
  db: AsyncSession,
  editor_id: int,
  skip: int = 0,
  limit: int = 100
) -> list[CountryProfile]:
  """Get country profiles that an editor has access to."""
  from app.models.user import EditorProfile
  
  result = await db.execute(
    select(EditorProfile)
    .options(selectinload(EditorProfile.country_profiles).selectinload(CountryProfile.consulates))
    .where(EditorProfile.id == editor_id)
  )
  editor = result.scalar_one_or_none()
  
  if not editor:
    return []
  
  # Return the editor's country profiles with pagination applied
  countries = editor.country_profiles[skip:skip + limit]
  return countries


async def get_country_profiles_by_danger_level(
  db: AsyncSession,
  danger_level: str,
  skip: int = 0,
  limit: int = 100
) -> list[CountryProfile]:
  """Get country profiles by danger level."""
  result = await db.execute(
    select(CountryProfile)
    .where(CountryProfile.danger_level == danger_level)
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def create_country_profile(
  db: AsyncSession, 
  country_create: CountryProfileCreate
) -> CountryProfile:
  """Create a new country profile."""
  country = CountryProfile(
    name=country_create.name,
    country_code=country_create.country_code,
    description=country_create.description,
    danger_level=country_create.danger_level,
  )
  db.add(country)
  await db.commit()
  await db.refresh(country)
  return country


async def update_country_profile(
  db: AsyncSession,
  country_id: int,
  country_update: CountryProfileUpdate | CountryProfileDangerLevelUpdate
) -> CountryProfile | None:
  """Update country profile with full replacement (PUT) or danger level update."""
  country = await get_country_profile_with_details(db, country_id)
  if not country:
    return None

  # Check if this is a danger level update
  if isinstance(country_update, CountryProfileDangerLevelUpdate):
    country.danger_level = country_update.danger_level.value
    await db.commit()
    return await get_country_profile_with_details(db, country_id)
  
  # Otherwise, it's a full profile update
  # Update description
  country.description = country_update.description
  
  # Clear existing consulate associations
  country.consulates.clear()
  await db.flush()
  
  # Add new consulate associations
  if country_update.consulate_ids:
    for consulate_id in country_update.consulate_ids:
      consulate = await get_consulate_by_id(db, consulate_id)
      if consulate:
        country.consulates.append(consulate)

  await db.commit()
  
  # Reload with full details
  return await get_country_profile_with_details(db, country_id)


async def delete_country_profile(db: AsyncSession, country_id: int) -> bool:
  """Delete a country profile."""
  country = await get_country_profile_by_id(db, country_id)
  if not country:
    return False

  await db.delete(country)
  await db.commit()
  return True


# Consulate CRUD
async def get_all_consulates(
  db: AsyncSession,
  skip: int = 0,
  limit: int = 1000
) -> list[Consulate]:
  """Get all consulates."""
  result = await db.execute(
    select(Consulate).offset(skip).limit(limit)
  )
  return list(result.scalars().all())


async def get_consulate_by_id(
  db: AsyncSession, 
  consulate_id: int
) -> Consulate | None:
  """Get consulate by ID."""
  result = await db.execute(
    select(Consulate).where(Consulate.id == consulate_id)
  )
  return result.scalar_one_or_none()


async def create_consulate(
  db: AsyncSession, 
  consulate_create: ConsulateCreate
) -> Consulate:
  """Create a new consulate."""
  consulate = Consulate(
    country_profile_id=consulate_create.country_profile_id,
    address=consulate_create.address,
    email=consulate_create.email,
    phone_number=consulate_create.phone_number,
    website=consulate_create.website,
  )
  db.add(consulate)
  await db.commit()
  await db.refresh(consulate)
  return consulate


async def update_consulate(
  db: AsyncSession,
  consulate_id: int,
  consulate_update: ConsulateUpdate
) -> Consulate | None:
  """Update consulate."""
  consulate = await get_consulate_by_id(db, consulate_id)
  if not consulate:
    return None

  update_data = consulate_update.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(consulate, key, value)

  await db.commit()
  await db.refresh(consulate)
  return consulate


async def delete_consulate(db: AsyncSession, consulate_id: int) -> bool:
  """Delete a consulate."""
  consulate = await get_consulate_by_id(db, consulate_id)
  if not consulate:
    return False

  await db.delete(consulate)
  await db.commit()
  return True


# Association operations
async def link_editor_to_country(
  db: AsyncSession,
  editor_id: int,
  country_id: int
) -> bool:
  """Link an editor to a country profile."""
  from app.models.user import EditorProfile
  
  editor = await db.execute(
    select(EditorProfile)
    .options(selectinload(EditorProfile.country_profiles))
    .where(EditorProfile.id == editor_id)
  )
  editor = editor.scalar_one_or_none()
  
  country = await get_country_profile_by_id(db, country_id)
  
  if not editor or not country:
    return False
  
  if country not in editor.country_profiles:
    editor.country_profiles.append(country)
    await db.commit()
  
  return True


async def unlink_editor_from_country(
  db: AsyncSession,
  editor_id: int,
  country_id: int
) -> bool:
  """Unlink an editor from a country profile."""
  from app.models.user import EditorProfile
  
  editor = await db.execute(
    select(EditorProfile)
    .options(selectinload(EditorProfile.country_profiles))
    .where(EditorProfile.id == editor_id)
  )
  editor = editor.scalar_one_or_none()
  
  country = await get_country_profile_by_id(db, country_id)
  
  if not editor or not country:
    return False
  
  if country in editor.country_profiles:
    editor.country_profiles.remove(country)
    await db.commit()
  
  return True
  