from image_analyser import model_pipeline
from card_analyser import model_pipeline as card_model_pipeline
from titanic_predictor import model_pipeline as titanic_model_pipeline
from card_analyser.types import CardResponse
from image_analyser.types import ImageAnalyserResponse
from titanic_predictor.types import TitanicInputData, TitanicResponse

from fastapi import APIRouter, UploadFile

import io
from PIL import Image


router = APIRouter(prefix="/api")


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "UP"}


@router.post("/ask")
def ask(text: str, image: UploadFile) -> ImageAnalyserResponse:
    content = image.file.read()

    image = Image.open(io.BytesIO(content))

    result = model_pipeline(text, image)
    return {"answer": result}


@router.post("/card")
def card(image: UploadFile) -> CardResponse:
    content = image.file.read()

    image = Image.open(io.BytesIO(content))

    probabilities = card_model_pipeline(image)
    return {"probabilities": probabilities}


@router.post("/titanic")
def titanic(data: TitanicInputData) -> TitanicResponse:
    result = titanic_model_pipeline(
        data.pclass, data.sex, data.age, data.family_size)
    return {"probability": result}
