from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.core.db import get_db
from app.core.dependencies import get_current_active_user, get_current_coordinator
from app.models.user import User, UserRole, CoordinatorProfile
from app.models.evacuation import Evacuation
from app.crud.evacuation import (
  get_evacuation_by_id,
  get_evacuation_with_details,
  get_all_evacuations,
  get_evacuations_by_coordinator,
  create_evacuation,
  update_evacuation,
  delete_evacuation,
  get_all_assistants
)
from app.schemas.evacuation import (
  EvacuationCreate,
  EvacuationResponse,
  EvacuationDetailResponse,
  EvacuationUpdate,
  EvacuationAssistantResponse
)

router = APIRouter()


def build_evacuation_response(evacuation: Evacuation) -> dict:
  """Build evacuation response with properly formatted assistant data."""
  return {
    "id": evacuation.id,
    "name": evacuation.name,
    "reason": evacuation.reason,
    "description": evacuation.description,
    "active": evacuation.active,
    "coordinator_id": evacuation.coordinator_id,
    "last_active_at": evacuation.last_active_at,
    "created_at": evacuation.created_at,
    "updated_at": evacuation.updated_at,
    "areas": [
      {
        "id": area.id,
        "evacuation_id": area.evacuation_id,
        "radius": area.radius,
        "location": {
          "id": area.location.id,
          "latitude": area.location.latitude,
          "longitude": area.location.longitude
        },
        "created_at": area.created_at
      }
      for area in evacuation.areas
    ],
    "assembly_points": [
      {
        "id": point.id,
        "evacuation_id": point.evacuation_id,
        "name": point.name,
        "description": point.description,
        "location": {
          "id": point.location.id,
          "latitude": point.location.latitude,
          "longitude": point.location.longitude
        },
        "created_at": point.created_at
      }
      for point in evacuation.assembly_points
    ],
    "assistants": [
      {
        "id": assistant.id,
        "user_id": assistant.user_id,
        "first_name": assistant.user.first_name,
        "last_name": assistant.user.last_name,
        "email": assistant.user.email,
        "phone_number": assistant.phone_number,
        "working_hours": assistant.working_hours
      }
      for assistant in evacuation.assistants
    ]
  }


# Evacuation CRUD endpoints
@router.get("/", response_model=list[EvacuationDetailResponse])
async def list_evacuations(
  all: bool = Query(True, description="If false, returns only evacuations of the logged-in coordinator"),
  skip: int = Query(0, ge=0),
  limit: int = Query(100, ge=1, le=1000),
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """
  List evacuations with all data (areas, assembly points, assistants).
  
  - If all=true (default): Returns all evacuations (any authenticated user)
  - If all=false: Returns only evacuations of the authenticated coordinator (requires coordinator role)
  """
  if all:
    # Return all evacuations
    evacuations = await get_all_evacuations(db, skip, limit, active_only=False)
  else:
    # Return only coordinator's evacuations
    if current_user.role != UserRole.COORDINATOR:
      raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Only coordinators can filter their evacuations with all=false"
      )
    
    result = await db.execute(
      select(CoordinatorProfile).where(CoordinatorProfile.user_id == current_user.id)
    )
    coordinator_profile = result.scalar_one_or_none()
    if not coordinator_profile:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Coordinator profile not found"
      )
    evacuations = await get_evacuations_by_coordinator(db, coordinator_profile.id, skip, limit)
  
  return [build_evacuation_response(evacuation) for evacuation in evacuations]


@router.get("/assistants", response_model=list[EvacuationAssistantResponse])
async def list_all_assistants(
  skip: int = Query(0, ge=0),
  limit: int = Query(1000, ge=1, le=1000),
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """Get list of all evacuation assistants with user details (authenticated users)."""
  assistants = await get_all_assistants(db, skip, limit)
  
  # Build response with user data
  return [
    {
      "id": assistant.id,
      "user_id": assistant.user_id,
      "first_name": assistant.user.first_name,
      "last_name": assistant.user.last_name,
      "email": assistant.user.email,
      "phone_number": assistant.phone_number,
      "working_hours": assistant.working_hours
    }
    for assistant in assistants
  ]


@router.get("/{evacuation_id}", response_model=EvacuationDetailResponse)
async def get_evacuation(
  evacuation_id: int,
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """Get a specific evacuation with all data (areas, assembly points, assistants)."""
  evacuation = await get_evacuation_with_details(db, evacuation_id)
  if not evacuation:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation not found"
    )
  
  # Coordinators can only see their own evacuations
  if current_user.role == UserRole.COORDINATOR:
    result = await db.execute(
      select(CoordinatorProfile).where(CoordinatorProfile.user_id == current_user.id)
    )
    coordinator_profile = result.scalar_one_or_none()
    if not coordinator_profile or evacuation.coordinator_id != coordinator_profile.id:
      raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have access to this evacuation"
      )
  
  return build_evacuation_response(evacuation)


@router.post("/", response_model=EvacuationDetailResponse, status_code=status.HTTP_201_CREATED)
async def create_evacuation_endpoint(
  evacuation_create: EvacuationCreate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """
  Create a new evacuation with areas, assembly points, and assistants (coordinator only).
  
  The coordinator_id is automatically set from the authenticated user's JWT token.
  
  This endpoint combines the creation of:
  - Evacuation basic info
  - Evacuation areas
  - Assembly points
  - Assistant assignments
  """
  # Create evacuation with coordinator_id from JWT token
  evacuation = await create_evacuation(db, evacuation_create, current_coordinator.id)
  return build_evacuation_response(evacuation)


@router.put("/{evacuation_id}", response_model=EvacuationDetailResponse)
async def update_evacuation_endpoint(
  evacuation_id: int,
  evacuation_update: EvacuationUpdate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """
  Replace an evacuation with full data (only if it belongs to the current coordinator).
  
  This endpoint performs a full replacement:
  - Updates all basic fields (name, reason, description, active)
  - Replaces all areas with the provided list
  - Replaces all assembly points with the provided list
  - Replaces all assistants with the provided list
  """
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  if not evacuation:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation not found"
    )
  
  if evacuation.coordinator_id != current_coordinator.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have access to this evacuation"
    )
  
  updated_evacuation = await update_evacuation(db, evacuation_id, evacuation_update)
  if not updated_evacuation:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation not found"
    )
  
  return build_evacuation_response(updated_evacuation)


@router.delete("/{evacuation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_evacuation_endpoint(
  evacuation_id: int,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Delete an evacuation (only if it belongs to the current coordinator)."""
  evacuation = await get_evacuation_by_id(db, evacuation_id)
  if not evacuation:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation not found"
    )
  
  if evacuation.coordinator_id != current_coordinator.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have access to this evacuation"
    )
  
  success = await delete_evacuation(db, evacuation_id)
  if not success:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation not found"
    )
