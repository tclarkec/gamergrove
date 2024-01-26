import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class InvalidUserError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str


class UserInBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    icon_id: str


class UserIn(UserInBase):
    account_id: str


class UserOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    icon_id: str
    account_id: str


class UserQueries:
    def get_user(self, id: str) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE id = %s;
                    """,
                    [id],
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return UserOut(**record)
                raise ValueError("Could not get user")

    def create_user(self, user_dict: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO users (first_name,
                    last_name,
                    email,
                    icon_id,
                    account_id)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id,
                    first_name,
                    last_name,
                    email,
                    icon_id,
                    account_id;
                    """,
                    [
                        user_dict["first_name"],
                        user_dict["last_name"],
                        user_dict["email"],
                        user_dict["icon_id"],
                        user_dict["account_id"]
                    ],
                )

                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return UserOut(**record)
                raise ValueError("Could not create user")

    def delete_user(self, id: str, account_id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s AND account_id = %s
                        """,
                        [
                            id,
                            account_id
                        ]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_user(self, id: str, user_dict: UserIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET first_name = %s,
                            last_name = %s,
                            email = %s,
                            icon_id = %s
                        WHERE id = %s AND account_id = %s
                        """,
                        [
                            user_dict["first_name"],
                            user_dict["last_name"],
                            user_dict["email"],
                            user_dict["icon_id"],
                            id,
                            user_dict["account_id"]
                        ]
                    )
                return UserOut(id=id, **user_dict)
        except ValidationError as e:
            print(e.errors())
            return False
