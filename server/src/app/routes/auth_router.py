from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.core.security import (
	verify_password,
	create_access_token,
	create_refresh_token,
	verify_token,
)
from app.crud.user import (
	get_user_by_email,
	get_user_by_id,
	create_traveler,
	create_editor,
	create_coordinator,
	create_evacuation_assistant,
)
from app.crud.refresh_token import (
	create_refresh_token as create_refresh_token_db,
	get_refresh_token,
	revoke_refresh_token,
	revoke_all_user_tokens,
)
from app.schemas.user import (
	UserLogin,
	Token,
	TravelerCreate,
	EditorCreate,
	CoordinatorCreate,
	EvacuationAssistantCreate,
)
from app.core.dependencies import get_current_active_user
from app.models.user import User
import logging
router = APIRouter()

logger = logging.getLogger(__name__)

@router.post("/register/traveler", response_model=Token)
async def register_traveler(
	traveler_create: TravelerCreate,
	db: AsyncSession = Depends(get_db)
):
	"""Register a new traveler user."""
	# Check if email already exists
	existing_user = await get_user_by_email(db, traveler_create.email)
	if existing_user:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Email already registered"
		)
	
	# Create traveler
	user = await create_traveler(db, traveler_create)
	
	# Create tokens
	access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
	refresh_token_str = create_refresh_token(data={"sub": user.id})
	
	# Store refresh token in database
	await create_refresh_token_db(db, refresh_token_str, user.id)
	
	return {
		"access_token": access_token,
		"refresh_token": refresh_token_str,
		"token_type": "bearer"
	}


@router.post("/register/editor", response_model=Token)
async def register_editor(
	editor_create: EditorCreate,
	db: AsyncSession = Depends(get_db)
):
	"""Register a new editor user."""
	# Check if email already exists
	existing_user = await get_user_by_email(db, editor_create.email)
	if existing_user:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Email already registered"
		)
	
	# Create editor
	user = await create_editor(db, editor_create)
	
	# Create tokens
	access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
	refresh_token_str = create_refresh_token(data={"sub": user.id})
	
	# Store refresh token in database
	await create_refresh_token_db(db, refresh_token_str, user.id)
	
	return {
		"access_token": access_token,
		"refresh_token": refresh_token_str,
		"token_type": "bearer"
	}


@router.post("/register/coordinator", response_model=Token)
async def register_coordinator(
	coordinator_create: CoordinatorCreate,
	db: AsyncSession = Depends(get_db)
):
	"""Register a new coordinator user."""
	# Check if email already exists
	existing_user = await get_user_by_email(db, coordinator_create.email)
	if existing_user:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Email already registered"
		)
	
	# Create coordinator
	user = await create_coordinator(db, coordinator_create)
	
	# Create tokens
	access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
	refresh_token_str = create_refresh_token(data={"sub": user.id})
	
	# Store refresh token in database
	await create_refresh_token_db(db, refresh_token_str, user.id)
	
	return {
		"access_token": access_token,
		"refresh_token": refresh_token_str,
		"token_type": "bearer"
	}


@router.post("/register/evacuation-assistant", response_model=Token)
async def register_evacuation_assistant(
	assistant_create: EvacuationAssistantCreate,
	db: AsyncSession = Depends(get_db)
):
	"""Register a new evacuation assistant user."""
	# Check if email already exists
	existing_user = await get_user_by_email(db, assistant_create.email)
	if existing_user:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Email already registered"
		)
	
	# Create evacuation assistant
	user = await create_evacuation_assistant(db, assistant_create)
	
	# Create tokens
	access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
	refresh_token_str = create_refresh_token(data={"sub": user.id})
	
	# Store refresh token in database
	await create_refresh_token_db(db, refresh_token_str, user.id)
	
	return {
		"access_token": access_token,
		"refresh_token": refresh_token_str,
		"token_type": "bearer"
	}


@router.post("/login", response_model=Token)
async def login(
	user_login: UserLogin,
	db: AsyncSession = Depends(get_db)
):
	"""Authenticate user and return access and refresh tokens."""
	user = await get_user_by_email(db, user_login.email)
	if not user:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Incorrect email or password"
		)
	
	if not verify_password(user_login.password, user.password_hash):
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Incorrect email or password"
		)
	
	if not user.is_active:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Inactive user"
		)
	
	# Create tokens
	access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
	refresh_token_str = create_refresh_token(data={"sub": user.id})
	
	# Store refresh token in database
	await create_refresh_token_db(db, refresh_token_str, user.id)
	
	return {
		"access_token": access_token,
		"refresh_token": refresh_token_str,
		"token_type": "bearer"
	}


@router.post("/refresh", response_model=Token)
async def refresh_token(
	refresh_token: str,
	db: AsyncSession = Depends(get_db)
):
	"""Refresh access token using refresh token."""
	# Verify refresh token
	payload = verify_token(refresh_token, token_type="refresh")
	if payload is None:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid refresh token"
		)
	
	# Check if token exists in database and is valid
	db_refresh_token = await get_refresh_token(db, refresh_token)
	if not db_refresh_token:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Refresh token not found or expired"
		)
	
	# Get user
	user_id = payload.get("sub")
	user = await get_user_by_id(db, user_id)
	if not user or not user.is_active:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="User not found or inactive"
		)
	
	# Create new access token
	access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
	
	# Optionally rotate refresh token (create new one and revoke old)
	new_refresh_token_str = create_refresh_token(data={"sub": user.id})
	await revoke_refresh_token(db, refresh_token)
	await create_refresh_token_db(db, new_refresh_token_str, user.id)
	
	return {
		"access_token": access_token,
		"refresh_token": new_refresh_token_str,
		"token_type": "bearer"
	}


@router.post("/logout")
async def logout(
	refresh_token: str,
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
):
	"""Revoke a refresh token (logout)."""
	success = await revoke_refresh_token(db, refresh_token)
	if not success:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Refresh token not found"
		)
	return {"message": "Successfully logged out"}


@router.post("/logout-all")
async def logout_all(
	current_user: User = Depends(get_current_active_user),
	db: AsyncSession = Depends(get_db)
):
	"""Revoke all refresh tokens for the current user."""
	await revoke_all_user_tokens(db, current_user.id)
	return {"message": "Successfully logged out from all devices"}
