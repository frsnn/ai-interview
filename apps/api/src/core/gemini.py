import os
from typing import List

from anyio import to_thread

from src.core.config import settings


# --- Dynamic import for new client API ---
try:
    from google import genai  # type: ignore

    _GENAI_AVAILABLE = True
except ImportError:
    _GENAI_AVAILABLE = False


GEMINI_API_KEY = settings.gemini_api_key
MODEL_NAME = "gemini-2.5-flash"


def _sync_generate(history: List[dict[str, str]]):
    """Blocking Gemini request executed in a thread."""

    if not _GENAI_AVAILABLE:
        raise RuntimeError("google-ai-python library not installed (pip install google-ai-python)")

    client = genai.Client(api_key=GEMINI_API_KEY)

    system_prompt = (
        "You are an HR interviewer conducting a Turkish job interview. "
        "Given the conversation so far, ask the next appropriate question. "
        "If the candidate has answered sufficiently AND you have asked at least 5 questions, respond with the single word FINISHED. "
        "Otherwise respond with only the next question sentence."
    )

    convo_text = system_prompt + "\n\n"
    for turn in history:
        prefix = "Candidate:" if turn["role"] == "user" else "Interviewer:"
        convo_text += f"{prefix} {turn['text']}\n"
    convo_text += "Interviewer:"

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=convo_text,
        # Note: current google-genai client does not support generation_config param
    )

    text = response.text.strip()
    if text.upper() == "FINISHED":
        return {"question": "", "done": True}
    return {"question": text, "done": False}


async def generate_question(history: List[dict[str, str]]) -> dict[str, str]:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY env var not set")

    return await to_thread.run_sync(_sync_generate, history) 