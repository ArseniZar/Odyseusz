from datetime import datetime, timedelta, timezone
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.refresh_token import RefreshToken
from app.core.config import settings


async def create_refresh_token(db: AsyncSession, token: str, user_id: int) -> RefreshToken:
	"""Create a new refresh token."""
	expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
	refresh_token = RefreshToken(
		token=token,
		user_id=user_id,
		expires_at=expires_at,
	)
	db.add(refresh_token)
	await db.commit()
	await db.refresh(refresh_token)
	return refresh_token


async def get_refresh_token(db: AsyncSession, token: str) -> RefreshToken | None:
	"""Get a refresh token by token string."""
	result = await db.execute(
		select(RefreshToken).where(
			and_(
				RefreshToken.token == token,
				RefreshToken.is_revoked == False,
				RefreshToken.expires_at > datetime.now(timezone.utc)
			)
		)
	)
	return result.scalar_one_or_none()


async def revoke_refresh_token(db: AsyncSession, token: str) -> bool:
	"""Revoke a refresh token."""
	refresh_token = await get_refresh_token(db, token)
	if not refresh_token:
		return False
	
	refresh_token.is_revoked = True
	await db.commit()
	return True


async def revoke_all_user_tokens(db: AsyncSession, user_id: int) -> None:
	"""Revoke all refresh tokens for a user."""
	result = await db.execute(
		select(RefreshToken).where(
			and_(
				RefreshToken.user_id == user_id,
				RefreshToken.is_revoked == False
			)
		)
	)
	tokens = result.scalars().all()
	for token in tokens:
		token.is_revoked = True
	await db.commit()


async def cleanup_expired_tokens(db: AsyncSession) -> int:
	"""Delete expired refresh tokens. Returns count of deleted tokens."""
	result = await db.execute(
		select(RefreshToken).where(RefreshToken.expires_at < datetime.now(timezone.utc))
	)
	expired_tokens = result.scalars().all()
	count = len(expired_tokens)
	for token in expired_tokens:
		await db.delete(token)
	await db.commit()
	return count
