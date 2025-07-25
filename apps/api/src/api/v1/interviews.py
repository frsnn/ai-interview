from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import admin_required
from src.api.v1.schemas import InterviewCreate, InterviewRead, InterviewStatusUpdate
from src.db.models.interview import Interview
from src.db.session import get_session

router = APIRouter(prefix="/interviews", tags=["interviews"], dependencies=[Depends(admin_required)])


@router.post("/", response_model=InterviewRead, status_code=status.HTTP_201_CREATED)
async def create_interview(int_in: InterviewCreate, session: AsyncSession = Depends(get_session)):
    interview = Interview(**int_in.dict())
    session.add(interview)
    await session.commit()
    await session.refresh(interview)
    return interview


@router.get("/", response_model=List[InterviewRead])
async def list_interviews(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Interview))
    return result.scalars().all()


@router.patch("/{int_id}/status", response_model=InterviewRead)
async def update_status(int_id: int, status_in: InterviewStatusUpdate, session: AsyncSession = Depends(get_session)):
    interview = (await session.execute(select(Interview).where(Interview.id == int_id))).scalar_one_or_none()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    interview.status = status_in.status
    await session.commit()
    await session.refresh(interview)
    return interview 