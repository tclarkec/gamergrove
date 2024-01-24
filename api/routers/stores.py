from fastapi import (APIRouter, Depends)
from queries.stores import (
    StoreOut,
    StoreQueries
)

router = APIRouter()


@router.get("/api/stores/{store_id}/", response_model=StoreOut)
async def get_store(
    store_id: str,
    queries: StoreQueries = Depends(),
):
    return queries.get_store(store_id)
