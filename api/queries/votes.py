import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class InvalidVoteError(ValueError):
    pass

class HttpError(BaseModel):
    detail: str

class VoteInBase(BaseModel):
    review_id: str
    upvote: bool
    downvote: bool

class VoteIn(VoteInBase):
    account_id: str

class VoteOut(BaseModel):
    id: str
    account_id: str
    review_id: str
    upvote: bool
    downvote: bool

class VoteQueries:
    def get_user_votes(self, account_id: str) -> VoteOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM votes
                    WHERE account_id = %s;
                    """,
                    [account_id]
                )
                rows = result.fetchall()
                if rows is not None:
                    records = {}
                    for row in rows:
                        for i, column in enumerate(cur.description):
                            records[column.name] = row[i]
                    return VoteOut(**records)
                raise ValueError("Could not get all votes associated with that user")

    def get_review_votes(self, review_id: str) -> VoteOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM votes
                    WHERE review_id = %s;
                    """,
                    [review_id]
                )
                rows = result.fetchall()
                if rows is not None:
                    records = {}
                    for row in rows:
                        for i, column in enumerate(cur.description):
                            records[column.name] = row[i]
                    return VoteOut(**records)
                raise ValueError("Could not get all votes associated with that review")

    def get_vote(self, id: str) -> VoteOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM votes
                    WHERE id = %s;
                    """,
                    [id]
                )
                row = result.fetchone()
                if row is not None:
                    records = {}
                    for i, column in enumerate(cur.description):
                        records[column.name] = row[i]
                    return VoteOut(**records)
                raise ValueError("Could not get vote")

    def create_vote(self, vote_dict: VoteIn) -> VoteOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO votes (account_id,
                    review_id,
                    upvote,
                    downvote)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id,
                    account_id,
                    review_id,
                    upvote,
                    downvote;
                    """,
                    [
                        vote_dict["account_id"],
                        vote_dict["review_id"],
                        vote_dict["upvote"],
                        vote_dict["downvote"]
                    ]
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return VoteOut(**record)
                raise ValueError("Could not create Vote")

    def delete_vote(self, id: str) -> bool:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM votes
                            WHERE id = %s
                            """,
                            [id]
                        )
                        return True
            except Exception as e:
                print(e)
                return False

    def update_vote(self, id: str, vote: VoteIn) -> VoteOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE votes
                        SET account_id = %s,
                            review_id = %s,
                            upvote = %s,
                            downvote = %s
                        WHERE id = %s
                        """,
                        [
                            vote.account_id,
                            vote.review_id,
                            vote.upvote,
                            vote.downvote,
                            id
                        ]
                    )
                old_data = vote.dict()
                return VoteOut(id=id, **old_data)
        except ValidationError as e:
            print(e.errors())
            return False
