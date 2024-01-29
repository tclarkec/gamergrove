import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql, errors
from pydantic import BaseModel, ValidationError
from datetime import date
from fastapi import(HTTPException, status)
from queries.screenshots import ScreenshotsQueries
from queries.stores import StoresQueries

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class HttpError(BaseModel):
    detail: str


class GameIn(BaseModel):
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

class GameOut(BaseModel):
    id: int
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


class GameQueries:
    def get_game(self, id: int) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
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
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    return GameOut(**record)

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could find a game with that id"
                )

    def create_game(self, games_dict: GameIn) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
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
                            games_dict["name"],
                            games_dict["description"],
                            games_dict["ratings"],
                            games_dict["dates"],
                            games_dict["background_img"],
                            games_dict["Xbox"],
                            games_dict["PlayStation"],
                            games_dict["Nintendo"],
                            games_dict["PC"],
                            games_dict["rating_count"],
                            games_dict["rating_total"],
                            games_dict["genre"],
                            games_dict["developers"],
                            games_dict["rawg_pk"],
                            games_dict["reviews_count"]
                        ],
                    )

                    shot = ScreenshotsQueries()
                    shot.get_screenshots(games_dict.rawg_pk)
                    store = StoresQueries()
                    store.get_stores(games_dict.rawg_pk)

                    row = result.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        return GameOut(**record)
                    if ValueError:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Error creating game"
                        )
                except errors.UniqueViolation:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="That game already exists in the database"
                    )
    def update_game(self, id: int, games_dict: GameIn) -> GameOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
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
                            games_dict["name"],
                            games_dict["description"],
                            games_dict["ratings"],
                            games_dict["dates"],
                            games_dict["background_img"],
                            games_dict["Xbox"],
                            games_dict["PlayStation"],
                            games_dict["Nintendo"],
                            games_dict["PC"],
                            games_dict["rating_count"],
                            games_dict["rating_total"],
                            games_dict["genre"],
                            games_dict["developers"],
                            games_dict["rawg_pk"],
                            games_dict["reviews_count"],
                            id
                        ],
                    )
                    return GameOut(id=id, **games_dict)
                except ValueError:
                    raise HTTPException(
                        status_code = status.HTTP_400_BAD_REQUEST,
                        detail="Error updating game"
                    )

    # def delete_games(self, id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM gamesdb
    #                     WHERE id = %s
    #                     """,
    #                     [id]
    #                 )
    #                 return True
    #     except Exception as e:
    #         print(e)
    #         return False
