from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.v1.routes import router as api_v1_router

app = FastAPI(
    title="Interview API",
    version="1.0.0",
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
)

# CORS – local dev origins
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthz", tags=["health"])
def healthcheck():
    return {"status": "ok"}


# Versioned API
app.include_router(api_v1_router, prefix="/api/v1") 