import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union, List

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class InvalidVoteError(ValueError):
    pass

class HttpError(BaseModel):
    detail: str

class VoteInBase(BaseModel):
    review_id: str
    upvote: bool
    downvote: bool

class VoteInUpdate(BaseModel):
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
    def get_user_votes(self, account_id: str) -> List[VoteOut]:
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
                votes = []
                if rows is not None:
                    records = {}
                    for row in rows:
                        for i, column in enumerate(cur.description):
                            records[column.name] = row[i]
                        votes.append(VoteOut(**records))
                    return votes
                raise ValueError("Could not get all votes associated with that user")

    def get_review_votes(self, review_id: str) -> List[VoteOut]:
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
                votes = []
                if rows is not None:
                    records = {}
                    for row in rows:
                        for i, column in enumerate(cur.description):
                            records[column.name] = row[i]
                        votes.append(VoteOut(**records))
                    return votes
                raise ValueError("Could not get all votes associated with that review")

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

    def update_vote(self, id: str, review_id: str, account_id: str, vote_dict: VoteIn) -> VoteOut:
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
                        WHERE id = %s AND review_id = %s AND account_id = %s
                        """,
                        [
                            vote_dict["account_id"],
                            vote_dict["review_id"],
                            vote_dict["upvote"],
                            vote_dict["downvote"],
                            id,
                            review_id,
                            account_id
                        ]
                    )
                return VoteOut(id=id, **vote_dict)
        except ValidationError as e:
            print(e.errors())
            return False
