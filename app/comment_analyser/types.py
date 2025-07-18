from pydantic import BaseModel
from typing import Optional


class ScoreDict(BaseModel):
    label: str
    score: float


class CommentInputData(BaseModel):
    comment: str
    explainer: bool = False


class CommentPutData(BaseModel):
    is_correct: bool


class ShapValues(BaseModel):
    values: list[list[float]]
    base_values: list[float]
    data: list[str]


class CommentPipelineResponse(BaseModel):
    bert_probabilities: list[ScoreDict]
    electra_probabilities: list[ScoreDict]
    electra_shap_values: Optional[ShapValues] = None
    bert_shap_values: Optional[ShapValues] = None


class CommentResponse(BaseModel):
    predictions: CommentPipelineResponse
    id: int
    perspective_score: float | None
