import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql, errors
from pydantic import BaseModel
from fastapi import(HTTPException, status)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class HttpError(BaseModel):
    detail: str


class UserInBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    icon_id: int


class UserIn(UserInBase):
    account_id: int


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    icon_id: int
    account_id: int


class UserQueries:
    def get_user(self, id: int) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
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
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    return UserOut(**record)

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could not find a user with that id"
                )

    def create_user(self, user_dict: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    result = db.execute(
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
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        return UserOut(**record)
                    if ValueError:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Sorry, we couldn't create that user"
                        )
                except errors.UniqueViolation:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Sorry, that email is already taken"
                    )

    def delete_user(self, id: int, account_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                id_check = db.execute(
                    """
                    SELECT * FROM users
                    WHERE id = %s
                    """,
                    [id]
                )

                id_row = id_check.fetchone()
                if id_row is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="A user with that id does not exist in the database"
                    )

                account_id_check = db.execute(
                    """
                    DELETE FROM users
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
                        detail="You are attempting to delete a user that you did not create"
                    )
                return True

    def update_user(self, id: int, user_dict: UserIn) -> UserOut:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    try:
                        id_check = db.execute(
                            """
                            SELECT * FROM users
                            WHERE id = %s
                            """,
                            [id]
                        )

                        id_row = id_check.fetchone()
                        if id_row is None:
                            raise HTTPException(
                                status_code=status.HTTP_404_NOT_FOUND,
                                detail="A user with that id does not exist in the database"
                            )

                        account_id_check = db.execute(
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

                        if account_id_check.rowcount == 0:
                            raise HTTPException(
                                status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="You are attempting to update a user that you did not create"
                            )
                        return UserOut(id=id, **user_dict)
                    except errors.UniqueViolation:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Sorry, that email is already taken"
                        )
