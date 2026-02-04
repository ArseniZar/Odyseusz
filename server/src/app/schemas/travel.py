from datetime import date, datetime
from enum import Enum
from pydantic import BaseModel, Field, field_validator


class TravelStatus(str, Enum):
	"""Travel status enumeration (computed, not stored)."""
	PLANNED = "planned"  # Travel is planned but not started
	ONGOING = "ongoing"  # Travel is currently in progress
	COMPLETED = "completed"  # Travel has been completed
	CANCELLED = "cancelled"  # Travel has been cancelled


# Base schemas
class TravelStageCreateNested(BaseModel):
	"""Travel stage for nested creation with coordinates."""
	latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
	longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
	start_date: date
	end_date: date
	people_count: int = Field(..., gt=0, description="Number of people traveling")

	@field_validator('end_date')
	@classmethod
	def validate_dates(cls, v, info):
		if 'start_date' in info.data and v < info.data['start_date']:
			raise ValueError('end_date must be after or equal to start_date')
		return v


# Create schemas
class TravelCreate(BaseModel):
	"""Create travel schema - traveler_id is set automatically from current user."""
	cancelled: bool = False
	stages: list[TravelStageCreateNested] = Field(..., min_length=1, description="At least one stage is required")


# Update schemas (PUT - full replacement)
class TravelUpdate(BaseModel):
	"""Update travel schema - replaces all stages. All fields required."""
	cancelled: bool = False
	stages: list[TravelStageCreateNested] = Field(..., min_length=1, description="At least one stage is required")


# Response schemas
class LocationResponse(BaseModel):
	id: int
	latitude: float
	longitude: float
	
	class Config:
		from_attributes = True


class TravelStageResponse(BaseModel):
	id: int
	travel_id: int
	location: LocationResponse
	start_date: date
	end_date: date
	people_count: int

	class Config:
		from_attributes = True


class TravelResponse(BaseModel):
	id: int
	traveler_id: int
	cancelled: bool
	status: TravelStatus  # Computed field
	created_at: datetime
	updated_at: datetime
	finished_at: date | None  # Computed from last stage's end_date
	stages: list[TravelStageResponse] = []

	class Config:
		from_attributes = True
