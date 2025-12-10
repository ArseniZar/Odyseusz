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


# Create schemas
class EvacuationCreate(EvacuationBase):
  coordinator_id: int


class EvacuationAreaCreate(EvacuationAreaBase):
  evacuation_id: int


class AssemblyPointCreate(AssemblyPointBase):
  evacuation_id: int


# Update schemas
class EvacuationUpdate(BaseModel):
  name: str | None = Field(None, min_length=1, max_length=255)
  reason: str | None = Field(None, min_length=1, max_length=255)
  description: str | None = Field(None, min_length=1)
  active: bool | None = None


class EvacuationAreaUpdate(BaseModel):
  location_id: int | None = None
  radius: int | None = Field(None, gt=0)


class AssemblyPointUpdate(BaseModel):
  location_id: int | None = None
  name: str | None = Field(None, min_length=1, max_length=255)
  description: str | None = None


# Response schemas
class EvacuationAreaResponse(EvacuationAreaBase):
  id: int
  evacuation_id: int
  created_at: datetime

  class Config:
    from_attributes = True


class AssemblyPointResponse(AssemblyPointBase):
  id: int
  evacuation_id: int
  created_at: datetime

  class Config:
    from_attributes = True


class EvacuationResponse(EvacuationBase):
  id: int
  coordinator_id: int
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True


class EvacuationDetailResponse(EvacuationResponse):
  areas: list[EvacuationAreaResponse] = []
  assembly_points: list[AssemblyPointResponse] = []

  class Config:
    from_attributes = True


# Association schemas
class EvacuationAssistantLinkCreate(BaseModel):
  evacuation_id: int
  assistant_id: int
  