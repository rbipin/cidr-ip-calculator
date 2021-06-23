from starlette import status
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
import os

skipAuthList = ['/healthcheck']


class CustomAuthenticationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        if request.url.path in skipAuthList:
            return await call_next(request)
        xtoken = os.getenv('xtoken')
        if not 'x-token' in request.headers or not request.headers['x-token']:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED, content="token is missing")
        if request.headers['x-token'] != xtoken:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED, content="token is incorrect")
        return await call_next(request)
