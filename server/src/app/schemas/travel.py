from datetime import date, datetime
from pydantic import BaseModel, Field, field_validator


# Base schemas
class TravelStageBase(BaseModel):
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


class TravelBase(BaseModel):
	pass


# Create schemas
class TravelStageCreate(TravelStageBase):
	pass


class TravelCreate(BaseModel):
	"""Create travel schema - traveler_id is set automatically from current user."""
	stages: list[TravelStageCreate] = Field(..., min_length=1, description="At least one stage is required")


# Update schemas
class TravelStageUpdate(BaseModel):
	latitude: float | None = Field(None, ge=-90, le=90)
	longitude: float | None = Field(None, ge=-180, le=180)
	start_date: date | None = None
	end_date: date | None = None
	people_count: int | None = Field(None, gt=0)


# Response schemas - keep location_id in response for backward compatibility
class TravelStageResponse(BaseModel):
	id: int
	travel_id: int
	location_id: int
	latitude: float
	longitude: float
	start_date: date
	end_date: date
	people_count: int

	class Config:
		from_attributes = True


class TravelResponse(TravelBase):
	id: int
	traveler_id: int
	created_at: datetime

	class Config:
		from_attributes = True


class TravelDetailResponse(TravelResponse):
	stages: list[TravelStageResponse] = []

	class Config:
		from_attributes = True
