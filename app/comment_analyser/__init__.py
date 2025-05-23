from .bert_cased_v4.handler import model_pipeline as bert_cased_v4_model_pipeline


def comment_model_pipeline(comment: str):
    bert_cased_v4_probabilities = bert_cased_v4_model_pipeline(comment)

    return {
        "bert_cased_v4_probabilities": bert_cased_v4_probabilities[0].cpu().tolist()
    }
