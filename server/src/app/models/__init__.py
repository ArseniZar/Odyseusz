"""
SQLAlchemy models package.
All models must be imported here to ensure they are registered with SQLAlchemy's metadata.
"""
from app.models.location import Location
from app.models.user import User, EditorProfile, CoordinatorProfile, TravelerProfile, EvacuationAssistantProfile
from app.models.country import CountryProfile, Consulate
from app.models.refresh_token import RefreshToken
from app.models.notification import Notification
from app.models.evacuation import Evacuation, EvacuationArea, AssemblyPoint
from app.models.travel import Travel, TravelStage

__all__ = [
  "Location",
  "User",
  "EditorProfile",
  "CoordinatorProfile",
  "TravelerProfile",
  "EvacuationAssistantProfile",
  "CountryProfile",
  "Consulate",
  "RefreshToken",
  "Notification",
  "Evacuation",
  "EvacuationArea",
  "AssemblyPoint",
  "Travel",
  "TravelStage",
]
