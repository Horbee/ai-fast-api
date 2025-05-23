from pydantic import BaseModel

class CommentInputData(BaseModel):
    comment: str


class CommentPutData(BaseModel):
    is_correct: bool


class CommentResponse(BaseModel):
    predictions: dict[str, list[float]]
    id: int
    perspective_score: float | None = None
