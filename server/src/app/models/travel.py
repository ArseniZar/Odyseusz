from datetime import date, datetime
from sqlalchemy import Date, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base


class Travel(Base):
  """Travel record for a traveler."""
  __tablename__ = "travels"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  traveler_id: Mapped[int] = mapped_column(Integer, ForeignKey("traveler_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(datetime.timezone.utc), nullable=False)

  # Relationships
  traveler: Mapped["TravelerProfile"] = relationship(back_populates="travels")
  stages: Mapped[list["TravelStage"]] = relationship(back_populates="travel", cascade="all, delete-orphan")


class TravelStage(Base):
  """A stage/checkpoint in a travel journey."""
  __tablename__ = "travel_stages"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  travel_id: Mapped[int] = mapped_column(Integer, ForeignKey("travels.id", ondelete="CASCADE"), nullable=False, index=True)
  location_id: Mapped[int] = mapped_column(Integer, ForeignKey("locations.id"), nullable=False)
  start_date: Mapped[date] = mapped_column(Date, nullable=False)
  end_date: Mapped[date] = mapped_column(Date, nullable=False)
  people_count: Mapped[int] = mapped_column(Integer, nullable=False)

  # Relationships
  travel: Mapped["Travel"] = relationship(back_populates="stages")
  location: Mapped["Location"] = relationship()
