from sqlalchemy import Float, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.core.db import Base


class Location(Base):
  """Geographical location with coordinates."""
  __tablename__ = "locations"

  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  latitude: Mapped[float] = mapped_column(Float, nullable=False)
  longitude: Mapped[float] = mapped_column(Float, nullable=False)

  __table_args__ = (
    CheckConstraint('latitude >= -90 AND latitude <= 90', name='valid_latitude'),
    CheckConstraint('longitude >= -180 AND longitude <= 180', name='valid_longitude'),
  )

  def __repr__(self) -> str:
    return f"<Location(id={self.id}, lat={self.latitude}, lon={self.longitude})>"
