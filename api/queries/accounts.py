import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql, errors
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from fastapi import(HTTPException, status)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class AccountIn(BaseModel):
    username: str
    password: str

class AccountOut(BaseModel):
    id: int
    username: str

class AccountToken(Token):
    account: AccountOut

class AccountForm(BaseModel):
    username: str
    password: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )

                row = result.fetchone()

                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    return AccountOutWithPassword(**record)

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could not find an account with that username"
                )

    def create(self, data: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    result = db.execute(
                        """
                        INSERT INTO accounts (username, hashed_password)
                        VALUES (%s, %s)
                        RETURNING id, username, hashed_password;
                        """,
                        [data.username, hashed_password],
                    )

                    row = result.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        return AccountOutWithPassword(**record)
                except errors.UniqueViolation:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="That username is already taken"
                    )

    def delete(self, id: int, username: str) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                id_check = db.execute(
                    """
                    SELECT * FROM accounts
                    WHERE id = %s
                    """,
                    [id]
                )

                id_row = id_check.fetchone()
                if id_row is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="An account with that id does not exist in the database"
                    )

                username_check = db.execute(
                    """
                    DELETE FROM accounts
                    WHERE id = %s AND username = %s
                    """,
                    [
                        id,
                        username
                    ]
                )
                if username_check.rowcount == 0:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="You are attempting to delete an account that you did not create"
                    )
                return True
