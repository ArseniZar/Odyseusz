from pydantic import BaseModel, Field


# Base schemas
class LocationBase(BaseModel):
  latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
  longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")


# Create schemas
class LocationCreate(LocationBase):
  pass


# Update schemas
class LocationUpdate(BaseModel):
  latitude: float | None = Field(None, ge=-90, le=90)
  longitude: float | None = Field(None, ge=-180, le=180)


# Response schemas
class LocationResponse(LocationBase):
  id: int

  class Config:
    from_attributes = True
    