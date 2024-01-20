import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from jwtdown_fastapi.authentication import Token
# from authenticator import authenticator
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str

class AccountToken(Token):
    account: AccountOut


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountsQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        print("here in get): " + username)
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
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
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    print(record)
                    return AccountOutWithPassword(**record)

                raise ValueError("Could not get user record for this username")

# DATA CREATED BEING PUT IN DATABASE
    def create(self, data: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
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
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return AccountOutWithPassword(**record)

                raise ValueError("Failed to create the account")





# -------------------------------- FastAPI Models
