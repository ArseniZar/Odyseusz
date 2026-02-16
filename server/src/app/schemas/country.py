from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, HttpUrl
from app.models.country import DangerLevel


# Base schemas
class CountryProfileBase(BaseModel):
  name: str = Field(..., min_length=1, max_length=255)
  country_code: str = Field(..., min_length=2, max_length=2, pattern="^[A-Z]{2}$")
  description: str = Field(..., min_length=1)
  danger_level: DangerLevel


class ConsulateBase(BaseModel):
  address: str = Field(..., min_length=1, max_length=500)
  email: EmailStr
  phone_number: str = Field(..., min_length=1, max_length=20)
  website: str | None = Field(None, max_length=255)


# Create schemas
class CountryProfileCreate(CountryProfileBase):
  pass


# Public response schema (with danger_level)
class CountryProfilePublicResponse(BaseModel):
  id: int
  name: str
  country_code: str
  description: str
  danger_level: DangerLevel
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True


# Public response with consulates (with danger_level)
class CountryProfilePublicDetailResponse(CountryProfilePublicResponse):
  consulates: list["ConsulateResponse"] = []
  can_edit: bool = False

  class Config:
    from_attributes = True


class ConsulateCreate(ConsulateBase):
  country_profile_id: int


# Update schemas (PUT - full replacement)
class CountryProfileUpdate(BaseModel):
  description: str = Field(..., min_length=1)
  consulate_ids: list[int] = []


# Partial update schema for danger level (used by scheduler)
class CountryProfileDangerLevelUpdate(BaseModel):
  danger_level: DangerLevel


class ConsulateUpdate(BaseModel):
  address: str | None = Field(None, min_length=1, max_length=500)
  email: EmailStr | None = None
  phone_number: str | None = Field(None, min_length=1, max_length=20)
  website: str | None = Field(None, max_length=255)


# Response schemas
class ConsulateResponse(ConsulateBase):
  id: int
  country_profile_id: int
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True


class CountryProfileResponse(CountryProfileBase):
  id: int
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True


class CountryProfileDetailResponse(CountryProfileResponse):
  consulates: list[ConsulateResponse] = []

  class Config:
    from_attributes = True


# Association schemas
class EditorCountryLinkCreate(BaseModel):
  editor_id: int
  country_profile_id: int


class ConsulateCountryLinkCreate(BaseModel):
  consulate_id: int
  country_profile_id: int
  