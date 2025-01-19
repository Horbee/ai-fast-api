import torch
import pickle
import os
import numpy as np

with open(os.path.join(os.path.dirname(__file__), 'scaler.pkl'), 'rb') as f:
    scaler = pickle.load(f)

model = torch.jit.load(os.path.join(os.path.dirname(
    __file__), 'rainpredictor_scripted.pt'), map_location="cpu")
model.eval()


def model_pipeline(temp: float, humidity: float, pressure: float):
    input = np.array([[temp, humidity, pressure]])

    scaled_input = scaler.transform(input)

    scaled_input = torch.tensor(scaled_input, dtype=torch.float32)

    return predict(scaled_input)


def predict(input_tensor: torch.Tensor):
    model.eval()
    with torch.no_grad():
        print("I:", input_tensor)
        output = model(input_tensor)
        probability = torch.sigmoid(output)
        print("P:", probability)
    return probability.numpy().flatten()
