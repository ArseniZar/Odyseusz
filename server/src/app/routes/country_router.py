from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.core.dependencies import get_current_editor, verify_editor_country_access
from app.models.country import CountryProfile, Consulate
from app.models.user import EditorProfile
from app.crud.country import (
	get_country_profile_by_id,
	get_country_profile_with_details,
	get_all_country_profiles,
	get_country_profiles_by_danger_level,
	update_country_profile,
	get_consulate_by_id,
	get_consulates_by_country,
	create_consulate,
	update_consulate,
	delete_consulate,
	link_editor_to_country,
	unlink_editor_from_country
)
from app.schemas.country import (
	CountryProfileUpdate,
	CountryProfileResponse,
	CountryProfileDetailResponse,
	ConsulateCreate,
	ConsulateUpdate,
	ConsulateResponse
)

router = APIRouter()


# Country Profile Endpoints

@router.get("/", response_model=list[CountryProfileResponse])
async def list_countries(
	skip: int = Query(0, ge=0),
	limit: int = Query(100, ge=1, le=100),
	danger_level: str | None = Query(None),
	db: AsyncSession = Depends(get_db)
):
	"""List all countries (public endpoint)."""
	if danger_level:
		countries = await get_country_profiles_by_danger_level(db, danger_level, skip, limit)
	else:
		countries = await get_all_country_profiles(db, skip, limit)
	return countries


@router.get("/{country_id}", response_model=CountryProfileDetailResponse)
async def get_country(
	country_id: int,
	db: AsyncSession = Depends(get_db)
):
	"""Get country details with consulates (public endpoint)."""
	country = await get_country_profile_with_details(db, country_id)
	if not country:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Country not found"
		)
	return country


@router.patch("/{country_id}", response_model=CountryProfileResponse)
async def update_country(
	country_id: int,
	country_update: CountryProfileUpdate,
	country: CountryProfile = Depends(verify_editor_country_access),
	db: AsyncSession = Depends(get_db)
):
	"""Update a country profile (editor with access only)."""
	updated_country = await update_country_profile(db, country_id, country_update)
	if not updated_country:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Country not found"
		)
	return updated_country


# Consulate Endpoints

@router.get("/{country_id}/consulates", response_model=list[ConsulateResponse])
async def list_consulates(
	country_id: int,
	skip: int = Query(0, ge=0),
	limit: int = Query(100, ge=1, le=100),
	db: AsyncSession = Depends(get_db)
):
	"""List consulates for a country (public endpoint)."""
	country = await get_country_profile_by_id(db, country_id)
	if not country:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Country not found"
		)
	
	consulates = await get_consulates_by_country(db, country_id, skip, limit)
	return consulates


@router.get("/consulates/{consulate_id}", response_model=ConsulateResponse)
async def get_consulate(
	consulate_id: int,
	db: AsyncSession = Depends(get_db)
):
	"""Get consulate details (public endpoint)."""
	consulate = await get_consulate_by_id(db, consulate_id)
	if not consulate:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Consulate not found"
		)
	return consulate


@router.post("/{country_id}/consulates", response_model=ConsulateResponse, status_code=status.HTTP_201_CREATED)
async def create_consulate(
	country_id: int,
	consulate_create: ConsulateCreate,
	country: CountryProfile = Depends(verify_editor_country_access),
	db: AsyncSession = Depends(get_db)
):
	"""Create a new consulate for a country (editor with access only)."""
	# Ensure the consulate is linked to the correct country
	if consulate_create.country_profile_id != country_id:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Country ID mismatch"
		)
	
	consulate = await create_consulate(db, consulate_create)
	return consulate


@router.patch("/consulates/{consulate_id}", response_model=ConsulateResponse)
async def update_consulate(
	consulate_id: int,
	consulate_update: ConsulateUpdate,
	current_editor: EditorProfile = Depends(get_current_editor),
	db: AsyncSession = Depends(get_db)
):
	"""Update a consulate (editor with access to the country only)."""
	consulate = await get_consulate_by_id(db, consulate_id)
	if not consulate:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Consulate not found"
		)
	
	# Verify editor has access to the country
	country = await verify_editor_country_access(consulate.country_profile_id, current_editor, db)
	
	updated_consulate = await update_consulate(db, consulate_id, consulate_update)
	if not updated_consulate:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Consulate not found"
		)
	return updated_consulate


@router.delete("/consulates/{consulate_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_consulate(
	consulate_id: int,
	current_editor: EditorProfile = Depends(get_current_editor),
	db: AsyncSession = Depends(get_db)
):
	"""Delete a consulate (editor with access to the country only)."""
	consulate = await get_consulate_by_id(db, consulate_id)
	if not consulate:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Consulate not found"
		)
	
	# Verify editor has access to the country
	country = await verify_editor_country_access(consulate.country_profile_id, current_editor, db)
	
	success = await delete_consulate(db, consulate_id)
	if not success:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Consulate not found"
		)
