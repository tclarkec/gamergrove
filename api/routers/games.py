from fastapi import (APIRouter, Depends, Request, Response)
from typing import Union
from queries.games import (
    GamesIn,
    GamesOut,
    GamesQueries,
    HttpError
)


router = APIRouter()


@router.post("/api/games", response_model=Union[GamesOut, HttpError])
async def create_game(
    games: GamesIn,
    request: Request,
    response: Response,
    queries: GamesQueries = Depends(),

):
    created_games = queries.create_game(games)
    return created_games

@router.get("/api/games/{id}", response_model=GamesOut)
async def get_game(
    id: int,
    queries: GamesQueries = Depends(),
):
    return queries.get_game(id)


# @router.delete("/api/games/{id}", response_model=bool)
# async def delete_games(
#     id: str,
#     queries: GamesQueries = Depends(),
# ) -> bool:
#     return queries.delete_games(id)


@router.put("/api/games/{id}", response_model=Union[GamesOut, HttpError])
async def update_game(
    id: int,
    games: GamesIn,
    queries: GamesQueries = Depends(),
):
    return queries.update_game(id, games)
