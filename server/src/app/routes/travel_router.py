from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.core.dependencies import get_current_traveler
from app.models.user import TravelerProfile
from app.models.travel import Travel
from app.crud.travel import (
  get_travel_by_id,
  get_travel_with_stages,
  get_travels_by_traveler,
  create_travel,
  update_travel,
  delete_travel
)
from app.schemas.travel import (
  TravelCreate,
  TravelUpdate,
  TravelResponse,
  TravelStatus
)

router = APIRouter()


def compute_travel_status(travel: Travel, today: date) -> TravelStatus:
  """
  Compute travel status based on stages and cancelled flag.
  
  Logic:
  - If cancelled: return CANCELLED
  - If no stages: return PLANNED
  - If today < first stage start_date: return PLANNED
  - If today > last stage end_date: return COMPLETED
  - Otherwise: return ONGOING
  """
  if travel.cancelled:
    return TravelStatus.CANCELLED
  
  if not travel.stages:
    return TravelStatus.PLANNED
  
  # Stages are already ordered by start_date
  first_stage = travel.stages[0]
  last_stage = travel.stages[-1]
  
  if today < first_stage.start_date:
    return TravelStatus.PLANNED
  elif today > last_stage.end_date:
    return TravelStatus.COMPLETED
  else:
    return TravelStatus.ONGOING


def compute_started_at(travel: Travel, today: date) -> date | None:
  """
  Compute started_at based on first stage's start_date.
  
  Returns:
  - None if travel is cancelled
  - None if travel hasn't started yet (not past first stage's start_date)
  - First stage's start_date if travel has started
  """
  if travel.cancelled:
    return None
  
  if not travel.stages:
    return None
  
  first_stage = travel.stages[0]
  
  if today >= first_stage.start_date:
    return first_stage.start_date
  
  return None


def compute_finished_at(travel: Travel, today: date) -> date | None:
  """
  Compute finished_at based on last stage's end_date.
  
  Returns:
  - None if travel is cancelled
  - None if travel hasn't finished yet (not past last stage's end_date)
  - Last stage's end_date if travel has finished
  """
  if travel.cancelled:
    return None
  
  if not travel.stages:
    return None
  
  last_stage = travel.stages[-1]
  
  if today > last_stage.end_date:
    return last_stage.end_date
  
  return None


def build_travel_response(travel: Travel) -> TravelResponse:
  """Build TravelResponse with computed status, started_at, and finished_at."""
  from datetime import date
  
  today = date.today()
  computed_status = compute_travel_status(travel, today)
  computed_started_at = compute_started_at(travel, today)
  computed_finished_at = compute_finished_at(travel, today)
  
  return TravelResponse(
    id=travel.id,
    traveler_id=travel.traveler_id,
    cancelled=travel.cancelled,
    status=computed_status,
    created_at=travel.created_at,
    updated_at=travel.updated_at,
    started_at=computed_started_at,
    finished_at=computed_finished_at,
    stages=[
      {
        "id": stage.id,
        "travel_id": stage.travel_id,
        "location": {
          "id": stage.location.id,
          "latitude": stage.location.latitude,
          "longitude": stage.location.longitude
        },
        "start_date": stage.start_date,
        "end_date": stage.end_date,
        "people_count": stage.people_count
      }
      for stage in travel.stages
    ]
  )


@router.post("/", response_model=TravelResponse, status_code=status.HTTP_201_CREATED)
async def create_travel_endpoint(
  travel_create: TravelCreate,
  current_traveler: TravelerProfile = Depends(get_current_traveler),
  db: AsyncSession = Depends(get_db)
):
  """
  Create a new travel with stages (traveler only).
  
  Creates a travel with all stages in a single request.
  Automatically creates location records from coordinates.
  Status is computed based on dates and cancelled flag.
  """
  # Pass traveler_id from authenticated user to CRUD function
  travel = await create_travel(db, travel_create, current_traveler.id)
  
  # Reload with stages and locations for response
  travel_with_details = await get_travel_with_stages(db, travel.id)
  if not travel_with_details:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Failed to create travel"
    )
  
  return build_travel_response(travel_with_details)


@router.get("/", response_model=list[TravelResponse])
async def list_travels(
  skip: int = Query(0, ge=0),
  limit: int = Query(100, ge=1, le=1000),
  current_traveler: TravelerProfile = Depends(get_current_traveler),
  db: AsyncSession = Depends(get_db)
):
  """
  List all travels for the current traveler with full details.
  
  Returns travels sorted by creation date (newest first).
  Each travel includes all stages with location coordinates.
  Status and finished_at are computed based on stages and dates.
  """
  travels = await get_travels_by_traveler(db, current_traveler.id, skip, limit)
  return [build_travel_response(travel) for travel in travels]


@router.get("/{travel_id}", response_model=TravelResponse)
async def get_travel(
  travel_id: int,
  current_traveler: TravelerProfile = Depends(get_current_traveler),
  db: AsyncSession = Depends(get_db)
):
  """
  Get a specific travel with full details (only if it belongs to the current traveler).
  
  Returns travel with all stages and location coordinates.
  Status and finished_at are computed based on stages and dates.
  """
  travel = await get_travel_with_stages(db, travel_id)
  if not travel:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Travel not found"
    )
  
  if travel.traveler_id != current_traveler.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have access to this travel"
    )
  
  return build_travel_response(travel)


@router.put("/{travel_id}", response_model=TravelResponse)
async def update_travel_endpoint(
  travel_id: int,
  travel_update: TravelUpdate,
  current_traveler: TravelerProfile = Depends(get_current_traveler),
  db: AsyncSession = Depends(get_db)
):
  """
  Replace a travel with full data (only if it belongs to the current traveler).
  
  This endpoint performs a full replacement:
  - Updates cancelled field
  - Replaces all stages with the provided list
  - Creates new location records for each stage
  - Status and finished_at are computed based on stages and dates
  
  All fields must be provided (cancelled and stages list).
  """
  travel = await get_travel_by_id(db, travel_id)
  if not travel:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Travel not found"
    )
  
  if travel.traveler_id != current_traveler.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have access to this travel"
    )
  
  updated_travel = await update_travel(db, travel_id, travel_update)
  if not updated_travel:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Travel not found"
    )
  
  # Reload with full details for response
  travel_with_details = await get_travel_with_stages(db, travel_id)
  return build_travel_response(travel_with_details)


@router.delete("/{travel_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_travel_endpoint(
  travel_id: int,
  current_traveler: TravelerProfile = Depends(get_current_traveler),
  db: AsyncSession = Depends(get_db)
):
  """Delete a travel (only if it belongs to the current traveler)."""
  travel = await get_travel_by_id(db, travel_id)
  if not travel:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Travel not found"
    )
  
  if travel.traveler_id != current_traveler.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have access to this travel"
    )
  
  success = await delete_travel(db, travel_id)
  if not success:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Travel not found"
    )
