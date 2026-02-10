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
  skip: int = Query(0, ge=0),
  limit: int = Query(100, ge=1, le=1000),
  current_editor: Optional[EditorProfile] = Depends(get_optional_current_editor),
  db: AsyncSession = Depends(get_db)
):
  """
  List all countries with their consulates and danger levels (public endpoint).
  
  Each country includes a 'can_edit' field indicating whether the current user can edit it.
  """
  # Get all countries
  countries = await get_all_country_profiles(db, skip, limit)
  
  # Build response with can_edit field
  response = []
  for country in countries:
    country_dict = {
      "id": country.id,
      "name": country.name,
      "country_code": country.country_code,
      "description": country.description,
      "danger_level": country.danger_level,
      "created_at": country.created_at,
      "updated_at": country.updated_at,
      "consulates": country.consulates,
      "can_edit": False
    }
    
    # Check if current editor can edit this country
    if current_editor:
      country_dict["can_edit"] = country in current_editor.country_profiles
    
    response.append(country_dict)
  
  return response


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
  current_editor: Optional[EditorProfile] = Depends(get_optional_current_editor),
  db: AsyncSession = Depends(get_db)
):
  """
  Get country details with consulates and danger level (public endpoint).
  
  Includes a 'can_edit' field indicating whether the current user can edit this country.
  """
  country = await get_country_profile_with_details(db, country_id)
  if not country:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Country not found"
    )
  
  # Build response with can_edit field
  country_dict = {
    "id": country.id,
    "name": country.name,
    "country_code": country.country_code,
    "description": country.description,
    "danger_level": country.danger_level,
    "created_at": country.created_at,
    "updated_at": country.updated_at,
    "consulates": country.consulates,
    "can_edit": False
  }
  
  # Check if current editor can edit this country
  if current_editor:
    country_dict["can_edit"] = country in current_editor.country_profiles
  
  return country_dict


@router.put("/{country_id}", response_model=CountryProfilePublicDetailResponse)
async def update_country(
  country_id: int,
  country_update: CountryProfileUpdate,
  country: CountryProfile = Depends(verify_editor_country_access),
  db: AsyncSession = Depends(get_db)
):
  """
  Update a country profile (editor with access only).
  
  This endpoint updates:
  - Description field
  - Replaces all consulate associations with the provided list
  
  Note: name and country_code cannot be changed.
  """
  updated_country = await update_country_profile(db, country_id, country_update)
  if not updated_country:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Country not found"
    )
  return updated_country
