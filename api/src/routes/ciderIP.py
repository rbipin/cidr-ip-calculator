
from fastapi import APIRouter, HTTPException
from src.controllers import ciderIP
from src.models.CIDRNotationRequest import CIDRNotationRequest
from src.models.CustomExceptions import *
from src.models.IPRangeInfo import *

router = APIRouter(
    prefix="/cidr",
    tags=["cidr"]
)


@router.get("/iprange/{ip}/{ciderrange}", response_model=IPRangeInfo,
            description="Get IP Ranges", name="Calculate IP Ranges")
async def runGetIPRanges(ip: str, ciderrange: int):
    try:
        return ciderIP.calculateIPRange(ip, ciderrange)
    except CustomException as customEx:
        raise HTTPException(status_code=400, detail=customEx.message)
    except:
        raise HTTPException(
            status_code=500, detail='Unhandled Server exception')


@router.post("/cidr-range", name="Calculate CIDR Range")
async def runGetCiderRange(request: CIDRNotationRequest):
    try:
        return ciderIP.calculateCiderIPRange(request.StartingIP, request.EndingIP)
    except CustomException as customEx:
        raise HTTPException(status_code=400, detail=customEx.message)
    except:
        raise HTTPException(
            status_code=500, detail='Unhandled Server exception')
