from fastapi import (APIRouter, Depends)
from typing import List, Union
from queries.screenshots import (
    ScreenshotsOut,
    ScreenshotsQueries,
    HttpError
)

router = APIRouter()


@router.get("/api/screenshots/{rawg_pk}", response_model=Union[List[ScreenshotsOut], HttpError])
async def get_screenshots(
    rawg_pk: int,
    queries: ScreenshotsQueries = Depends(),
):
    return queries.get_screenshots(rawg_pk)
