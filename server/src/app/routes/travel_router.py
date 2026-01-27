from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from app.core.db import get_db
from app.core.dependencies import get_current_traveler
from app.models.user import TravelerProfile
from app.models.travel import Travel, TravelStage
from app.crud.travel import (
	get_travel_by_id,
	get_travel_with_stages,
	get_travels_by_traveler,
	create_travel as create_travel_db,
	delete_travel,
	get_travel_stage_by_id,
	create_travel_stage,
	update_travel_stage,
	delete_travel_stage,
)
from app.crud.location import get_location_by_coordinates, create_location
from app.schemas.travel import (
	TravelCreate,
	TravelResponse,
	TravelDetailResponse,
	TravelStageCreate,
	TravelStageResponse,
	TravelStageUpdate,
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


@router.get("/", response_model=list[TravelResponse])
async def list_my_travels(
	skip: int = Query(0, ge=0),
	limit: int = Query(100, ge=1, le=100),
	current_traveler: TravelerProfile = Depends(get_current_traveler),
	db: AsyncSession = Depends(get_db)
):
	"""List all travels for the current traveler."""
	travels = await get_travels_by_traveler(db, current_traveler.id, skip, limit)
	return travels


@router.get("/{travel_id}", response_model=TravelDetailResponse)
async def get_travel(
	travel_id: int,
	current_traveler: TravelerProfile = Depends(get_current_traveler),
	db: AsyncSession = Depends(get_db)
):
	"""Get a specific travel with stages (only if it belongs to the current traveler)."""
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
	
	# Convert to response format with coordinates
	result = await db.execute(
		select(Travel)
		.options(selectinload(Travel.stages).selectinload(TravelStage.location))
		.where(Travel.id == travel_id)
    .sort(TravelStage.start_date)
	)
	travel_with_location = result.scalar_one_or_none()
	
	if not travel_with_location:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Travel not found"
		)
	
	# Build response with coordinates
	stages_response = []
	for stage in travel_with_location.stages:
		stages_response.append(TravelStageResponse(
			id=stage.id,
			travel_id=stage.travel_id,
			location_id=stage.location_id,
			latitude=stage.location.latitude,
			longitude=stage.location.longitude,
			start_date=stage.start_date,
			end_date=stage.end_date,
			people_count=stage.people_count,
		))
	
	return TravelDetailResponse(
		id=travel_with_location.id,
		traveler_id=travel_with_location.traveler_id,
		created_at=travel_with_location.created_at,
		stages=stages_response,
	)


@router.post("/", response_model=TravelDetailResponse, status_code=status.HTTP_201_CREATED)
async def create_travel(
	travel_create: TravelCreate,
	current_traveler: TravelerProfile = Depends(get_current_traveler),
	db: AsyncSession = Depends(get_db)
):
	"""Create a new travel for the current traveler."""
	# Convert coordinates to location_ids
	stages_with_location_ids = []
	for stage in travel_create.stages:
		location_id = await get_or_create_location(db, stage.latitude, stage.longitude)
		# Create a temporary object with location_id for the CRUD function
		stage_dict = stage.model_dump()
		stage_dict['location_id'] = location_id
		del stage_dict['latitude']
		del stage_dict['longitude']
		stages_with_location_ids.append(stage_dict)
	
	# Create travel with stages (using modified stage data)
	from app.schemas.travel import TravelStageCreate as OriginalTravelStageCreate
	# We need to create stages manually since we've converted coordinates to location_id
	travel = Travel(traveler_id=current_traveler.id)
	db.add(travel)
	await db.flush()
	
	for stage_data in stages_with_location_ids:
		stage = TravelStage(
			travel_id=travel.id,
			location_id=stage_data['location_id'],
			start_date=stage_data['start_date'],
			end_date=stage_data['end_date'],
			people_count=stage_data['people_count'],
		)
		db.add(stage)
	
	await db.commit()
	await db.refresh(travel)
	
	# Reload with stages and locations
	result = await db.execute(
		select(Travel)
		.options(selectinload(Travel.stages).selectinload(TravelStage.location))
		.where(Travel.id == travel.id)
	)
	travel_with_stages = result.scalar_one_or_none()
	
	if not travel_with_stages:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Failed to create travel"
		)
	
	# Build response with coordinates
	stages_response = []
	for stage in travel_with_stages.stages:
		stages_response.append(TravelStageResponse(
			id=stage.id,
			travel_id=stage.travel_id,
			location_id=stage.location_id,
			latitude=stage.location.latitude,
			longitude=stage.location.longitude,
			start_date=stage.start_date,
			end_date=stage.end_date,
			people_count=stage.people_count,
		))
	
	return TravelDetailResponse(
		id=travel_with_stages.id,
		traveler_id=travel_with_stages.traveler_id,
		created_at=travel_with_stages.created_at,
		stages=stages_response,
	)


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


