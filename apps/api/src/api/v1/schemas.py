from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, EmailStr


# ---- Job ----

class JobBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None


class JobRead(JobBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }


# ---- Candidate ----

class CandidateBase(BaseModel):
    name: str = Field(..., max_length=255)
    email: EmailStr
    resume_url: Optional[str] = None


class CandidateCreate(CandidateBase):
    pass


class CandidateUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    resume_url: Optional[str]


class CandidateRead(CandidateBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# ---- Interview ----

class InterviewCreate(BaseModel):
    job_id: int
    candidate_id: int
    status: str = Field("pending", pattern="^(pending|completed)$")


class InterviewRead(BaseModel):
    id: int
    job_id: int
    candidate_id: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class InterviewStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(pending|completed)$") 