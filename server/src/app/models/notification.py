from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, Text, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base


class NotificationType(str, Enum):
  """Notification type enumeration."""
  SMS = "sms"
  EMAIL = "email"


class Notification(Base):
  """Notification sent from evacuation to traveler."""
  __tablename__ = "notifications"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  notification_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
  content: Mapped[str] = mapped_column(Text, nullable=False)
  date: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
  evacuation_id: Mapped[int] = mapped_column(Integer, ForeignKey("evacuations.id", ondelete="CASCADE"), nullable=False, index=True)
  traveler_profile_id: Mapped[int] = mapped_column(Integer, ForeignKey("traveler_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

  # Relationships
  evacuation: Mapped["Evacuation"] = relationship(back_populates="notifications")
  traveler_profile: Mapped["TravelerProfile"] = relationship(back_populates="notifications")

  def __repr__(self) -> str:
    return f"<Notification(id={self.id}, notification_type={self.notification_type}, evacuation_id={self.evacuation_id}, traveler_profile_id={self.traveler_profile_id})>"
