from typing import Literal, Optional
from langgraph.graph import StateGraph, END
from fast_langdetect import detect
from pydantic import BaseModel

from .types import GECInputData, GECPipelineResponse
from .mt5.handler import mt5_model_pipeline
from .ministral.handler import ministral_model_pipeline


class GECPipelineState(BaseModel):
    """State for the unified GEC pipeline."""
    text: str
    model: Literal["ministral-3", "mt5"]
    force: Optional[bool] = False
    language: Optional[str] = None
    correction: Optional[str] = None


# --- Node Functions ---

def check_language_node(state: GECPipelineState) -> dict:
    """Detects language, unless forced."""
    if state.force:
        print("DEBUG: Force enabled. Skipping detection.")
        return {"language": "forced_skipped"}

    input_text = state.text
    result = detect(input_text, model='lite')
    is_german = any(lang['lang'] == 'de' and lang['score'] > 0.8 for lang in result)
    lang_code = 'de' if is_german else result[0]['lang']

    print(f"DEBUG: Detected language '{lang_code}'")
    return {"language": lang_code}


def mt5_model_node(state: GECPipelineState) -> dict:
    """Run MT5 GEC model."""
    print("DEBUG: Running MT5 GEC Model...")
    corrected = mt5_model_pipeline(state.text)
    return {"correction": corrected}


def ministral_model_node(state: GECPipelineState) -> dict:
    """Run Ministral GEC model."""
    print("DEBUG: Running Ministral GEC Model...")
    corrected = ministral_model_pipeline(state.text)
    return {"correction": corrected}


def skip_node(state: GECPipelineState) -> dict:
    """No correction needed - language is not German."""
    print("DEBUG: Skipping correction - not German language")
    return {"correction": None}


# --- Router Functions ---

def route_by_language(state: GECPipelineState) -> Literal["route_model", "skip"]:
    """Route based on language detection result."""
    if state.force:
        return "route_model"
    if state.language == "de":
        return "route_model"
    return "skip"


def route_by_model(state: GECPipelineState) -> Literal["mt5_model", "ministral_model"]:
    """Route to the appropriate model based on the model parameter."""
    if state.model == "mt5":
        return "mt5_model"
    return "ministral_model"


# --- Build the Graph ---

workflow = StateGraph(GECPipelineState)

# Add nodes
workflow.add_node("check_language", check_language_node)
workflow.add_node("mt5_model", mt5_model_node)
workflow.add_node("ministral_model", ministral_model_node)
workflow.add_node("skip", skip_node)

# Set entry point
workflow.set_entry_point("check_language")

# Add conditional edges for language routing
workflow.add_conditional_edges(
    "check_language",
    route_by_language,
    {
        "route_model": "route_model",
        "skip": "skip"
    }
)

# Add a router node for model selection
workflow.add_node("route_model", lambda state: {})  # Pass-through node
workflow.add_conditional_edges(
    "route_model",
    route_by_model,
    {
        "mt5_model": "mt5_model",
        "ministral_model": "ministral_model"
    }
)

# Connect model nodes and skip node to END
workflow.add_edge("mt5_model", END)
workflow.add_edge("ministral_model", END)
workflow.add_edge("skip", END)

# Compile the graph
unified_gec_pipeline = workflow.compile()


def gec_model_pipeline(data: GECInputData) -> GECPipelineResponse:
    """
    Unified GEC pipeline that routes to the appropriate model based on input.
    
    Args:
        data: GECInputData containing text, model choice, and force flag
        
    Returns:
        GECPipelineResponse with original and corrected sentences
    """
    result = unified_gec_pipeline.invoke(
        GECPipelineState(
            text=data.text,
            model=data.model,
            force=data.force or False
        )
    )

    return GECPipelineResponse(
        original_sentence=data.text,
        corrected_sentence=result.get("correction"),
        language=result.get("language")
    )
