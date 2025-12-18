from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base


class RefreshToken(Base):
	"""Refresh token model for JWT token refresh functionality."""
	__tablename__ = "refresh_tokens"

	id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
	token: Mapped[str] = mapped_column(String(500), unique=True, index=True, nullable=False)
	user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
	is_revoked: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
	expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
	created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

	# Relationships
	user: Mapped["User"] = relationship(back_populates="refresh_tokens")

	def __repr__(self) -> str:
		return f"<RefreshToken(id={self.id}, user_id={self.user_id}, is_revoked={self.is_revoked})>"
