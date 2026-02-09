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


class EvacuationAssistantProfileBase(BaseModel):
  phone_number: str = Field(..., min_length=1, max_length=20)
  working_hours: str = Field(..., min_length=1, max_length=255)


# Create schemas
class UserCreate(UserBase):
  password: str = Field(..., min_length=8)
  role: UserRole


class TravelerCreate(UserCreate):
  role: UserRole = UserRole.TRAVELER
  traveler_profile: TravelerProfileBase


class EditorCreate(UserCreate):
  role: UserRole = UserRole.EDITOR


class CoordinatorCreate(UserCreate):
  role: UserRole = UserRole.COORDINATOR


class EvacuationAssistantCreate(UserCreate):
  role: UserRole = UserRole.EVACUATION_ASSISTANT
  evacuation_assistant_profile: EvacuationAssistantProfileBase


# Update schemas
class UserUpdate(BaseModel):
	email: EmailStr | None = None
	password: str | None = Field(None, min_length=8)
	first_name: str | None = Field(None, min_length=1, max_length=100)
	last_name: str | None = Field(None, min_length=1, max_length=100)


class TravelerProfileUpdate(BaseModel):
	phone_number: str | None = Field(None, min_length=1, max_length=20)
	national_id: str | None = Field(None, min_length=1, max_length=50)


class EvacuationAssistantProfileUpdate(BaseModel):
	phone_number: str | None = Field(None, min_length=1, max_length=20)
	working_hours: str | None = Field(None, min_length=1, max_length=255)


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


class EditorProfileResponse(BaseModel):
  id: int
  user_id: int

  class Config:
    from_attributes = True


class CoordinatorProfileResponse(BaseModel):
  id: int
  user_id: int

  class Config:
    from_attributes = True


class EvacuationAssistantProfileResponse(EvacuationAssistantProfileBase):
  id: int
  user_id: int

  class Config:
    from_attributes = True


class TravelerResponse(UserResponse):
  traveler_profile: TravelerProfileResponse | None = None

  class Config:
    from_attributes = True


class EditorResponse(UserResponse):
  editor_profile: EditorProfileResponse | None = None

  class Config:
    from_attributes = True


class CoordinatorResponse(UserResponse):
  coordinator_profile: CoordinatorProfileResponse | None = None

  class Config:
    from_attributes = True


class EvacuationAssistantResponse(UserResponse):
  evacuation_assistant_profile: EvacuationAssistantProfileResponse | None = None

  class Config:
    from_attributes = True


# Login schemas
class UserLogin(BaseModel):
  email: EmailStr
  password: str


class RefreshTokenRequest(BaseModel):
  refresh_token: str


class Token(BaseModel):
	access_token: str
	refresh_token: str
	token_type: str = "bearer"
