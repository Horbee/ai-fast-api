from sqlmodel import create_engine, SQLModel, Session, Field
from typing import Annotated
from fastapi import Depends
from datetime import datetime


class OffensiveComment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: str = Field()
    offensive_score: float = Field()
    is_correct: bool | None = Field(index=True)
    version: str = Field()
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime | None = Field(default=None)


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
