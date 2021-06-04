
from fastapi import APIRouter, HTTPException
from controller import ciderIP
from models.CustomExceptions import *

router = APIRouter(
    prefix="/cidr",
    tags=["cidr"]
)


@router.get("/iprange/{ip}/{ciderrange}")
async def runGetIPRanges(ip: str, ciderrange: int):
    try:
        return ciderIP.calculateIPRange(ip, ciderrange)
    except CustomException as customEx:
        raise HTTPException(status_code=400, detail=customEx.message)
    except:
        raise HTTPException(
            status_code=500, detail='Unhandled Server exception')


@router.get("/cider-range")
async def runGetCiderRange():
    try:
        return ciderIP.calculateCiderIPRange()
    except:
        raise HTTPException(
            status_code=500, detail='Unhandled Server exception')