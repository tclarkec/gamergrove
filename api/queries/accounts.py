import os
from pydantic import BaseModel
from psycopg_pool import ConnectionPool
from psycopg import connect, sql


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class Queries:
    pass


class AccountsQueries(Queries):
    def get(self, username: str) -> AccountOutWithPassword:
        print("here in get): " + username)
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )

                row = cur.fetchone()

                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    print(record)
                    return AccountOutWithPassword(**record)

                raise ValueError("Could not get user record for this username")

    def create_accounts(self, data: AccountIn, info: AccountOutWithPassword, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO accounts (username, password)
                    VALUES (%s, %s)
                    RETURNING username, password;
                    """,
                    (data.username, hashed_password),
                )

                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return AccountOutWithPassword(**record)

                raise ValueError("Failed to create the account")


class UserToken(BaseModel):
    access_token: str
    token_type: str
    expires_in: int


# -------------------------------- FastAPI Models






class gamesdb(BaseModel):
    game_id: int
    name: str
    description: str
    ratings: int
    dates: str
    background_img: str
    Xbox: bool
    PlayStation: bool
    Nintendo: bool
    PC: bool
    rating_count: float
    rating_total: float
    genre: str
    tags: str
    developers: str
    rawg_pk: int
    replies_count: int
