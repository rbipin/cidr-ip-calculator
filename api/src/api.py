from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from routes import healthcheck, ciderIP

app = FastAPI(redoc_url="/")


app.include_router(healthcheck.router)
app.include_router(ciderIP.router)
