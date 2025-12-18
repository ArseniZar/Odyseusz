from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base


class DangerLevel(str, Enum):
  """Country danger level enumeration."""
  LOW = "low"  # Exercise normal security precautions
  MODERATE = "moderate"  # Exercise a high degree of caution
  HIGH = "high"  # Avoid non-essential travel
  SEVERE = "severe"  # Avoid all travel


# Association table for many-to-many relationship between editors and country profiles
editor_country_association = Table(
  'editor_country_links',
  Base.metadata,
  Column('id', Integer, primary_key=True, autoincrement=True),
  Column('editor_id', Integer, ForeignKey('editor_profiles.id', ondelete='CASCADE'), nullable=False, index=True),
  Column('country_profile_id', Integer, ForeignKey('country_profiles.id', ondelete='CASCADE'), nullable=False, index=True),
  Column('created_at', DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
)


# Association table for many-to-many relationship between consulates and country profiles
consulate_country_association = Table(
  'consulate_country_links',
  Base.metadata,
  Column('id', Integer, primary_key=True, autoincrement=True),
  Column('consulate_id', Integer, ForeignKey('consulates.id', ondelete='CASCADE'), nullable=False, index=True),
  Column('country_profile_id', Integer, ForeignKey('country_profiles.id', ondelete='CASCADE'), nullable=False, index=True),
  Column('created_at', DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
)


class CountryProfile(Base):
  """Country profile with travel information and warnings."""
  __tablename__ = "country_profiles"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
  description: Mapped[str] = mapped_column(Text, nullable=False)
  danger_level: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

  # Relationships
  consulates: Mapped[list["Consulate"]] = relationship(
    secondary=consulate_country_association,
    back_populates="country_profiles"
  )
  editors: Mapped[list["EditorProfile"]] = relationship(
    secondary=editor_country_association,
    back_populates="country_profiles"
  )

  def __repr__(self) -> str:
    return f"<CountryProfile(id={self.id}, name={self.name}, danger_level={self.danger_level})>"


class Consulate(Base):
  """Consulate information for a country."""
  __tablename__ = "consulates"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
  country_profile_id: Mapped[int] = mapped_column(Integer, ForeignKey("country_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
  address: Mapped[str] = mapped_column(String(500), nullable=False)
  email: Mapped[str] = mapped_column(String(255), nullable=False)
  phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
  website: Mapped[str | None] = mapped_column(String(255), nullable=True)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

  # Relationships
  country_profiles: Mapped[list["CountryProfile"]] = relationship(
    secondary=consulate_country_association,
    back_populates="consulates"
  )

  def __repr__(self) -> str:
    return f"<Consulate(id={self.id}, country_profile_id={self.country_profile_id}, email={self.email})>"
