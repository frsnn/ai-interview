from fastapi import APIRouter

from src.auth import fastapi_users, jwt_backend, UserRead, UserCreate, UserUpdate

router = APIRouter(prefix="/auth", tags=["auth"])

router.include_router(
    fastapi_users.get_auth_router(jwt_backend),
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
) 