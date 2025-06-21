from .bert_cased_v4.handler import model_pipeline as bert_model_pipeline
from .electra.handler import model_pipeline as electra_model_pipeline
from .types import CommentPipelineResponse


def comment_model_pipeline(comment: str) -> CommentPipelineResponse:
    bert_probabilities = bert_model_pipeline(comment)
    electra_probabilities = electra_model_pipeline(comment)

    return {
        "bert_probabilities": bert_probabilities[0].cpu().tolist(),
        "electra_probabilities": electra_probabilities[0].cpu().tolist()
    }
