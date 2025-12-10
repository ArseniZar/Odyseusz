from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, HttpUrl
from app.models.country import DangerLevel


# Base schemas
class CountryProfileBase(BaseModel):
  name: str = Field(..., min_length=1, max_length=255)
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


class ConsulateCreate(ConsulateBase):
  country_profile_id: int


# Update schemas
class CountryProfileUpdate(BaseModel):
  name: str | None = Field(None, min_length=1, max_length=255)
  description: str | None = Field(None, min_length=1)
  danger_level: DangerLevel | None = None


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
  