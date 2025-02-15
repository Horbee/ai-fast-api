import re
import os
import torch
from transformers import BertTokenizer
from .model import GermanToxicCommentClassifier


tokenizer_path = os.path.join(os.path.dirname(__file__), 'tokenizer/')
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)


model = GermanToxicCommentClassifier(n_classes=2)
model_path = os.path.join(os.path.dirname(
    __file__),
    'german_toxic_classifier.pth'
)
model.load_state_dict(torch.load(model_path, map_location="cpu"))
model.eval()


def preprocess_german_text(text: str) -> str:
    # Remove usernames/mentions as they're not relevant for toxicity
    text = re.sub(r'@\w+', '', text)
    # Remove URLs as they're not relevant for toxicity
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)
    # Remove hashtag symbols but keep the text
    text = re.sub(r'#', '', text)
    # Clean up excessive punctuation (keep up to 3 repetitions)
    text = re.sub(r'([!?.]){4,}', r'\1\1\1', text)
    # Remove extra whitespace
    text = ' '.join(text.split())

    return text


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
    with torch.no_grad():
        outputs = model(
            inputs['input_ids'],
            inputs['attention_mask']
        )

    probabilities = torch.nn.functional.softmax(outputs, dim=1)
    prediction = torch.argmax(outputs, dim=1).item() == 1
    toxic_prob = probabilities[0][1].item()

    return toxic_prob, prediction
