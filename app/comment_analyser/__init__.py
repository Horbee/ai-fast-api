from .bert_cased_v4.handler import model_pipeline as bert_cased_v4_model_pipeline
from .electra_uncased_downsampled.handler import model_pipeline as electra_uncased_downsampled_model_pipeline

def comment_model_pipeline(comment: str):
    bert_cased_v4_probabilities = bert_cased_v4_model_pipeline(comment)
    electra_uncased_downsampled_probabilities = electra_uncased_downsampled_model_pipeline(comment)

    return {
        "bert_cased_v4_probabilities": bert_cased_v4_probabilities[0].cpu().tolist(),
        "electra_uncased_downsampled_probabilities": electra_uncased_downsampled_probabilities[0].cpu().tolist()
    }
