from fastapi import (
    APIRouter, Depends, Request,
    Response
)
from typing import Union
from queries.icons import (
    IconIn,
    IconOut,
    IconQueries
)

from pydantic import BaseModel

class HttpError(BaseModel):
    detail:str

router = APIRouter()

@router.get("/icons/{id}", response_model=Union[IconOut, HttpError])
async def get_icon(
    id: int,
    queries: IconQueries = Depends()
):
    return queries.get_icon(id)
