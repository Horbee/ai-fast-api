from langchain_huggingface import HuggingFacePipeline
from transformers import Mistral3ForConditionalGeneration, MistralCommonBackend, pipeline
import os

# --- Setup Global Model (Load once, outside the node to save memory) ---
# Replace with your actual model path or Hub ID
path = os.path.join(os.path.dirname(__file__), 'model_data/')
tokenizer = MistralCommonBackend.from_pretrained(path)
model = Mistral3ForConditionalGeneration.from_pretrained(path)
SYSTEM_PROMPT = "Korrigiere die Grammatik im folgenden Satz auf Standarddeutsch. Gib **nur** den korrigierten Satz zurück, ohne Anmerkungen."

# Create a text-generation pipeline
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=4096,
    temperature=0.1,
)

# Wrap in LangChain
hf_llm = HuggingFacePipeline(pipeline=pipe)

def ministral_model_pipeline(sentence: str) -> str:
    prompt_str = f"<s>[INST] {SYSTEM_PROMPT}\n\n{sentence} [/INST] "
    
    full_output = hf_llm.invoke(prompt_str)

    if "[/INST]" in full_output:
        clean_correction = full_output.split("[/INST]")[-1].strip()
    else:
        # Fallback if the model hallucinated the tag away (rare)
        clean_correction = full_output

    # result = result.strip().replace("[/INST]", "")

    return clean_correction



