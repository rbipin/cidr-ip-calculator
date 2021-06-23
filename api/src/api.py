from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from middlewares.custom_auth_middleware import CustomAuthenticationMiddleware
from routes import healthcheck, ciderIP

app = FastAPI(redoc_url="/")


# app.add_middleware(CustomAuthenticationMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(healthcheck.router)
app.include_router(ciderIP.router)
