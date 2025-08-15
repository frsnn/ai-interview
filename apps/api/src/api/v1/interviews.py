from typing import List

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import current_active_user
from src.db.models.user import User
from src.db.models.job import Job
from src.db.models.interview import Interview
from src.db.session import get_session
from src.api.v1.schemas import InterviewCreate, InterviewRead, InterviewStatusUpdate, InterviewMediaUpdate
from src.services.analysis import generate_rule_based_analysis

router = APIRouter(prefix="/interviews", tags=["interviews"])

# Endpoint open to candidate via token (no admin_required) to attach media URLs
candidate_router = APIRouter(prefix="/interviews")


@router.post("/", response_model=InterviewRead, status_code=status.HTTP_201_CREATED)
async def create_interview(int_in: InterviewCreate, session: AsyncSession = Depends(get_session)):
    interview = Interview(**int_in.dict())
    session.add(interview)
    await session.commit()
    await session.refresh(interview)
    return interview


@router.get("/", response_model=List[InterviewRead])
async def list_interviews(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(current_active_user)
):
    # Only show interviews for jobs that belong to the current user
    result = await session.execute(
        select(Interview)
        .join(Job, Interview.job_id == Job.id)
        .where(Job.user_id == current_user.id)
    )
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


# --- Candidate uploads media URLs (audio / video) ---


@candidate_router.patch("/{token}/media", response_model=InterviewRead)
async def upload_media(token:str, media_in:InterviewMediaUpdate, session:AsyncSession=Depends(get_session), request: Request = None):
    # Find interview by candidate token (latest)
    from src.db.models.candidate import Candidate
    cand = (await session.execute(select(Candidate).where(Candidate.token==token))).scalar_one_or_none()
    if not cand:
        raise HTTPException(status_code=404, detail="Invalid token")
    interview = (
        await session.execute(select(Interview).where(Interview.candidate_id==cand.id).order_by(Interview.created_at.desc()))
    ).scalar_one_or_none()
    if not interview:
        # Create new interview if none exists (first job as placeholder)
        from src.db.models.job import Job
        job = (await session.execute(select(Job).limit(1))).scalar_one_or_none()
        if not job:
            raise HTTPException(status_code=400, detail="No job available to attach interview")
        interview = Interview(job_id=job.id, candidate_id=cand.id, status="completed")
        session.add(interview)
        await session.flush()
    if media_in.audio_url:
        interview.audio_url = media_in.audio_url
    if media_in.video_url:
        interview.video_url = media_in.video_url
    # Mark completion metadata
    from datetime import datetime, timezone
    interview.completed_at = datetime.now(timezone.utc)
    try:
        ip = request.client.host if request and request.client else None
        interview.completed_ip = ip
    except Exception:
        pass

    await session.commit()
    await session.refresh(interview)

    # Auto-generate analysis after media is saved
    try:
        await generate_rule_based_analysis(session, interview.id)
    except Exception as e:
        # Non-blocking
        print("[analysis] generation failed:", e)
    return interview 