from pydantic import BaseModel


class CommentInputData(BaseModel):
    comment: str


class CommentResponse(BaseModel):
    toxic_prob: float
    is_toxic: bool
