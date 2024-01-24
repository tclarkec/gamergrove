import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class InvalidReplyError(ValueError):
    pass

class HttpError(BaseModel):
    detail: str

class ReplyInBase(BaseModel):
    title: str
    body: str
    review_id: str

class ReplyIn(ReplyInBase):
    account_id: str

class ReplyOut(BaseModel):
    id: str
    title: str
    body: str
    review_id: str
    account_id: str

class ReplyQueries:
    def get_user_replies(self, account_id: str) -> Union[ReplyOut, HttpError]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM replies
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
                    return ReplyOut(**records)
                raise ValueError("Could not get all replies associated with that user")

    def get_review_replies(self, review_id: str) -> Union[ReplyOut, HttpError]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM replies
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
                    return ReplyOut(**records)
                raise ValueError("Could not get all replies associated with that review")

    def get_reply(self, id: str) -> ReplyOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM replies
                    WHERE id = %s;
                    """,
                    [id]
                )
                row = result.fetchone()
                if row is not None:
                    records = {}
                    for i, column in enumerate(cur.description):
                        records[column.name] = row[i]
                    return ReplyOut(**records)
                raise ValueError("Could not get reply")

    def create_reply(self, reply_dict: ReplyIn) -> ReplyOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO replies (title,
                    body,
                    account_id,
                    review_id)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id,
                    title,
                    body,
                    review_id,
                    account_id;
                    """,
                    [
                        reply_dict["title"],
                        reply_dict["body"],
                        reply_dict["account_id"],
                        reply_dict["review_id"]
                    ]
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return ReplyOut(**record)
                raise ValueError("Could not create reply")

    def delete_reply(self, id: str) -> bool:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM replies
                            WHERE id = %s
                            """,
                            [id]
                        )
                        return True
            except Exception as e:
                print(e)
                return False

    def update_reply(self, id: str, reply: ReplyIn) -> Union[ReplyOut, HttpError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE replies
                        SET title = %s,
                            body = %s,
                            account_id = %s,
                            review_id = %s
                        WHERE id = %s
                        """,
                        [
                            reply.title,
                            reply.body,
                            reply.account_id,
                            reply.review_id,
                            id
                        ]
                    )
                old_data = reply.dict()
                return ReplyOut(id=id, **old_data)
        except ValidationError as e:
            print(e.errors())
            return False
