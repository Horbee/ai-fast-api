import torch
import os
import numpy as np
import torchvision.transforms as transforms
from PIL import Image
from .model import SimpleCardClassifier


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

model = SimpleCardClassifier()
model.load_state_dict(torch.load(os.path.join(os.path.dirname(__file__), "card_model.pt"), map_location=device))
model.eval()

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor()
])


class_names = np.array(['ace of clubs', 'ace of diamonds', 'ace of hearts', 'ace of spades', 'eight of clubs', 'eight of diamonds', 'eight of hearts', 'eight of spades', 'five of clubs', 'five of diamonds', 'five of hearts', 'five of spades', 'four of clubs', 'four of diamonds', 'four of hearts', 'four of spades', 'jack of clubs', 'jack of diamonds', 'jack of hearts', 'jack of spades', 'joker', 'king of clubs', 'king of diamonds', 'king of hearts', 'king of spades', 'nine of clubs', 'nine of diamonds', 'nine of hearts', 'nine of spades', 'queen of clubs', 'queen of diamonds', 'queen of hearts', 'queen of spades', 'seven of clubs', 'seven of diamonds', 'seven of hearts', 'seven of spades', 'six of clubs', 'six of diamonds', 'six of hearts', 'six of spades', 'ten of clubs', 'ten of diamonds', 'ten of hearts', 'ten of spades', 'three of clubs', 'three of diamonds', 'three of hearts', 'three of spades', 'two of clubs', 'two of diamonds', 'two of hearts', 'two of spades'])


def model_pipeline(image: Image):
    image_rgb = image.convert("RGB")
    image_tensor = transform(image_rgb).unsqueeze(0)
    probabilities = predict(image_tensor)

    dtype = [('name', 'U50'), ('probability', 'f8')]
    structured_array = np.array(list(zip(class_names, probabilities)), dtype=dtype)

    sorted_structured_array = np.sort(structured_array, order='probability')[::-1]

    top_5_items = sorted_structured_array[:5]

    merged_list = [{'name': item['name'], 'probability': item['probability']} for item in top_5_items]

    # Check if there is any item with a probability over 1%
    if any(item['probability'] > 0.01 for item in merged_list):
        # Remove items with a probability less than 1%
        merged_list = [item for item in merged_list if item['probability'] >= 0.01]

    return merged_list


# Predict using the model
def predict(image_tensor):
    model.eval()
    with torch.no_grad():
        image_tensor = image_tensor.to(device)
        outputs = model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
    return probabilities.cpu().numpy().flatten()
