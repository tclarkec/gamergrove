import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql, errors
from typing import List
from pydantic import BaseModel
from fastapi import(HTTPException, status)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class HttpError(BaseModel):
    detail: str

class VoteInBase(BaseModel):
    review_id: int
    upvote: bool
    downvote: bool

class VoteInUpdate(BaseModel):
    upvote: bool
    downvote: bool

class VoteIn(VoteInBase):
    account_id: int

class VoteOut(BaseModel):
    id: int
    account_id: int
    review_id: int
    upvote: bool
    downvote: bool

class VoteQueries:
    def get_user_votes(self, account_id: int) -> List[VoteOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM votes
                    WHERE account_id = %s;
                    """,
                    [account_id]
                )
                rows = result.fetchall()
                votes = []
                if rows:
                    records = {}
                    for row in rows:
                        for i, column in enumerate(db.description):
                            records[column.name] = row[i]
                        votes.append(VoteOut(**records))
                    return votes

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No votes by this user"
                )

    def get_review_votes(self, review_id: int) -> List[VoteOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM votes
                    WHERE review_id = %s;
                    """,
                    [review_id]
                )
                rows = result.fetchall()
                votes = []
                if rows:
                    records = {}
                    for row in rows:
                        for i, column in enumerate(db.description):
                            records[column.name] = row[i]
                        votes.append(VoteOut(**records))
                    return votes

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="This review doesn't have any votes yet"
                )

    def get_vote(self, id: int) -> VoteOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
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
                    for i, column in enumerate(db.description):
                        records[column.name] = row[i]
                    return VoteOut(**records)

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could not find a vote with that id"
                )

    def create_vote(self, vote_dict: VoteIn) -> VoteOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    result = db.execute(
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
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        return VoteOut(**record)
                except ValueError:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Error creating vote"
                    )

    def update_vote(self, id: int, vote_dict: VoteIn) -> VoteOut:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    id_check = db.execute(
                        """
                        SELECT * FROM votes
                        WHERE id = %s
                        """,
                        [id]
                    )

                    id_row = id_check.fetchone()
                    if id_row is None:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="A vote with that id does not exist in the database"
                        )

                    account_id_check=db.execute(
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
                            vote_dict["review_id"],
                            vote_dict["account_id"]
                        ]
                    )
                if account_id_check.rowcount == 0:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="You are attempting to update a vote that you did not create"
                    )
                return VoteOut(id=id, **vote_dict)
