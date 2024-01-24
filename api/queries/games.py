import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union
from datetime import date

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class InvalidGamesError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str


class GamesIn(BaseModel):
    name: str
    description: str
    ratings: float
    dates: date
    background_img: str
    Xbox: bool = False
    PlayStation: bool = False
    Nintendo: bool = False
    PC: bool = False
    rating_count: float
    rating_total: float
    genre: str
    developers: str
    rawg_pk: int
    reviews_count: int

# class GamesIn(GamesInBase):
#     account_id: str


class GamesOut(BaseModel):
    id: str
    name: str
    description: str
    ratings: float
    dates: date
    background_img: str
    Xbox: bool = False
    PlayStation: bool = False
    Nintendo: bool = False
    PC: bool = False
    rating_count: float
    rating_total: float
    genre: str
    developers: str
    rawg_pk: int
    reviews_count: int


class GamesQueries:
    def get_games(self, id: str) -> GamesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM gamesdb
                    WHERE id = %s;
                    """,
                    [id],
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return GamesOut(**record)
                raise ValueError("Could not get games")

    def create_games(self, games_dict: GamesIn) -> GamesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO gamesdb (
                    name,
                    description,
                    ratings,
                    dates,
                    background_img,
                    Xbox,
                    PlayStation,
                    Nintendo,
                    PC,
                    rating_count,
                    rating_total,
                    genre,
                    developers,
                    rawg_pk,
                    reviews_count)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        games_dict.name,
                        games_dict.description,
                        games_dict.ratings,
                        games_dict.dates,
                        games_dict.background_img,
                        games_dict.Xbox,
                        games_dict.PlayStation,
                        games_dict.Nintendo,
                        games_dict.PC,
                        games_dict.rating_count,
                        games_dict.rating_total,
                        games_dict.genre,
                        games_dict.developers,
                        games_dict.rawg_pk,
                        games_dict.reviews_count
                    ],
                )

                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return GamesOut(**record)
                raise ValueError("Could not create games")

    def update_games(self, id: str, games: GamesIn) -> Union[GamesOut, HttpError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE gamesdb
                        SET name = %s,
                            description = %s,
                            ratings = %s,
                            dates = %s,
                            background_img = %s,
                            Xbox = %s,
                            PlayStation = %s,
                            Nintendo = %s,
                            PC = %s,
                            rating_count = %s,
                            rating_total = %s,
                            genre = %s,
                            developers = %s,
                            rawg_pk = %s,
                            reviews_count = %s
                        WHERE id = %s
                        """,
                        [
                            games.name,
                            games.description,
                            games.ratings,
                            games.dates,
                            games.background_img,
                            games.Xbox,
                            games.PlayStation,
                            games.Nintendo,
                            games.PC,
                            games.rating_count,
                            games.rating_total,
                            games.genre,
                            games.developers,
                            games.rawg_pk,
                            games.reviews_count,
                            id
                        ]
                    )
                old_data = games.dict()
                return GamesOut(id=id, **old_data)
        except ValidationError as e:
            print(e.errors())
            return False

    def delete_games(self, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM gamesdb
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
