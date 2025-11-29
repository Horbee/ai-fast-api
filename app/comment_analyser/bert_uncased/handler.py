from transformers import BertTokenizer, BertForSequenceClassification, pipeline
from .utils import preprocess_german_text
import shap

path = "Horbee/bert-german-offensive-comment-classifier"
tokenizer = BertTokenizer.from_pretrained(path)
model = BertForSequenceClassification.from_pretrained(path)


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
