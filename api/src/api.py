from fastapi import FastAPI, Request, status
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes import healthcheck, ciderIP
import os

app = FastAPI(redoc_url="/")


@app.middleware("http")
async def custom_token_check(request: Request, call_next):
    xtoken = os.getenv('xtoken')
    if not request.headers['x-token']:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="token is missing")
    headerToken = request.headers['x-token']
    if headerToken != xtoken:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="token is incorrect")
    return await call_next(request)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(healthcheck.router)
app.include_router(ciderIP.router)
