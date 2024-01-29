import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql, errors
from typing import List
from pydantic import BaseModel
from fastapi import(HTTPException, status)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class HttpError(BaseModel):
    detail: str


class ReviewInBase(BaseModel):
    body: str
    title: str
    game_id: int
    ratings: int


class ReviewInUpdate(BaseModel):
    body: str
    title: str


class ReviewIn(ReviewInBase):
    replies_count: int
    vote_count: int
    account_id: int


class ReviewOut(BaseModel):
    id: int
    game_id: int
    account_id: int
    body: str
    title: str
    replies_count: int
    vote_count: int
    ratings: int


class ReviewQueries:
    def get_game_reviews(self, game_id: int) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE game_id = %s;
                    """,
                    [game_id],
                )
                rows = db.fetchall()
                reviews = []
                if rows:
                    record = {}
                    for row in rows:
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        reviews.append(ReviewOut(**record))
                    return reviews

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No reviews associated with this game"
                )

    def get_review(self, id: int) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE id = %s;
                    """,
                    [id]
                )
                row = result.fetchone()
                if row is not None:
                    records = {}
                    for i, column in enumerate(db.description):
                        records[column.name] = row[i]
                    return ReviewOut(**records)

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could not find a review with that id"
                )

    def get_user_reviews(self, account_id: int) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                rows = db.fetchall()
                reviews = []
                if rows:
                    for row in rows:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        reviews.append(ReviewOut(**record))
                    return reviews

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No reviews written by this user"
                )

    def create_review(self, review_dict: ReviewIn) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    result = db.execute(
                        """
                        INSERT INTO reviews (
                            game_id,
                            account_id,
                            body,
                            title,
                            ratings,
                            replies_count,
                            vote_count
                            )
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING
                            id,
                            game_id,
                            account_id,
                            body,
                            title,
                            ratings,
                            replies_count,
                            vote_count
                        """,
                        [
                            review_dict["game_id"],
                            review_dict["account_id"],
                            review_dict["body"],
                            review_dict["title"],
                            review_dict["ratings"],
                            review_dict["replies_count"],
                            review_dict["vote_count"]
                        ],
                    )
                    row = result.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        return ReviewOut(**record)
                except ValueError:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Error creating review"
                    )

    def delete_review(self, id: int, account_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                id_check = db.execute(
                    """
                    SELECT * FROM reviews
                    WHERE id = %s
                    """,
                    [id]
                )

                id_row = id_check.fetchone()
                if id_row is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="A review with that id does not exist in the database"
                    )

                account_id_check = db.execute(
                    """
                    DELETE FROM reviews
                    WHERE id = %s AND account_id = %s
                    """,
                    [
                        id,
                        account_id
                    ]
                )
                if account_id_check.rowcount == 0:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="You are attempting to delete a review that you did not create"
                    )
                return True

    def update_review(self, id: int, review_dict: ReviewIn) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                id_check = db.execute(
                    """
                    SELECT * FROM reviews
                    WHERE id = %s
                    """,
                    [id]
                )

                id_row = id_check.fetchone()
                if id_row is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="A review with that id does not exist in the database"
                    )

                account_id_check = db.execute(
                    """
                    UPDATE reviews
                    SET body = %s,
                        title = %s,
                        ratings = %s,
                        replies_count = %s,
                        vote_count = %s
                    WHERE id = %s AND game_id = %s AND account_id = %s
                    """,
                    [
                        review_dict["body"],
                        review_dict["title"],
                        review_dict["ratings"],
                        review_dict["replies_count"],
                        review_dict["vote_count"],
                        id,
                        review_dict["game_id"],
                        review_dict["account_id"]
                    ]
                )
                if account_id_check.rowcount == 0:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="You are attempting to update a review that you did not create"
                    )
                return ReviewOut(id=id, **review_dict)
