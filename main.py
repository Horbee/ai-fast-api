from image_analyser import model_pipeline
from card_analyser import model_pipeline as card_model_pipeline

from fastapi import FastAPI, UploadFile
import io
from PIL import Image
from typing import Dict, List
from typing_extensions import TypedDict

app = FastAPI()



@app.get("/health")
def health_check() -> Dict[str, str]:
    return {"status": "UP"}


@app.post("/ask")
def ask(text: str, image: UploadFile):
    content = image.file.read()
    
    image = Image.open(io.BytesIO(content))
    # image = Image.open(image.file)
    
    result = model_pipeline(text, image)
    return {"answer": result}


class ProbabilityResponse(TypedDict):
    name: str
    probability: float

class CardResponse(TypedDict):
    probabilities: List[ProbabilityResponse]


@app.post("/card")
def card(image: UploadFile) -> CardResponse:
    content = image.file.read()
    
    image = Image.open(io.BytesIO(content))
    
    probabilities = card_model_pipeline(image)
    return {"probabilities": probabilities}
    
    
    
