from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.core.db import get_db
from app.core.dependencies import get_current_active_user, get_current_coordinator, get_current_evacuation_assistant
from app.models.user import User, UserRole, CoordinatorProfile, EvacuationAssistantProfile
from app.models.evacuation import Evacuation, EvacuationArea, AssemblyPoint
from app.crud.evacuation import (
  get_evacuation_by_id,
  get_evacuation_with_details,
  get_all_evacuations,
  get_evacuations_by_coordinator,
  create_evacuation,
  update_evacuation,
  delete_evacuation,
  get_evacuation_area_by_id,
  get_evacuation_areas_by_evacuation,
  create_evacuation_area,
  update_evacuation_area,
  delete_evacuation_area,
  get_assembly_point_by_id,
  get_assembly_points_by_evacuation,
  create_assembly_point,
  update_assembly_point,
  delete_assembly_point,
  link_assistant_to_evacuation,
  unlink_assistant_from_evacuation,
)
from app.crud.location import get_location_by_coordinates, create_location
from app.schemas.evacuation import (
  EvacuationCreate,
  EvacuationResponse,
  EvacuationDetailResponse,
  EvacuationUpdate,
  EvacuationAreaCreate,
  EvacuationAreaResponse,
  EvacuationAreaUpdate,
  AssemblyPointCreate,
  AssemblyPointResponse,
  AssemblyPointUpdate,
  EvacuationAssistantLinkCreate,
)
from app.schemas.location import LocationCreate

router = APIRouter()


async def get_or_create_location(
  db: AsyncSession,
  latitude: float,
  longitude: float
) -> int:
  """Get existing location or create a new one. Returns location_id."""
  # Try to find existing location
  location = await get_location_by_coordinates(db, latitude, longitude)
  if location:
    return location.id
  
  # Create new location
  location_create = LocationCreate(latitude=latitude, longitude=longitude)
  location = await create_location(db, location_create)
  return location.id


