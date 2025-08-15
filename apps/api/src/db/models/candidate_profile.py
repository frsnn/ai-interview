import datetime as dt
from sqlalchemy import ForeignKey, Text, func, LargeBinary, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    candidate_id: Mapped[int] = mapped_column(ForeignKey("candidates.id", ondelete="CASCADE"), unique=True, nullable=False)
    # Raw file stored in DB
    resume_file: Mapped[bytes | None] = mapped_column(LargeBinary, nullable=True)
    file_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    content_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    file_size: Mapped[int | None] = mapped_column(Integer, nullable=True)
    # Parsed data
    resume_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[dt.datetime] = mapped_column(default=func.now(), nullable=False, server_default=func.now())
    updated_at: Mapped[dt.datetime] = mapped_column(default=func.now(), onupdate=func.now(), server_default=func.now())

    candidate = relationship("Candidate") 