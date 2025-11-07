from fastapi import FastAPI
from app.api.router import api_router
from app.core.config import settings
import uvicorn

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(api_router)


@app.get("/")
async def root():
    return {"message": "App is working."}


def main():
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
