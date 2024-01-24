from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union, List
from queries.screenshots import (
    ScreenshotsInBase,
    ScreenshotsIn,
    ScreenshotsOut,
    ScreenshotsQueries,
    InvalidScreenshotsError
)
from pydantic import BaseModel
# from authenticator import authenticator


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/screenshots/{rawg_pk}", response_model=List[ScreenshotsOut])
async def get_screenshots(
    rawg_pk: str,
    queries: ScreenshotsQueries = Depends(),
):
    return queries.get_screenshots(rawg_pk)


@router.delete("/api/screenshots/{id}", response_model=bool)
async def delete_screenshots(
    id: str,
    queries: ScreenshotsQueries = Depends(),
) -> bool:
    return queries.delete_screenshots(id)
