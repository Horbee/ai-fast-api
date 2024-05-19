from card_analyser import model_pipeline as card_model_pipeline

from fastapi import FastAPI, UploadFile
import io
from PIL import Image

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}
    
    
@app.post("/card")
def card(image: UploadFile):
    content = image.file.read()
    
    image = Image.open(io.BytesIO(content))
    
    probabilities = card_model_pipeline(image)
    return {"probabilities": probabilities}
    
    
    
