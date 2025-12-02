from pydantic import BaseModel

class GECInputData(BaseModel):
    sentence: str


class GECPipelineResponse(BaseModel):
    original_sentence: str
    corrected_sentence: str
