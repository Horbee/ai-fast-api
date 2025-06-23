from titanic_predictor import model_pipeline as titanic_model_pipeline
from rain_predictor import model_pipeline as rain_model_pipeline
from comment_analyser import comment_model_pipeline
from comment_analyser.perspective_score import get_perspective_score
from titanic_predictor.types import TitanicInputData, TitanicResponse
from rain_predictor.types import RainInputData, RainResponse
from comment_analyser.types import CommentInputData, CommentResponse, CommentPutData
from db import SessionDep, OffensiveComment
from fastapi import APIRouter
from sqlmodel import select
from datetime import datetime
from config import settings

router = APIRouter(prefix="/api")


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "UP"}


@router.post("/titanic")
def titanic(data: TitanicInputData) -> TitanicResponse:
    result = titanic_model_pipeline(
        data.pclass, data.sex, data.age, data.family_size)
    return {"probability": result}


@router.post("/rain")
def rain(data: RainInputData) -> RainResponse:
    result = rain_model_pipeline(data.temp, data.humidity, data.pressure)
    return {"probability": result}


@router.post("/comment")
def comment(data: CommentInputData, session: SessionDep) -> CommentResponse:
    predictions = comment_model_pipeline(data.comment)

    try:
        perspective_score = get_perspective_score(data.comment)
    except Exception as e:
        print(e)
        perspective_score = None

    # Save to database
    offensive_comment = OffensiveComment(text=data.comment,
                                         bert_offensive_score=predictions["bert_probabilities"][1],
                                         electra_offensive_score=predictions["electra_probabilities"][1],
                                         perspective_score=perspective_score
                                         )
    session.add(offensive_comment)
    session.commit()
    session.refresh(offensive_comment)

    return {"predictions": predictions, "id": offensive_comment.id, "perspective_score": perspective_score}


@router.put("/comment/{id}")
def update_comment(id: int, data: CommentPutData, session: SessionDep):
    comment = session.exec(select(OffensiveComment).where(
        OffensiveComment.id == id)).one()
    comment.is_correct = data.is_correct
    comment.updated_at = datetime.now()
    session.add(comment)
    session.commit()
    session.refresh(comment)
