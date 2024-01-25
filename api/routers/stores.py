from fastapi import (APIRouter, Depends)
from queries.stores import (
    StoresOut,
    StoresQueries
)
from typing import List

router = APIRouter()


@router.get("/api/stores/{rawg_pk}/", response_model=List[StoresOut])
async def get_store(
    rawg_pk: str,
    queries: StoresQueries = Depends(),
):
    return queries.get_stores(rawg_pk)
