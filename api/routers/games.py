from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union
from queries.games import (
    GamesIn,
    GamesOut,
    GamesQueries,
    InvalidGamesError,
    HttpError
)
# from pydantic import BaseModel
# from authenticator import authenticator


router = APIRouter()


@router.post("/api/games", response_model=Union[GamesOut, HttpError])
async def create_games(
    games: GamesIn,
    request: Request,
    response: Response,
    queries: GamesQueries = Depends(),

):
    response.status_code = 200
    try:
        created_games = queries.create_games(games)

        if isinstance(created_games, HttpError):
            return created_games

        return created_games

    except InvalidGamesError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create games"
        )


@router.get("/api/games/{id}", response_model=GamesOut)
async def get_games(
    id: str,
    queries: GamesQueries = Depends(),
):
    return queries.get_games(id)


@router.delete("/api/games/{id}", response_model=bool)
async def delete_games(
    id: str,
    queries: GamesQueries = Depends(),
) -> bool:
    return queries.delete_games(id)


@router.put("/api/games/{id}", response_model=Union[GamesOut, HttpError])
async def update_games(
    id: str,
    games: GamesIn,
    queries: GamesQueries = Depends(),
) -> Union[HttpError, GamesOut]:
    return queries.update_games(id, games)
