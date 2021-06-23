from fastapi import APIRouter
from src.controllers import healthcheck

router = APIRouter(
    prefix="/healthcheck",
    tags=["healthcheck"]
)


@router.get("", name="Health check", response_model=str)
async def runGetHealthCheck():
    return healthcheck.getHealthCheck()
