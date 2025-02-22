from card_analyser import model_pipeline as card_model_pipeline
from titanic_predictor import model_pipeline as titanic_model_pipeline
from rain_predictor import model_pipeline as rain_model_pipeline
from tweet_classifier import model_pipeline as tweet_model_pipeline
from comment_analyser import comment_model_pipeline
from card_analyser.types import CardResponse
from titanic_predictor.types import TitanicInputData, TitanicResponse
from rain_predictor.types import RainInputData, RainResponse
from tweet_classifier.types import TweetInputData, TweetResponse
from comment_analyser.types import CommentInputData, CommentResponse, CommentPutData
from db import SessionDep, OffensiveComment
from fastapi import APIRouter, UploadFile, HTTPException
from sqlmodel import select
from datetime import datetime
import io
from PIL import Image
from typing import Literal

router = APIRouter(prefix="/api")


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "UP"}


@router.post("/card")
def card(image: UploadFile) -> CardResponse:
    content = image.file.read()

    image = Image.open(io.BytesIO(content))

    probabilities = card_model_pipeline(image)
    return {"probabilities": probabilities}


@router.post("/titanic")
def titanic(data: TitanicInputData) -> TitanicResponse:
    result = titanic_model_pipeline(
        data.pclass, data.sex, data.age, data.family_size)
    return {"probability": result}


@router.post("/rain")
def rain(data: RainInputData) -> RainResponse:
    result = rain_model_pipeline(data.temp, data.humidity, data.pressure)
    return {"probability": result}


@router.post("/tweet")
def tweet(data: TweetInputData) -> TweetResponse:
    disaster_prob, prediction = tweet_model_pipeline(data.tweet)
    return {"disaster_prob": disaster_prob, "is_disaster": prediction}


@router.post("/comment/{version}")
def comment(version: Literal["v1", "v2", "v3", "v4"], data: CommentInputData, session: SessionDep) -> CommentResponse:
    toxic_prob, prediction = comment_model_pipeline(data.comment, version)

    # Save to database
    offensive_comment = OffensiveComment(text=data.comment,
                                         offensive_score=toxic_prob,
                                         version=version)
    session.add(offensive_comment)
    session.commit()
    session.refresh(offensive_comment)

    return {"toxic_prob": toxic_prob, "is_toxic": prediction, "id": offensive_comment.id}


@router.put("/comment/{id}")
def update_comment(id: int, data: CommentPutData, session: SessionDep):
    comment = session.exec(select(OffensiveComment).where(
        OffensiveComment.id == id)).one()
    comment.is_correct = data.is_correct
    comment.updated_at = datetime.now()
    session.add(comment)
    session.commit()
    session.refresh(comment)
