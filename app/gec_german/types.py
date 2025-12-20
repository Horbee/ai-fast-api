from typing import Optional, Literal
from pydantic import BaseModel

class GECInputData(BaseModel):
    text: str
    force: Optional[bool] = False
    model: Literal["ministral-3", "mt5"]


class GECPipelineResponse(BaseModel):
    original_sentence: str
    corrected_sentence: Optional[str]
    language: Optional[str]