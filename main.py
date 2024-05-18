from model import model_pipeline
from card_model import model_pipeline as card_model_pipeline

from fastapi import FastAPI, UploadFile
import io
from PIL import Image

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/ask")
def ask(text: str, image: UploadFile):
    content = image.file.read()
    
    image = Image.open(io.BytesIO(content))
    # image = Image.open(image.file)
    
    result = model_pipeline(text, image)
    return {"answer": result}
    
    
@app.post("/card")
def card(image: UploadFile):
    content = image.file.read()
    
    image = Image.open(io.BytesIO(content))
    
    probabilities = card_model_pipeline(image)
    return {"probabilities": probabilities}
    
    
    
