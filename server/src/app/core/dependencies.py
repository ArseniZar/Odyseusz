from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.core.db import get_db
from app.core.security import verify_token
from app.crud.user import get_user_by_id
from app.models.user import User, UserRole, EditorProfile, TravelerProfile
from app.models.country import CountryProfile

security = HTTPBearer()


async def get_current_user(
	credentials: HTTPAuthorizationCredentials = Depends(security),
	db: AsyncSession = Depends(get_db)
) -> User:
	"""Get the current authenticated user from JWT token."""
	credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Could not validate credentials",
		headers={"WWW-Authenticate": "Bearer"},
	)
	
	token = credentials.credentials
	payload = verify_token(token, token_type="access")
	if payload is None:
		raise credentials_exception
	
	user_id: Optional[int] = payload.get("sub")
	if user_id is None:
		raise credentials_exception
	
	user = await get_user_by_id(db, user_id)
	if user is None:
		raise credentials_exception
	
	return user


async def get_current_active_user(
	current_user: User = Depends(get_current_user)
) -> User:
	"""Get the current active user."""
	if not current_user.is_active:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Inactive user"
		)
	return current_user


async def get_current_traveler(
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
) -> TravelerProfile:
	"""Get the current user's traveler profile."""
	if current_user.role != UserRole.TRAVELER:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="User is not a traveler"
		)
	
	result = await db.execute(
		select(TravelerProfile).where(TravelerProfile.user_id == current_user.id)
	)
	traveler_profile = result.scalar_one_or_none()
	
	if not traveler_profile:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Traveler profile not found"
		)
	
	return traveler_profile


async def get_current_editor(
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
) -> EditorProfile:
	"""Get the current user's editor profile."""
	if current_user.role != UserRole.EDITOR:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="User is not an editor"
		)
	
	result = await db.execute(
		select(EditorProfile)
		.options(selectinload(EditorProfile.country_profiles))
		.where(EditorProfile.user_id == current_user.id)
	)
	editor_profile = result.scalar_one_or_none()
	
	if not editor_profile:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Editor profile not found"
		)
	
	return editor_profile


async def verify_editor_country_access(
	country_id: int,
	current_editor: EditorProfile = Depends(get_current_editor),
	db: AsyncSession = Depends(get_db)
) -> CountryProfile:
	"""Verify that the editor has access to the specified country."""
	result = await db.execute(
		select(CountryProfile)
		.options(selectinload(CountryProfile.editors))
		.where(CountryProfile.id == country_id)
	)
	country = result.scalar_one_or_none()
	
	if not country:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Country not found"
		)
	
	if country not in current_editor.country_profiles:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="You do not have access to modify this country"
		)
	
	return country
