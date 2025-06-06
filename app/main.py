from api.endpoints import router
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException
from db import create_db_and_tables
from contextlib import asynccontextmanager
from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)


app.include_router(router)


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope)
            else:
                raise ex


if settings.environment == "production":
    app.mount("/", SPAStaticFiles(directory="client/dist",
              html=True), name="spa-static-files")
