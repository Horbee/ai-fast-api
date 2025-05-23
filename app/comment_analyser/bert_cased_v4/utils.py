import re


def preprocess_german_text(text: str) -> str:
    # Remove usernames/mentions as they're not relevant for toxicity
    text = re.sub(r'@\w+', '', text)
    # Remove URLs as they're not relevant for toxicity
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)
    # Remove hashtag symbols but keep the text
    text = re.sub(r'#', '', text)
    # Clean up excessive punctuation (keep up to 3 repetitions)
    text = re.sub(r'([!?.]){4,}', r'\1\1\1', text)
    # Remove extra whitespace
    text = ' '.join(text.split())

    return text


def normalize_german_text(text: str) -> str:
    # Existing preprocessing
    text = preprocess_german_text(text)

    # Additional cleaning steps
    # Convert common German umlauts to standard form if not properly encoded
    umlaut_mapping = {
        'ae': 'ä', 'oe': 'ö', 'ue': 'ü',
        'Ae': 'Ä', 'Oe': 'Ö', 'Ue': 'Ü',
        'ss': 'ß'
    }
    for key, value in umlaut_mapping.items():
        text = text.replace(key, value)

    # Remove or normalize special characters while keeping German-specific ones
    text = re.sub(r'[^a-zA-ZäöüßÄÖÜ\s.,!?]', ' ', text)

    # Normalize whitespace
    text = ' '.join(text.split())

    return text


def clean_german_text(text: str) -> str:
    if not isinstance(text, str):
        return ''

    # Convert to lowercase (optional - BERT is case-sensitive)
    # text = text.lower()

    # Remove or replace common noise
    text = re.sub(r'USER', '', text)  # Remove USER mentions
    text = re.sub(r'MEDIUM', '', text)  # Remove MEDIUM mentions
    text = re.sub(r'RT\s+', '', text)  # Remove retweet markers
    text = re.sub(r'\s*https?\S+', '', text)  # Remove URLs
    text = re.sub(r'\.{2,}', '...', text)  # Normalize ellipsis
    text = re.sub(r'[^\S\n]+', ' ', text)  # Normalize multiple spaces

    # Remove empty parentheses and brackets
    text = re.sub(r'\(\s*\)|\[\s*\]|\{\s*\}', '', text)

    return text.strip()
