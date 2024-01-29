from fastapi import (APIRouter, Depends, Request, Response)
from typing import Union
from queries.games import (
    GameIn,
    GameOut,
    GameQueries,
    HttpError
)


router = APIRouter()


@router.post("/api/games", response_model=Union[GameOut, HttpError])
async def create_game(
    game: GameIn,
    request: Request,
    response: Response,
    queries: GameQueries = Depends(),

):
    games_dict = game.dict()
    created_games = queries.create_game(games_dict)
    return created_games

@router.get("/api/games/{id}", response_model=GameOut)
async def get_game(
    id: int,
    queries: GameQueries = Depends(),
):
    return queries.get_game(id)


# @router.delete("/api/games/{id}", response_model=bool)
# async def delete_games(
#     id: int,
#     queries: GamesQueries = Depends(),
# ) -> bool:
#     return queries.delete_games(id)


@router.put("/api/games/{id}", response_model=Union[GameOut, HttpError])
async def update_game(
    id: int,
    game: GameIn,
    queries: GameQueries = Depends(),
):
    return queries.update_game(id, game)
