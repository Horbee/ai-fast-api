from pydantic import BaseModel


class CommentInputData(BaseModel):
    comment: str


class CommentPutData(BaseModel):
    is_correct: bool


class CommentResponse(BaseModel):
    toxic_prob: float
    is_toxic: bool
    id: int
    perspective_score: float | None = None
