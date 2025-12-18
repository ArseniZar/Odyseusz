from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, Integer, String, Table, Text, ForeignKey, DateTime, column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base


# Association table for many-to-many relationship between evacuations and assistants
evacuation_assistant_association = Table(
  'evacuation_assistant_links',
  Base.metadata,
  Column('id', Integer, primary_key=True, autoincrement=True),
  Column('evacuation_id', Integer, ForeignKey('evacuations.id', ondelete='CASCADE'), nullable=False, index=True),
  Column('assistant_id', Integer, ForeignKey('evacuation_assistant_profiles.id', ondelete='CASCADE'), nullable=False, index=True),
  Column('created_at', DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
)


class Evacuation(Base):
  """Evacuation operation."""
  __tablename__ = "evacuations"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
  reason: Mapped[str] = mapped_column(String(255), nullable=False)
  description: Mapped[str] = mapped_column(Text, nullable=False)
  active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, index=True)
  coordinator_id: Mapped[int] = mapped_column(Integer, ForeignKey("coordinator_profiles.id"), nullable=False, index=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

  # Relationships
  coordinator: Mapped["CoordinatorProfile"] = relationship(back_populates="evacuations")
  areas: Mapped[list["EvacuationArea"]] = relationship(back_populates="evacuation", cascade="all, delete-orphan")
  assembly_points: Mapped[list["AssemblyPoint"]] = relationship(back_populates="evacuation", cascade="all, delete-orphan")
  assistants: Mapped[list["EvacuationAssistantProfile"]] = relationship(
    secondary=evacuation_assistant_association,
    back_populates="evacuations"
  )
  notifications: Mapped[list["Notification"]] = relationship(back_populates="evacuation", cascade="all, delete-orphan")

  def __repr__(self) -> str:
    return f"<Evacuation(id={self.id}, name={self.name}, active={self.active})>"


class EvacuationArea(Base):
  """Area affected by evacuation."""
  __tablename__ = "evacuation_areas"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  evacuation_id: Mapped[int] = mapped_column(Integer, ForeignKey("evacuations.id", ondelete="CASCADE"), nullable=False, index=True)
  location_id: Mapped[int] = mapped_column(Integer, ForeignKey("locations.id"), nullable=False)
  radius: Mapped[int] = mapped_column(Integer, nullable=False)  # in kilometers
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

  # Relationships
  evacuation: Mapped["Evacuation"] = relationship(back_populates="areas")
  location: Mapped["Location"] = relationship()

  def __repr__(self) -> str:
    return f"<EvacuationArea(id={self.id}, evacuation_id={self.evacuation_id}, radius={self.radius}m)>"


class AssemblyPoint(Base):
  """Assembly/meeting point for evacuation."""
  __tablename__ = "assembly_points"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  evacuation_id: Mapped[int] = mapped_column(Integer, ForeignKey("evacuations.id", ondelete="CASCADE"), nullable=False, index=True)
  location_id: Mapped[int] = mapped_column(Integer, ForeignKey("locations.id"), nullable=False)
  name: Mapped[str] = mapped_column(String(255), nullable=False)
  description: Mapped[str | None] = mapped_column(Text, nullable=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

  # Relationships
  evacuation: Mapped["Evacuation"] = relationship(back_populates="assembly_points")
  location: Mapped["Location"] = relationship()

  def __repr__(self) -> str:
    return f"<AssemblyPoint(id={self.id}, name={self.name}, evacuation_id={self.evacuation_id})>"
