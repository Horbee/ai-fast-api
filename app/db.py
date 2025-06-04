from sqlmodel import create_engine, SQLModel, Session, Field
from typing import Annotated
from fastapi import Depends
from datetime import datetime
from config import settings


class OffensiveComment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: str = Field()
    bert_offensive_score: float = Field()
    electra_offensive_score: float = Field()
    is_correct: bool | None = Field(index=True)
    perspective_score: float | None = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime | None = Field(default=None)


connect_args = {"check_same_thread": False}
engine = create_engine(settings.database_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
