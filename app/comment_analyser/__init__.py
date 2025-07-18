from .bert_cased_v4.handler import model_pipeline as bert_model_pipeline
from .electra.handler import model_pipeline as electra_model_pipeline
from .types import CommentPipelineResponse, ShapValues


def comment_model_pipeline(comment: str, explainer: bool) -> CommentPipelineResponse:
    bert_probabilities, bert_shap_values = bert_model_pipeline(
        comment, explainer)
    electra_probabilities, electra_shap_values = electra_model_pipeline(
        comment,
        explainer
    )

    # Convert SHAP values to a serializable format
    electra_shap_dict = None
    if electra_shap_values is not None:
        electra_shap_dict = ShapValues(
            values=electra_shap_values.values[0].tolist(),
            base_values=electra_shap_values.base_values[0].tolist(),
            data=electra_shap_values.data[0]
        )

    # Convert SHAP values to a serializable format
    bert_shap_dict = None
    if bert_shap_values is not None:
        bert_shap_dict = ShapValues(
            values=bert_shap_values.values[0].tolist(),
            base_values=bert_shap_values.base_values[0].tolist(),
            data=bert_shap_values.data[0]
        )

    return {
        "bert_probabilities": bert_probabilities[0],
        "electra_probabilities": electra_probabilities[0],
        "electra_shap_values": electra_shap_dict,
        "bert_shap_values": bert_shap_dict
    }
