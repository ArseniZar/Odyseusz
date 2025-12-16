from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_db
from app.core.security import verify_token
from app.crud.user import get_user_by_id
from app.models.user import User

security = HTTPBearer()


async def get_current_user(
	credentials: HTTPAuthorizationCredentials = Depends(security),
	db: AsyncSession = Depends(get_db)
) -> User:
	"""Get the current authenticated user from JWT token."""
	credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail="Could not validate credentials",
		headers={"WWW-Authenticate": "Bearer"},
	)
	
	token = credentials.credentials
	payload = verify_token(token, token_type="access")
	if payload is None:
		raise credentials_exception
	
	user_id: Optional[int] = payload.get("sub")
	if user_id is None:
		raise credentials_exception
	
	user = await get_user_by_id(db, user_id)
	if user is None:
		raise credentials_exception
	
	return user


async def get_current_active_user(
	current_user: User = Depends(get_current_user)
) -> User:
	"""Get the current active user."""
	if not current_user.is_active:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Inactive user"
		)
	return current_user
