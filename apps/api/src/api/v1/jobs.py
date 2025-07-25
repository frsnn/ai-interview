from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.db.models.job import Job
from src.db.session import get_session
from src.auth import admin_required
from src.api.v1.schemas import JobCreate, JobRead, JobUpdate

router = APIRouter(prefix="/jobs", tags=["jobs"])


class JobCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: str | None = None


class JobRead(BaseModel):
    id: int
    title: str
    description: str | None = None

    class Config:
        orm_mode = True


@router.get("/", response_model=List[JobRead])
async def list_jobs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Job))
    return result.scalars().all()


@router.post("/", response_model=JobRead, status_code=status.HTTP_201_CREATED)
async def create_job(job_in: JobCreate, session: AsyncSession = Depends(get_session)):
    job = Job(title=job_in.title, description=job_in.description)
    session.add(job)
    await session.commit()
    await session.refresh(job)
    return job


@router.put("/{job_id}", response_model=JobRead, dependencies=[Depends(admin_required)])
async def update_job(job_id: int, job_in: JobUpdate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    for field, value in job_in.dict(exclude_unset=True).items():
        setattr(job, field, value)
    await session.commit()
    await session.refresh(job)
    return job


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(admin_required)])
async def delete_job(job_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    await session.delete(job)
    await session.commit() 