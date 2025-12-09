from pydantic import BaseModel


class HealthResponse(BaseModel):
  status: str
  version: str
  debug: bool


class DatabaseHealthResponse(BaseModel):
  status: str
