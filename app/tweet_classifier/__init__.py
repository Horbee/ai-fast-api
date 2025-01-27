import torch
import os
from .model import TweetClassifier
from transformers import BertTokenizer


tokenizer_path = os.path.join(os.path.dirname(__file__), 'tokenizer/')
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)

model = TweetClassifier(n_classes=2)
model_path = os.path.join(os.path.dirname(__file__), 'tweet_classifier.pth')
model.load_state_dict(torch.load(model_path, map_location="cpu"))
model.eval()


def model_pipeline(tweet: str):
    inputs = tokenizer(
        tweet,
        truncation=True,
        padding=True,
        max_length=128,
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
    disaster_prob = probabilities[0][1].item()

    return disaster_prob, prediction
