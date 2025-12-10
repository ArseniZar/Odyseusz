from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate


async def get_notification_by_id(
  db: AsyncSession, 
  notification_id: int
) -> Notification | None:
  """Get notification by ID."""
  result = await db.execute(
    select(Notification).where(Notification.id == notification_id)
  )
  return result.scalar_one_or_none()


async def get_notifications_by_traveler(
  db: AsyncSession,
  traveler_profile_id: int,
  skip: int = 0,
  limit: int = 100
) -> list[Notification]:
  """Get all notifications for a traveler."""
  result = await db.execute(
    select(Notification)
    .where(Notification.traveler_profile_id == traveler_profile_id)
    .order_by(Notification.date.desc())
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def get_notifications_by_evacuation(
  db: AsyncSession,
  evacuation_id: int,
  skip: int = 0,
  limit: int = 100
) -> list[Notification]:
  """Get all notifications for an evacuation."""
  result = await db.execute(
    select(Notification)
    .where(Notification.evacuation_id == evacuation_id)
    .order_by(Notification.date.desc())
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def get_notifications_by_type(
  db: AsyncSession,
  notification_type: str,
  skip: int = 0,
  limit: int = 100
) -> list[Notification]:
  """Get notifications by type."""
  result = await db.execute(
    select(Notification)
    .where(Notification.notification_type == notification_type)
    .order_by(Notification.date.desc())
    .offset(skip)
    .limit(limit)
  )
  return list(result.scalars().all())


async def create_notification(
  db: AsyncSession, 
  notification_create: NotificationCreate
) -> Notification:
  """Create a new notification."""
  notification = Notification(
    notification_type=notification_create.notification_type,
    content=notification_create.content,
    evacuation_id=notification_create.evacuation_id,
    traveler_profile_id=notification_create.traveler_profile_id,
  )
  db.add(notification)
  await db.commit()
  await db.refresh(notification)
  return notification


async def delete_notification(db: AsyncSession, notification_id: int) -> bool:
  """Delete a notification."""
  notification = await get_notification_by_id(db, notification_id)
  if not notification:
    return False

  await db.delete(notification)
  await db.commit()
  return True


async def delete_notifications_by_evacuation(
  db: AsyncSession, 
  evacuation_id: int
) -> int:
  """Delete all notifications for an evacuation. Returns count of deleted."""
  result = await db.execute(
    select(Notification).where(Notification.evacuation_id == evacuation_id)
  )
  notifications = result.scalars().all()
  
  count = len(notifications)
  for notification in notifications:
    await db.delete(notification)
  
  await db.commit()
  return count
  