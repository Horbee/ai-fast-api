from pydantic import BaseModel


class CommentInputData(BaseModel):
    comment: str


class CommentPutData(BaseModel):
    is_correct: bool


class CommentPipelineResponse(BaseModel):
    bert_probabilities: list[float]
    electra_probabilities: list[float]


class CommentResponse(BaseModel):
    predictions: CommentPipelineResponse
    id: int
    perspective_score: float | None
