import os
from transformers import ElectraTokenizer, ElectraForSequenceClassification, pipeline
from .utils import preprocess_german_text
import shap

path = os.path.join(os.path.dirname(__file__), 'model_data/')
tokenizer = ElectraTokenizer.from_pretrained(path)
model = ElectraForSequenceClassification.from_pretrained(path)


def model_pipeline(comment: str, explainer: bool = False):
    comment = preprocess_german_text(comment)

    pipe = pipeline(
        "text-classification",
        model=model,
        tokenizer=tokenizer,
        top_k=None,
    )

    output = pipe(comment)
    shap_values = None

    if explainer:
        shap_explainer = shap.Explainer(pipe)
        shap_values = shap_explainer([comment])

    return output, shap_values
