from .handler import mt5_model_pipeline
from .types import GECPipelineResponse


def gec_model_pipeline(sentence: str) -> GECPipelineResponse:
    corrected_sentence = mt5_model_pipeline(sentence)

    return GECPipelineResponse(
        original_sentence=sentence,
        corrected_sentence=corrected_sentence,
    )