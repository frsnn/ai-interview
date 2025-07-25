from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone

from src.db.session import get_session
from src.db.models.candidate import Candidate
from src.api.v1.schemas import CandidateRead

router = APIRouter(prefix="/tokens", tags=["tokens"])


@router.post("/verify", response_model=CandidateRead)
async def verify_token(token:str, session:AsyncSession=Depends(get_session)):
    cand = (await session.execute(select(Candidate).where(Candidate.token == token))).scalar_one_or_none()
    now_utc = datetime.now(timezone.utc)
    if not cand or cand.expires_at <= now_utc or cand.used_at is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")
    return cand 