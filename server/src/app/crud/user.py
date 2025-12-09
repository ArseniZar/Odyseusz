from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User, TravelerProfile, UserRole
from app.schemas.user import UserCreate, TravelerCreate
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
