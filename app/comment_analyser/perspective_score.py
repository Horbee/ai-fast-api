from googleapiclient import discovery
from config import settings


client = None


def get_perspective_client():
    global client

    if client is None:
        client = discovery.build(
            "commentanalyzer",
            "v1alpha1",
            developerKey=settings.persp_api_key,
            discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
            static_discovery=False,
        )

    return client


def get_perspective_score(comment: str) -> float | None:
    if settings.persp_api_key is None:
        print("Perspective API key is not set")
        return None

    analyze_request = {
        'comment': {'text': comment},
        'requestedAttributes': {'TOXICITY': {}}
    }
    response = get_perspective_client().comments().analyze(
        body=analyze_request
    ).execute()
    return response['attributeScores']['TOXICITY']['summaryScore']['value']
