from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from app.models.user import UserRole


# Base schemas
class UserBase(BaseModel):
  email: EmailStr
  first_name: str = Field(..., min_length=1, max_length=100)
  last_name: str = Field(..., min_length=1, max_length=100)


class TravelerProfileBase(BaseModel):
  phone_number: str = Field(..., min_length=1, max_length=20)
  national_id: str = Field(..., min_length=1, max_length=50)


# Create schemas
class UserCreate(UserBase):
  password: str = Field(..., min_length=8)
  role: UserRole


class TravelerCreate(UserCreate):
  role: UserRole = UserRole.TRAVELER
  traveler_profile: TravelerProfileBase


# Response schemas
class UserResponse(UserBase):
  id: int
  role: str
  is_active: bool
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True


class TravelerProfileResponse(TravelerProfileBase):
  id: int
  user_id: int

  class Config:
    from_attributes = True


class TravelerResponse(UserResponse):
  traveler_profile: TravelerProfileResponse | None = None

  class Config:
    from_attributes = True


# Login schemas
class UserLogin(BaseModel):
  email: EmailStr
  password: str


class Token(BaseModel):
  access_token: str
  token_type: str = "bearer"