from fastapi import HTTPException
from typing import Literal
from .v1.handler import model_pipeline as v1_model_pipeline
from .v2.handler import model_pipeline as v2_model_pipeline
from .v3.handler import model_pipeline as v3_model_pipeline


def comment_model_pipeline(comment: str, version: Literal["v1", "v2", "v3"]):
    if version == "v1":
        return v1_model_pipeline(comment)
    elif version == "v2":
        return v2_model_pipeline(comment)
    elif version == "v3":
        return v3_model_pipeline(comment)
    else:
        raise HTTPException(status_code=400, detail="Invalid version")