# Evacuation CRUD endpoints
@router.get("/", response_model=list[EvacuationResponse])
async def list_evacuations(
  skip: int = Query(0, ge=0),
  limit: int = Query(100, ge=1, le=100),
  active_only: bool = Query(False),
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """List all evacuations. Coordinators see only their evacuations, others see all."""
  if current_user.role == UserRole.COORDINATOR:
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
  else:
    evacuations = await get_all_evacuations(db, skip, limit, active_only)
  
  return evacuations


@router.get("/{evacuation_id}", response_model=EvacuationDetailResponse)
async def get_evacuation(
  evacuation_id: int,
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """Get a specific evacuation with areas and assembly points."""
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
  
  return evacuation


@router.post("/", response_model=EvacuationResponse, status_code=status.HTTP_201_CREATED)
async def create_evacuation_endpoint(
  evacuation_create: EvacuationCreate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Create a new evacuation (coordinator only)."""
  # Ensure the coordinator_id matches the current coordinator
  if evacuation_create.coordinator_id != current_coordinator.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You can only create evacuations for yourself"
    )
  
  evacuation = await create_evacuation(db, evacuation_create)
  return evacuation


@router.patch("/{evacuation_id}", response_model=EvacuationResponse)
async def update_evacuation_endpoint(
  evacuation_id: int,
  evacuation_update: EvacuationUpdate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Update an evacuation (only if it belongs to the current coordinator)."""
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
  
  return updated_evacuation


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


# Evacuation Area endpoints
@router.get("/{evacuation_id}/areas", response_model=list[EvacuationAreaResponse])
async def list_evacuation_areas(
  evacuation_id: int,
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """List all areas for an evacuation."""
  # Verify evacuation exists
  evacuation = await get_evacuation_by_id(db, evacuation_id)
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
  
  areas = await get_evacuation_areas_by_evacuation(db, evacuation_id)
  return areas


@router.post("/{evacuation_id}/areas", response_model=EvacuationAreaResponse, status_code=status.HTTP_201_CREATED)
async def create_evacuation_area_endpoint(
  evacuation_id: int,
  area_create: EvacuationAreaCreate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Create an evacuation area (only if evacuation belongs to current coordinator)."""
  # Verify evacuation belongs to coordinator
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
  
  # Ensure evacuation_id in body matches URL
  if area_create.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Evacuation ID in body does not match URL"
    )
  
  area = await create_evacuation_area(db, area_create)
  return area


@router.patch("/{evacuation_id}/areas/{area_id}", response_model=EvacuationAreaResponse)
async def update_evacuation_area_endpoint(
  evacuation_id: int,
  area_id: int,
  area_update: EvacuationAreaUpdate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Update an evacuation area (only if evacuation belongs to current coordinator)."""
  # Verify evacuation belongs to coordinator
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
  
  # Verify area belongs to evacuation
  area = await get_evacuation_area_by_id(db, area_id)
  if not area:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation area not found"
    )
  
  if area.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Area does not belong to this evacuation"
    )
  
  updated_area = await update_evacuation_area(db, area_id, area_update)
  if not updated_area:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation area not found"
    )
  
  return updated_area


@router.delete("/{evacuation_id}/areas/{area_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_evacuation_area_endpoint(
  evacuation_id: int,
  area_id: int,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Delete an evacuation area (only if evacuation belongs to current coordinator)."""
  # Verify evacuation belongs to coordinator
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
  
  # Verify area belongs to evacuation
  area = await get_evacuation_area_by_id(db, area_id)
  if not area:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation area not found"
    )
  
  if area.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Area does not belong to this evacuation"
    )
  
  success = await delete_evacuation_area(db, area_id)
  if not success:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation area not found"
    )


# Assembly Point endpoints
@router.get("/{evacuation_id}/assembly-points", response_model=list[AssemblyPointResponse])
async def list_assembly_points(
  evacuation_id: int,
  current_user: User = Depends(get_current_active_user),
  db: AsyncSession = Depends(get_db)
):
  """List all assembly points for an evacuation."""
  # Verify evacuation exists
  evacuation = await get_evacuation_by_id(db, evacuation_id)
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
  
  points = await get_assembly_points_by_evacuation(db, evacuation_id)
  return points


@router.post("/{evacuation_id}/assembly-points", response_model=AssemblyPointResponse, status_code=status.HTTP_201_CREATED)
async def create_assembly_point_endpoint(
  evacuation_id: int,
  point_create: AssemblyPointCreate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Create an assembly point (only if evacuation belongs to current coordinator)."""
  # Verify evacuation belongs to coordinator
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
  
  # Ensure evacuation_id in body matches URL
  if point_create.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Evacuation ID in body does not match URL"
    )
  
  point = await create_assembly_point(db, point_create)
  return point


@router.patch("/{evacuation_id}/assembly-points/{point_id}", response_model=AssemblyPointResponse)
async def update_assembly_point_endpoint(
  evacuation_id: int,
  point_id: int,
  point_update: AssemblyPointUpdate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Update an assembly point (only if evacuation belongs to current coordinator)."""
  # Verify evacuation belongs to coordinator
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
  
  # Verify point belongs to evacuation
  point = await get_assembly_point_by_id(db, point_id)
  if not point:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Assembly point not found"
    )
  
  if point.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Assembly point does not belong to this evacuation"
    )
  
  updated_point = await update_assembly_point(db, point_id, point_update)
  if not updated_point:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Assembly point not found"
    )
  
  return updated_point


@router.delete("/{evacuation_id}/assembly-points/{point_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_assembly_point_endpoint(
  evacuation_id: int,
  point_id: int,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Delete an assembly point (only if evacuation belongs to current coordinator)."""
  # Verify evacuation belongs to coordinator
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
  
  # Verify point belongs to evacuation
  point = await get_assembly_point_by_id(db, point_id)
  if not point:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Assembly point not found"
    )
  
  if point.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Assembly point does not belong to this evacuation"
    )
  
  success = await delete_assembly_point(db, point_id)
  if not success:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Assembly point not found"
    )


# Assistant Management endpoints
@router.post("/{evacuation_id}/assistants", status_code=status.HTTP_201_CREATED)
async def link_assistant_to_evacuation_endpoint(
  evacuation_id: int,
  link_create: EvacuationAssistantLinkCreate,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Link an evacuation assistant to an evacuation (coordinator only)."""
  # Verify evacuation belongs to coordinator
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
  
  # Ensure evacuation_id in body matches URL
  if link_create.evacuation_id != evacuation_id:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Evacuation ID in body does not match URL"
    )
  
  success = await link_assistant_to_evacuation(db, link_create.assistant_id, evacuation_id)
  if not success:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation or assistant not found"
    )
  
  return {"message": "Assistant linked successfully"}


@router.delete("/{evacuation_id}/assistants/{assistant_id}", status_code=status.HTTP_204_NO_CONTENT)
async def unlink_assistant_from_evacuation_endpoint(
  evacuation_id: int,
  assistant_id: int,
  current_coordinator: CoordinatorProfile = Depends(get_current_coordinator),
  db: AsyncSession = Depends(get_db)
):
  """Unlink an evacuation assistant from an evacuation (coordinator only)."""
  # Verify evacuation belongs to coordinator
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
  
  success = await unlink_assistant_from_evacuation(db, assistant_id, evacuation_id)
  if not success:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Evacuation or assistant not found"
    )
