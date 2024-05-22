from typing import  List
from typing_extensions import TypedDict


class ProbabilityResponse(TypedDict):
    name: str
    probability: float


class CardResponse(TypedDict):
    probabilities: List[ProbabilityResponse]