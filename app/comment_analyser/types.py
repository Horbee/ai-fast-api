from pydantic import BaseModel

class CommentInputData(BaseModel):
    comment: str


class CommentPutData(BaseModel):
    is_correct: bool


class CommentPipelineResponse(BaseModel):
    bert_cased_v4_probabilities: list[float]
    electra_uncased_downsampled_probabilities: list[float]


class CommentResponse(BaseModel):
    predictions: CommentPipelineResponse
    id: int
    perspective_score: float | None = None


