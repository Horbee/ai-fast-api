from googleapiclient import discovery
import os

API_KEY = os.getenv("PERSP_API_KEY")
if not API_KEY:
    raise ValueError("PERSP_API_KEY is not set")

client = discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=API_KEY,
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
)


def get_perspective_score(comment: str) -> float:
    analyze_request = {
        'comment': {'text': comment},
        'requestedAttributes': {'TOXICITY': {}}
    }
    response = client.comments().analyze(body=analyze_request).execute()
    return response['attributeScores']['TOXICITY']['summaryScore']['value']
