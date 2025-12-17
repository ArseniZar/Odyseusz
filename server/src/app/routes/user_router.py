from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.core.db import get_db
from app.core.dependencies import get_current_active_user
from app.core.security import get_password_hash
from app.crud.user import update_user, delete_user, get_user_by_id, get_user_by_email
from app.crud.refresh_token import revoke_all_user_tokens
from app.models.user import (
	User,
	UserRole,
	TravelerProfile,
	EvacuationAssistantProfile,
)
from app.schemas.user import (
	UserResponse,
	UserUpdate,
	TravelerResponse,
	EditorResponse,
	CoordinatorResponse,
	EvacuationAssistantResponse,
	TravelerProfileUpdate,
	EvacuationAssistantProfileUpdate,
)

router = APIRouter()


@router.get("/me", response_model=UserResponse | TravelerResponse | EditorResponse | CoordinatorResponse | EvacuationAssistantResponse)
async def get_current_user_info(
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
):
	"""Get current user's information with profile based on role."""
	# Reload user with profile relationships
	result = await db.execute(
		select(User)
		.options(
			selectinload(User.traveler_profile),
			selectinload(User.editor_profile),
			selectinload(User.coordinator_profile),
			selectinload(User.evacuation_assistant_profile),
		)
		.where(User.id == current_user.id)
	)
	user = result.scalar_one_or_none()
	
	if not user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="User not found"
		)
	
	# Return appropriate response based on role
	if user.role == UserRole.TRAVELER:
		return TravelerResponse.model_validate(user)
	elif user.role == UserRole.EDITOR:
		return EditorResponse.model_validate(user)
	elif user.role == UserRole.COORDINATOR:
		return CoordinatorResponse.model_validate(user)
	elif user.role == UserRole.EVACUATION_ASSISTANT:
		return EvacuationAssistantResponse.model_validate(user)
	else:
		return UserResponse.model_validate(user)


@router.patch("/me", response_model=UserResponse | TravelerResponse | EditorResponse | CoordinatorResponse | EvacuationAssistantResponse)
async def update_current_user(
	user_update: UserUpdate,
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
):
	"""Update current user's basic information."""
	update_data = user_update.model_dump(exclude_unset=True)
	
	if not update_data:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="No fields to update"
		)
	
	# Handle email update - check for uniqueness
	if "email" in update_data:
		existing_user = await get_user_by_email(db, update_data["email"])
		if existing_user and existing_user.id != current_user.id:
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Email already registered"
			)
	
	# Handle password update - hash the password
	if "password" in update_data:
		update_data["password_hash"] = get_password_hash(update_data.pop("password"))
	
	updated_user = await update_user(db, current_user.id, **update_data)
	if not updated_user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="User not found"
		)
	
	# Reload with profile relationships
	result = await db.execute(
		select(User)
		.options(
			selectinload(User.traveler_profile),
			selectinload(User.editor_profile),
			selectinload(User.coordinator_profile),
			selectinload(User.evacuation_assistant_profile),
		)
		.where(User.id == updated_user.id)
	)
	user = result.scalar_one_or_none()
	
	if not user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="User not found"
		)
	
	# Return appropriate response based on role
	if user.role == UserRole.TRAVELER:
		return TravelerResponse.model_validate(user)
	elif user.role == UserRole.EDITOR:
		return EditorResponse.model_validate(user)
	elif user.role == UserRole.COORDINATOR:
		return CoordinatorResponse.model_validate(user)
	elif user.role == UserRole.EVACUATION_ASSISTANT:
		return EvacuationAssistantResponse.model_validate(user)
	else:
		return UserResponse.model_validate(user)


@router.patch("/me/profile", response_model=TravelerResponse | EvacuationAssistantResponse)
async def update_current_user_profile(
	profile_update: TravelerProfileUpdate | EvacuationAssistantProfileUpdate,
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
):
	"""Update current user's profile (traveler or evacuation assistant only)."""
	if current_user.role not in [UserRole.TRAVELER, UserRole.EVACUATION_ASSISTANT]:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Profile update only available for travelers and evacuation assistants"
		)
	
	update_data = profile_update.model_dump(exclude_unset=True)
	
	if not update_data:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="No fields to update"
		)
	
	# Update profile based on role
	if current_user.role == UserRole.TRAVELER:
		result = await db.execute(
			select(TravelerProfile).where(TravelerProfile.user_id == current_user.id)
		)
		profile = result.scalar_one_or_none()
		if not profile:
			raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail="Traveler profile not found"
			)
		
		for key, value in update_data.items():
			if hasattr(profile, key):
				setattr(profile, key, value)
		
		await db.commit()
		await db.refresh(profile)
		
	elif current_user.role == UserRole.EVACUATION_ASSISTANT:
		result = await db.execute(
			select(EvacuationAssistantProfile).where(EvacuationAssistantProfile.user_id == current_user.id)
		)
		profile = result.scalar_one_or_none()
		if not profile:
			raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail="Evacuation assistant profile not found"
			)
		
		for key, value in update_data.items():
			if hasattr(profile, key):
				setattr(profile, key, value)
		
		await db.commit()
		await db.refresh(profile)
	
	# Reload user with profile relationships
	result = await db.execute(
		select(User)
		.options(
			selectinload(User.traveler_profile),
			selectinload(User.evacuation_assistant_profile),
		)
		.where(User.id == current_user.id)
	)
	user = result.scalar_one_or_none()
	
	if not user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="User not found"
		)
	
	if user.role == UserRole.TRAVELER:
		return TravelerResponse.model_validate(user)
	elif user.role == UserRole.EVACUATION_ASSISTANT:
		return EvacuationAssistantResponse.model_validate(user)
	else:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Unexpected error"
		)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_current_user(
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
):
	"""Delete current user's account and revoke all tokens."""
	# Revoke all refresh tokens
	await revoke_all_user_tokens(db, current_user.id)
	
	# Delete user (cascades to profile)
	success = await delete_user(db, current_user.id)
	if not success:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="User not found"
		)
    