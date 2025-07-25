from datetime import timedelta
from typing import Optional

from fastapi import Depends, Request, HTTPException
from fastapi_users import FastAPIUsers, schemas as fu_schemas
from fastapi_users.authentication import JWTStrategy, AuthenticationBackend, BearerTransport
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from fastapi_users.manager import BaseUserManager
from fastapi_users.password import PasswordHelper
from fastapi_users import IntegerIDMixin
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings
from src.db.models.user import User
from src.db.session import get_session

SECRET = settings.db_password + settings.db_user  # simple example, use JWT_SECRET env later

# Pydantic Schemas --------------------------------------------------

class UserRead(fu_schemas.BaseUser[int]):
    first_name: Optional[str]
    last_name: Optional[str]
    is_admin: bool


class UserCreate(fu_schemas.BaseUserCreate):
    first_name: Optional[str]
    last_name: Optional[str]
    is_admin: Optional[bool] = False


class UserUpdate(fu_schemas.BaseUserUpdate):
    first_name: Optional[str]
    last_name: Optional[str]
    is_admin: Optional[bool]


# Database dependency ----------------------------------------------

async def get_user_db(session: AsyncSession = Depends(get_session)):
    yield SQLAlchemyUserDatabase(session, User)


# User manager ------------------------------------------------------

class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} forgot password. Reset token: {token}")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


# Auth backend ------------------------------------------------------

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=60 * 60 * 8)

bearer_transport = BearerTransport(tokenUrl="auth/login")

jwt_backend = AuthenticationBackend(name="jwt", transport=bearer_transport, get_strategy=get_jwt_strategy)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager=get_user_manager,
    auth_backends=[jwt_backend],
)

current_active_user = fastapi_users.current_user(active=True)

# Admin dependency (must be after current_active_user)

async def admin_required(user: User = Depends(current_active_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user 