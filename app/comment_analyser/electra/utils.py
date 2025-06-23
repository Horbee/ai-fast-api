import re


def preprocess_german_text(text):
    # Normalize mentiones to @USER
    text = re.sub(r'@\w+', '@USER', text)

    # Remove duplicate mentions, white space also matters
    text = re.sub(r'(@USER\s*)+', '@USER ', text,
                  count=1).replace('@USER ', '@USER ', 1)

    # Remove URLs as they're not relevant for toxicity
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)

    # Remove hashtag symbols but keep the text
    text = re.sub(r'#', '', text)

    # Clean up excessive punctuation (keep up to 3 repetitions)
    text = re.sub(r'([!?.]){4,}', r'\1\1\1', text)

    # Remove extra whitespace
    text = ' '.join(text.split())

    return text
