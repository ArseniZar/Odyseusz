from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.core.dependencies import get_optional_current_editor, verify_editor_country_access
from app.models.country import CountryProfile
from app.models.user import EditorProfile
from app.crud.country import (
  get_country_profile_with_details,
  get_all_country_profiles,
  get_editor_country_profiles,
  get_all_consulates,
  update_country_profile
)
from app.schemas.country import (
  CountryProfileUpdate,
  CountryProfileResponse,
  CountryProfilePublicDetailResponse,
  ConsulateResponse
)

router = APIRouter()


# Country Profile Endpoints

@router.get("/", response_model=list[CountryProfilePublicDetailResponse])
async def list_countries(
  all: bool = Query(True, description="If false, returns only countries the logged-in editor can edit"),
  skip: int = Query(0, ge=0),
  limit: int = Query(100, ge=1, le=1000),
  current_editor: Optional[EditorProfile] = Depends(get_optional_current_editor),
  db: AsyncSession = Depends(get_db)
):
  """
  List countries with their consulates and danger levels (public endpoint).
  
  - If all=true (default): Returns all countries (public access)
  - If all=false: Returns only countries the authenticated editor can edit (requires authentication)
  """
  if all:
    # Return all countries (public access)
    countries = await get_all_country_profiles(db, skip, limit)
  else:
    # Return only countries the editor has access to
    if not current_editor:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required when all=false"
      )
    countries = await get_editor_country_profiles(db, current_editor.id, skip, limit)
  
  return countries


@router.get("/consulates", response_model=list[ConsulateResponse])
async def list_all_consulates(
  skip: int = Query(0, ge=0),
  limit: int = Query(1000, ge=1, le=1000),
  db: AsyncSession = Depends(get_db)
):
  """Get list of all consulates (public endpoint)."""
  consulates = await get_all_consulates(db, skip, limit)
  return consulates


@router.get("/{country_id}", response_model=CountryProfilePublicDetailResponse)
async def get_country(
  country_id: int,
  db: AsyncSession = Depends(get_db)
):
  """
  Get country details with consulates and danger level (public endpoint).
  """
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
