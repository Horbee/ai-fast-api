from api.endpoints import router
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException
from dotenv import load_dotenv
import os


load_dotenv()


app = FastAPI()


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


if os.getenv("ENVIRONMENT") == "production":
    app.mount("/", SPAStaticFiles(directory="client/dist",
              html=True), name="spa-static-files")
