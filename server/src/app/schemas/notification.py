from datetime import datetime
from pydantic import BaseModel, Field
from app.models.notification import NotificationType


# Base schemas
class NotificationBase(BaseModel):
  notification_type: NotificationType
  content: str = Field(..., min_length=1)


# Create schemas
class NotificationCreate(NotificationBase):
  evacuation_id: int
  traveler_profile_id: int


# Response schemas
class NotificationResponse(NotificationBase):
  id: int
  date: datetime
  evacuation_id: int
  traveler_profile_id: int
  created_at: datetime

  class Config:
    from_attributes = True
    