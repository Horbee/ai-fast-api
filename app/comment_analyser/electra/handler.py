import os
import torch
from transformers import ElectraTokenizer, ElectraForSequenceClassification
from .utils import preprocess_german_text

path = os.path.join(os.path.dirname(__file__), 'model_data/')
tokenizer = ElectraTokenizer.from_pretrained(path)
model = ElectraForSequenceClassification.from_pretrained(path)


def model_pipeline(comment: str):
    comment = preprocess_german_text(comment)

    inputs = tokenizer(
        comment,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors="pt"
    )

    return predict(inputs)


def predict(inputs):
    model.eval()
    with torch.inference_mode():
        outputs = model(**inputs)

    # Get the probabilities
    return torch.nn.functional.softmax(outputs.logits, dim=1)
