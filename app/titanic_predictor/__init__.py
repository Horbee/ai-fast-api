import torch
import pickle
import os
import numpy as np

with open(os.path.join(os.path.dirname(__file__), 'scaler.pkl'), 'rb') as f:
    scaler = pickle.load(f)

model = torch.jit.load(os.path.join(os.path.dirname(
    __file__), 'titanic_scripted.pt'), map_location="cpu")
model.eval()


def model_pipeline(pclass: int, sex: int, age: float, family_size: int):
    input = np.array([[pclass, sex, age, family_size]])

    scaled_input = scaler.transform(input)

    scaled_input = torch.tensor(scaled_input, dtype=torch.float32)

    return predict(scaled_input)


def predict(input_tensor: torch.Tensor):
    model.eval()
    with torch.no_grad():
        print("I:", input_tensor)
        probability = model(input_tensor)
        print("P:", probability)
    return probability.numpy().flatten()
