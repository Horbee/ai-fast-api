from pydantic import BaseModel


class TweetInputData(BaseModel):
    tweet: str


class TweetResponse(BaseModel):
    disaster_prob: float
    is_disaster: bool
