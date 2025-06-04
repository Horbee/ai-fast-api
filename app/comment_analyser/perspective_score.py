from googleapiclient import discovery
from config import settings


client = discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=settings.persp_api_key,
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
