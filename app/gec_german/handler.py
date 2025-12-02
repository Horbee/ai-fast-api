import os
from transformers import MT5ForConditionalGeneration, T5Tokenizer

path = os.path.join(os.path.dirname(__file__), 'model_data/')
tokenizer = T5Tokenizer.from_pretrained(path, use_fast=False, legacy=False)
model = MT5ForConditionalGeneration.from_pretrained(path)
model.eval()


def mt5_model_pipeline(sentence: str) -> str:
    inputs = tokenizer(sentence, return_tensors="pt", max_length=128, truncation=True)
    
    outputs = model.generate(
        **inputs,
        max_length=128,
        num_beams=5,
        early_stopping=True
    )
    
    corrected_sentence = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return corrected_sentence