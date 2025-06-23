import os
import torch
from transformers import BertTokenizer
from .model import GermanToxicCommentClassifier
from .utils import preprocess_german_text

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


def predict(inputs: torch.Tensor):
    model.eval()
    with torch.inference_mode():
        outputs = model(
            inputs['input_ids'],
            inputs['attention_mask']
        )

    # Get the probabilities
    return torch.nn.functional.softmax(outputs, dim=1)
