import os
import torch
from transformers import BertTokenizer
from .model import GermanToxicCommentClassifier
from .utils import preprocess_german_text
import shap
import numpy as np


tokenizer_path = os.path.join(
    os.path.dirname(__file__),
    'tokenizer'
)
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)


model = GermanToxicCommentClassifier(n_classes=2)
model_path = os.path.join(os.path.dirname(__file__),
                          'german_toxic_classifier_4.pth'
                          )
model.load_state_dict(torch.load(model_path, map_location="cpu"))
model.eval()


def model_pipeline(comment: str, explainer: bool = False):
    comment = preprocess_german_text(comment)

    probs = predict([comment])

    shap_values = None

    if explainer:
        shap_explainer = shap.Explainer(predict, tokenizer)
        shap_values = shap_explainer([comment])

    formatted_probs = [[
        {"label": "Non-Offensive", "score": float(p[0])},
        {"label": "Offensive", "score": float(p[1])}
    ] for p in probs]

    return formatted_probs, shap_values


def predict(comments: list[str]):
    if isinstance(comments, np.ndarray):
        comments = comments.tolist()

    inputs = tokenizer(
        comments,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors="pt"
    )

    model.eval()
    with torch.inference_mode():
        outputs = model(
            inputs['input_ids'],
            inputs['attention_mask']
        )

    # Get the probabilities
    probs = torch.nn.functional.softmax(outputs, dim=1)

    return probs.tolist()
