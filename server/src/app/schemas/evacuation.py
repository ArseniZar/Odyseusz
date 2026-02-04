from datetime import datetime
from pydantic import BaseModel, Field


# Base schemas
class EvacuationBase(BaseModel):
  name: str = Field(..., min_length=1, max_length=255)
  reason: str = Field(..., min_length=1, max_length=255)
  description: str = Field(..., min_length=1)
  active: bool = True


class EvacuationAreaBase(BaseModel):
  location_id: int
  radius: int = Field(..., gt=0, description="Radius in kilometers")


class AssemblyPointBase(BaseModel):
  location_id: int
  name: str = Field(..., min_length=1, max_length=255)
  description: str | None = None


# Create schemas with nested structures (with coordinates)
class EvacuationAreaCreateNested(BaseModel):
  """Evacuation area for nested creation with coordinates."""
  latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
  longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
  radius: int = Field(..., gt=0, description="Radius in kilometers")


class AssemblyPointCreateNested(BaseModel):
  """Assembly point for nested creation with coordinates."""
  latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
  longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
  name: str = Field(..., min_length=1, max_length=255)
  description: str | None = None


class EvacuationCreate(EvacuationBase):
  coordinator_id: int
  areas: list[EvacuationAreaCreateNested] = []
  assembly_points: list[AssemblyPointCreateNested] = []
  assistant_ids: list[int] = []


class EvacuationAreaCreate(EvacuationAreaBase):
  evacuation_id: int


class AssemblyPointCreate(AssemblyPointBase):
  evacuation_id: int


# Update schemas (for PUT - full replacement)
class EvacuationUpdate(BaseModel):
  name: str = Field(..., min_length=1, max_length=255)
  reason: str = Field(..., min_length=1, max_length=255)
  description: str = Field(..., min_length=1)
  active: bool = True
  areas: list[EvacuationAreaCreateNested] = []
  assembly_points: list[AssemblyPointCreateNested] = []
  assistant_ids: list[int] = []


class EvacuationAreaUpdate(BaseModel):
  location_id: int | None = None
  radius: int | None = Field(None, gt=0)


class AssemblyPointUpdate(BaseModel):
  location_id: int | None = None
  name: str | None = Field(None, min_length=1, max_length=255)
  description: str | None = None


# Response schemas
class LocationResponse(BaseModel):
  id: int
  latitude: float
  longitude: float
  
  class Config:
    from_attributes = True


class EvacuationAreaResponse(BaseModel):
  id: int
  evacuation_id: int
  radius: int
  location: LocationResponse
  created_at: datetime

  class Config:
    from_attributes = True


class AssemblyPointResponse(BaseModel):
  id: int
  evacuation_id: int
  name: str
  description: str | None
  location: LocationResponse
  created_at: datetime

  class Config:
    from_attributes = True


class EvacuationResponse(EvacuationBase):
  id: int
  coordinator_id: int
  last_active_at: datetime | None
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True


class EvacuationDetailResponse(EvacuationResponse):
  areas: list[EvacuationAreaResponse] = []
  assembly_points: list[AssemblyPointResponse] = []
  assistants: list[EvacuationAssistantResponse] = []

  class Config:
    from_attributes = True


class EvacuationAssistantLinkCreate(BaseModel):
  evacuation_id: int
  assistant_id: int


class EvacuationAssistantResponse(BaseModel):
  id: int
  user_id: int
  phone_number: str
  working_hours: str
  
  class Config:
    from_attributes = True
  