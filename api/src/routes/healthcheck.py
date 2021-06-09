from fastapi import APIRouter
from controllers import healthcheck

router = APIRouter(
    prefix="/healthcheck",
    tags=["healthcheck"]
)


@router.get("/")
async def runGetHealthCheck():
    return healthcheck.getHealthCheck()
