import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class InvalidLibraryError(ValueError):
    pass

class HttpError(BaseModel):
    detail: str


class LibraryInBase(BaseModel):
    wishlist: bool
    game_id: str
    board_id: str

class LibraryIn(LibraryInBase):
    account_id: str

class LibraryOut(BaseModel):
    id: str
    wishlist: bool
    game_id: str
    board_id: str
    account_id: str

class LibraryQueries:
    def get_library(self, id: str) -> LibraryOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM libraries
                    WHERE account_id = %s
                    """,
                    [id],
                )
                library = result.fetchall()
                if library is not None:
                    record = []
                    for entry in library:
                        data = {}
                        for i, column in enumerate(cur.description):
                            data[column.name] = entry[i]
                        record.append(LibraryOut(**data))
                    return record
                raise ValueError("No User Library")

    def create_library_entry(self, library_dict: LibraryIn) -> LibraryOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO libraries (
                    wishlist,
                    game_id,
                    board_id,
                    account_id)
                    VALUES (%s, %s, %s, %s)
                    RETURNING
                    id,
                    wishlist,
                    game_id,
                    board_id,
                    account_id;
                    """,
                    [
                        library_dict["wishlist"],
                        library_dict["game_id"],
                        library_dict["board_id"],
                        library_dict["account_id"]
                    ],
                )

                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return LibraryOut(**record)
                raise ValueError("Could not create entry")

    def delete_library_entry(self, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM libraries
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_library_entry(self, id: str, library: LibraryIn) -> Union[LibraryOut, HttpError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE libraries
                        SET
                        wishlist = %s
                        WHERE id = %s
                        """,
                        [library.wishlist,
                         id]
                    )
                old_data = library.dict()
                return LibraryOut(id=id, **old_data)
        except ValidationError as e:
            print(e.errors())
            return False
