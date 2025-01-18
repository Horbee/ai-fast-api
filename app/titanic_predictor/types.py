from pydantic import BaseModel


class TitanicInputData(BaseModel):
    pclass: int
    sex: int
    age: float
    family_size: int


class TitanicResponse(BaseModel):
    probability: float
