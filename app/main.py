from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from dotenv import load_dotenv
import os


load_dotenv()


app = FastAPI()


from api.endpoints import router
app.include_router(router)


if os.getenv("ENVIRONMENT") == "production":
    app.mount('/', StaticFiles(directory='client/dist', html=True))
