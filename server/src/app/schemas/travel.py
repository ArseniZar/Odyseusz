from datetime import date, datetime
from pydantic import BaseModel, Field, field_validator


# Base schemas
class TravelStageBase(BaseModel):
  location_id: int
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


class TravelCreate(TravelBase):
  traveler_id: int
  stages: list[TravelStageCreate] = []


# Update schemas
class TravelStageUpdate(BaseModel):
  location_id: int | None = None
  start_date: date | None = None
  end_date: date | None = None
  people_count: int | None = Field(None, gt=0)


# Response schemas
class TravelStageResponse(TravelStageBase):
  id: int
  travel_id: int

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
    