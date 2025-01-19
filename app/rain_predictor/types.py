from pydantic import BaseModel


class RainInputData(BaseModel):
    temp: float
    humidity: float
    pressure: float


class RainResponse(BaseModel):
    probability: float
