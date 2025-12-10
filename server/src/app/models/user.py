from datetime import datetime
from enum import Enum
from sqlalchemy import Boolean, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base


class UserRole(str, Enum):
	"""User role enumeration."""
	TRAVELER = "traveler"
	EDITOR = "editor"
	COORDINATOR = "coordinator"
	EVACUATION_ASSISTANT = "evacuation_assistant"


class User(Base):
	"""Base user model for authentication and common user data."""
	__tablename__ = "users"

	id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
	email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
	password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
	first_name: Mapped[str] = mapped_column(String(100), nullable=False)
	last_name: Mapped[str] = mapped_column(String(100), nullable=False)
	role: Mapped[str] = mapped_column(String(50), nullable=False)
	is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
	created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(datetime.timezone.utc), nullable=False)
	updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.now(datetime.timezone.utc), nullable=False)

	# Relationships
	traveler_profile: Mapped["TravelerProfile"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
	editor_profile: Mapped["EditorProfile"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
	coordinator_profile: Mapped["CoordinatorProfile"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
	evacuation_assistant_profile: Mapped["EvacuationAssistantProfile"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")

	def __repr__(self) -> str:
		return f"<User(id={self.id}, email={self.email}, role={self.role})>"


class TravelerProfile(Base):
	"""Additional data for traveler users."""
	__tablename__ = "traveler_profiles"

	id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
	user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
	phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
	national_id: Mapped[str] = mapped_column(String(50), nullable=False)

	# Relationships
	user: Mapped["User"] = relationship(back_populates="traveler_profile")
	travels: Mapped[list["Travel"]] = relationship(back_populates="traveler", cascade="all, delete-orphan")
	notifications: Mapped[list["Notification"]] = relationship(back_populates="traveler_profile", cascade="all, delete-orphan")


class EditorProfile(Base):
	"""Additional data for editor users."""
	__tablename__ = "editor_profiles"

	id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
	user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

	# Relationships
	user: Mapped["User"] = relationship(back_populates="editor_profile")
	country_profiles: Mapped[list["CountryProfile"]] = relationship(
    secondary="editor_country_links",
    back_populates="editors"
  )


class CoordinatorProfile(Base):
	"""Additional data for coordinator users."""
	__tablename__ = "coordinator_profiles"

	id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
	user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

	# Relationships
	user: Mapped["User"] = relationship(back_populates="coordinator_profile")
	evacuations: Mapped[list["Evacuation"]] = relationship(back_populates="coordinator", cascade="all, delete-orphan")


class EvacuationAssistantProfile(Base):
	"""Additional data for evacuation assistant users."""
	__tablename__ = "evacuation_assistant_profiles"

	id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
	user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
	phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
	working_hours: Mapped[str] = mapped_column(String(255), nullable=False)

	# Relationships
	user: Mapped["User"] = relationship(back_populates="evacuation_assistant_profile")
	evacuations: Mapped[list["Evacuation"]] = relationship(
    secondary="evacuation_assistant_links",
    back_populates="assistants"
  )
