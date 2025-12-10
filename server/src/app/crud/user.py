from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import (
  User, 
  TravelerProfile, 
  EditorProfile, 
  CoordinatorProfile, 
  EvacuationAssistantProfile,
  UserRole
)
from app.schemas.user import (
  UserCreate, 
  TravelerCreate,
  EditorCreate,
  CoordinatorCreate,
  EvacuationAssistantCreate
)
from app.core.security import get_password_hash


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
  """Get user by email."""
  result = await db.execute(select(User).where(User.email == email))
  return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: int) -> User | None:
  """Get user by ID."""
  result = await db.execute(select(User).where(User.id == user_id))
  return result.scalar_one_or_none()


async def create_user(db: AsyncSession, user_create: UserCreate) -> User:
  """Create a new user."""
  user = User(
    email=user_create.email,
    password_hash=get_password_hash(user_create.password),
    first_name=user_create.first_name,
    last_name=user_create.last_name,
    role=user_create.role,
  )
  db.add(user)
  await db.commit()
  await db.refresh(user)
  return user


async def create_traveler(db: AsyncSession, traveler_create: TravelerCreate) -> User:
  """Create a new traveler with profile."""
  # Create user
  user = User(
    email=traveler_create.email,
    password_hash=get_password_hash(traveler_create.password),
    first_name=traveler_create.first_name,
    last_name=traveler_create.last_name,
    role=UserRole.TRAVELER,
  )
  db.add(user)
  await db.flush()  # Get user.id without committing
  
  # Create traveler profile
  profile = TravelerProfile(
    user_id=user.id,
    phone_number=traveler_create.traveler_profile.phone_number,
    national_id=traveler_create.traveler_profile.national_id,
  )
  db.add(profile)
  
  await db.commit()
  await db.refresh(user)
  return user


async def create_editor(db: AsyncSession, editor_create: EditorCreate) -> User:
  """Create a new editor with profile."""
  # Create user
  user = User(
    email=editor_create.email,
    password_hash=get_password_hash(editor_create.password),
    first_name=editor_create.first_name,
    last_name=editor_create.last_name,
    role=UserRole.EDITOR,
  )
  db.add(user)
  await db.flush()  # Get user.id without committing
  
  # Create editor profile
  profile = EditorProfile(
    user_id=user.id,
  )
  db.add(profile)
  
  await db.commit()
  await db.refresh(user)
  return user


async def create_coordinator(db: AsyncSession, coordinator_create: CoordinatorCreate) -> User:
  """Create a new coordinator with profile."""
  # Create user
  user = User(
    email=coordinator_create.email,
    password_hash=get_password_hash(coordinator_create.password),
    first_name=coordinator_create.first_name,
    last_name=coordinator_create.last_name,
    role=UserRole.COORDINATOR,
  )
  db.add(user)
  await db.flush()  # Get user.id without committing
  
  # Create coordinator profile
  profile = CoordinatorProfile(
    user_id=user.id,
  )
  db.add(profile)
  
  await db.commit()
  await db.refresh(user)
  return user


async def create_evacuation_assistant(
  db: AsyncSession, 
  assistant_create: EvacuationAssistantCreate
) -> User:
  """Create a new evacuation assistant with profile."""
  # Create user
  user = User(
    email=assistant_create.email,
    password_hash=get_password_hash(assistant_create.password),
    first_name=assistant_create.first_name,
    last_name=assistant_create.last_name,
    role=UserRole.EVACUATION_ASSISTANT,
  )
  db.add(user)
  await db.flush()  # Get user.id without committing
  
  # Create evacuation assistant profile
  profile = EvacuationAssistantProfile(
    user_id=user.id,
    phone_number=assistant_create.evacuation_assistant_profile.phone_number,
    working_hours=assistant_create.evacuation_assistant_profile.working_hours,
  )
  db.add(profile)
  
  await db.commit()
  await db.refresh(user)
  return user


async def get_all_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> list[User]:
  """Get all users with pagination."""
  result = await db.execute(select(User).offset(skip).limit(limit))
  return list[User](result.scalars().all())


async def get_users_by_role(
  db: AsyncSession, 
  role: UserRole, 
  skip: int = 0, 
  limit: int = 100
) -> list[User]:
  """Get users by role with pagination."""
  result = await db.execute(
    select(User).where(User.role == role).offset(skip).limit(limit)
  )
  return list[User](result.scalars().all())


async def update_user(db: AsyncSession, user_id: int, **kwargs) -> User | None:
  """Update user fields."""
  user = await get_user_by_id(db, user_id)
  if not user:
    return None
  
  for key, value in kwargs.items():
    if hasattr(user, key):
      setattr(user, key, value)
  
  await db.commit()
  await db.refresh(user)
  return user


async def delete_user(db: AsyncSession, user_id: int) -> bool:
  """Delete a user (cascades to profile)."""
  user = await get_user_by_id(db, user_id)
  if not user:
    return False
  
  await db.delete(user)
  await db.commit()
  return True
