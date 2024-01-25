import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import List
from pydantic import BaseModel
from typing import Union

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class HttpError(BaseModel):
    detail: str

class Snails(BaseModel):
    pass


class ReviewInBase(BaseModel):
    body: str
    title: str
    game_id: str
    replies_count: int
    vote_count: int
    ratings: int


class ReviewIn(ReviewInBase):
    account_id: str


class ReviewOut(BaseModel):
    id: str
    game_id: str
    account_id: str
    body: str
    title: str
    replies_count: int
    vote_count: int
    ratings: int


class ReviewQueries:
    def get_game_reviews(self, game_id: str) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE game_id = %s;
                    """,
                    [game_id],
                )
                rows = cur.fetchall()
                reviews = []
                if rows is not None:
                    record = {}
                    for row in rows:
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        reviews.append(ReviewOut(**record))
                    print(reviews)
                    return reviews
                return None

    def get_user_reviews(self, account_id: str) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                rows = cur.fetchall()
                reviews = []
                if rows is not None:
                    for row in rows:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        reviews.append(ReviewOut(**record))
                    return reviews
                return None


    def create_review(self, review_dict: ReviewIn) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
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
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return ReviewOut(**record)
                raise ValueError("Could not create review")

    def update_review(self, id: str, review: ReviewIn) -> Union[ReviewOut, HttpError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE reviews
                        SET body = %s,
                            title = %s,
                            ratings = %s,
                            vote_count = %s
                        WHERE id = %s
                        RETURNING id,
                            account_id,
                            body,
                            title,
                            ratings,
                            replies_count
                            game_id,
                            vote_count
                        """,
                        [
                            review['body'],
                            review['title'],
                            review['ratings'],
                            review['vote_count'],
                            id
                        ]
                    )
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        return ReviewOut(**record)
                    raise ValueError("Review not found")
        except HttpError as e:
            print(e.errors())
            return False

    def delete_review(self, id: str, account_id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM reviews
                        WHERE id = %s AND account_id = %s
                        """,
                        [id, account_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