@router.post("/{travel_id}/stages", response_model=TravelStageResponse, status_code=status.HTTP_201_CREATED)
async def create_travel_stage_endpoint(
	travel_id: int,
	stage_create: TravelStageCreate,
	current_traveler: TravelerProfile = Depends(get_current_traveler),
	db: AsyncSession = Depends(get_db)
):
	"""Add a stage to a travel (only if the travel belongs to the current traveler)."""
	# Verify travel belongs to traveler
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
	
	# Get or create location from coordinates
	location_id = await get_or_create_location(db, stage_create.latitude, stage_create.longitude)
	
	# Create stage with location_id
	from app.schemas.travel import TravelStageCreate as OriginalTravelStageCreate
	stage_dict = stage_create.model_dump()
	stage_dict['location_id'] = location_id
	del stage_dict['latitude']
	del stage_dict['longitude']
	
	# Create stage manually
	stage = TravelStage(
		travel_id=travel_id,
		location_id=location_id,
		start_date=stage_create.start_date,
		end_date=stage_create.end_date,
		people_count=stage_create.people_count,
	)
	db.add(stage)
	await db.commit()
	await db.refresh(stage)
	
	# Load location for response
	result = await db.execute(
		select(TravelStage)
		.options(selectinload(TravelStage.location))
		.where(TravelStage.id == stage.id)
	)
	stage_with_location = result.scalar_one_or_none()
	
	if not stage_with_location:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Failed to create stage"
		)
	
	return TravelStageResponse(
		id=stage_with_location.id,
		travel_id=stage_with_location.travel_id,
		location_id=stage_with_location.location_id,
		latitude=stage_with_location.location.latitude,
		longitude=stage_with_location.location.longitude,
		start_date=stage_with_location.start_date,
		end_date=stage_with_location.end_date,
		people_count=stage_with_location.people_count,
	)


@router.patch("/{travel_id}/stages/{stage_id}", response_model=TravelStageResponse)
async def update_travel_stage_endpoint(
	travel_id: int,
	stage_id: int,
	stage_update: TravelStageUpdate,
	current_traveler: TravelerProfile = Depends(get_current_traveler),
	db: AsyncSession = Depends(get_db)
):
	"""Update a travel stage (only if the travel belongs to the current traveler)."""
	# Verify travel belongs to traveler
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
	
	# Verify stage belongs to travel
	stage = await get_travel_stage_by_id(db, stage_id)
	if not stage:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Travel stage not found"
		)
	
	if stage.travel_id != travel_id:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Stage does not belong to this travel"
		)
	
	# Handle location update if coordinates are provided
	update_data = stage_update.model_dump(exclude_unset=True)
	if 'latitude' in update_data or 'longitude' in update_data:
		# Both latitude and longitude must be provided if updating location
		if 'latitude' not in update_data or 'longitude' not in update_data:
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Both latitude and longitude must be provided to update location"
			)
		
		location_id = await get_or_create_location(
			db,
			update_data['latitude'],
			update_data['longitude']
		)
		update_data['location_id'] = location_id
		del update_data['latitude']
		del update_data['longitude']
	
	# Update stage
	for key, value in update_data.items():
		if hasattr(stage, key):
			setattr(stage, key, value)
	
	await db.commit()
	await db.refresh(stage)
	
	# Load location for response
	result = await db.execute(
		select(TravelStage)
		.options(selectinload(TravelStage.location))
		.where(TravelStage.id == stage.id)
	)
	updated_stage = result.scalar_one_or_none()
	
	if not updated_stage:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Travel stage not found"
		)
	
	return TravelStageResponse(
		id=updated_stage.id,
		travel_id=updated_stage.travel_id,
		location_id=updated_stage.location_id,
		latitude=updated_stage.location.latitude,
		longitude=updated_stage.location.longitude,
		start_date=updated_stage.start_date,
		end_date=updated_stage.end_date,
		people_count=updated_stage.people_count,
	)


@router.delete("/{travel_id}/stages/{stage_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_travel_stage_endpoint(
	travel_id: int,
	stage_id: int,
	current_traveler: TravelerProfile = Depends(get_current_traveler),
	db: AsyncSession = Depends(get_db)
):
	"""Delete a travel stage (only if the travel belongs to the current traveler)."""
	# Verify travel belongs to traveler
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
	
	# Verify stage belongs to travel
	stage = await get_travel_stage_by_id(db, stage_id)
	if not stage:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Travel stage not found"
		)
	
	if stage.travel_id != travel_id:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Stage does not belong to this travel"
		)
	
	success = await delete_travel_stage(db, stage_id)
	if not success:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="Travel stage not found"
		)
