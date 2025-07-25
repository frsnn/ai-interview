from typing import List
from uuid import uuid4
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from src.auth import admin_required
from src.api.v1.schemas import CandidateCreate, CandidateRead, CandidateUpdate
from src.db.models.candidate import Candidate
from src.db.session import get_session

router = APIRouter(prefix="/candidates", tags=["candidates"])


@router.get("/", response_model=List[CandidateRead])
async def list_candidates(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Candidate))
    return result.scalars().all()


@router.post("/", response_model=CandidateRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_required)])
async def create_candidate(candidate_in: CandidateCreate, session: AsyncSession = Depends(get_session)):
    candidate = Candidate(**candidate_in.dict())
    candidate.token = uuid4().hex
    candidate.expires_at = datetime.utcnow() + timedelta(days=3)
    session.add(candidate)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")
    await session.refresh(candidate)
    print(f"[MAIL MOCK] To: {candidate.email} – Link: http://localhost:3000/interview/{candidate.token}")
    return candidate


# resend link
@router.post("/{cand_id}/send-link", dependencies=[Depends(admin_required)])
async def resend_link(cand_id:int, session:AsyncSession=Depends(get_session)):
    cand = (await session.execute(select(Candidate).where(Candidate.id==cand_id))).scalar_one_or_none()
    if not cand:
        raise HTTPException(status_code=404, detail="Candidate not found")
    print(f"[MAIL MOCK] To: {cand.email} – Link: http://localhost:3000/interview/{cand.token}")
    return {"detail":"sent"}


@router.put("/{cand_id}", response_model=CandidateRead, dependencies=[Depends(admin_required)])
async def update_candidate(cand_id: int, cand_in: CandidateUpdate, session: AsyncSession = Depends(get_session)):
    cand = (await session.execute(select(Candidate).where(Candidate.id == cand_id))).scalar_one_or_none()
    if not cand:
        raise HTTPException(status_code=404, detail="Candidate not found")
    for field, value in cand_in.dict(exclude_unset=True).items():
        setattr(cand, field, value)
    await session.commit()
    await session.refresh(cand)
    return cand


@router.delete("/{cand_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(admin_required)])
async def delete_candidate(cand_id: int, session: AsyncSession = Depends(get_session)):
    cand = (await session.execute(select(Candidate).where(Candidate.id == cand_id))).scalar_one_or_none()
    if not cand:
        raise HTTPException(status_code=404, detail="Candidate not found")
    await session.delete(cand)
    await session.commit() 