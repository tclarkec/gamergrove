import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql, errors
from pydantic import BaseModel
from typing import List
from fastapi import(HTTPException, status)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class HttpError(BaseModel):
    detail: str


class LibraryInBase(BaseModel):
    wishlist: bool
    game_id: int
    board_id: int

class LibraryIn(LibraryInBase):
    account_id: int

class LibraryInUpdate(BaseModel):
    wishlist: bool

class LibraryOut(BaseModel):
    id: int
    wishlist: bool
    game_id: int
    board_id: int
    account_id: int

class LibraryQueries:
    def get_library(self, account_id: int) -> List[LibraryOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM libraries
                    WHERE account_id = %s
                    """,
                    [account_id],
                )
                library = result.fetchall()
                library_records = []
                if library:
                    for entry in library:
                        data = {}
                        for i, column in enumerate(db.description):
                            data[column.name] = entry[i]
                        library_records.append(LibraryOut(**data))
                    return library_records

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could not find the library associated with this account"
                )

    def get_library_entry(self, id:int) -> LibraryOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM libraries
                    WHERE id = %s;
                    """,
                    [id]
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    return LibraryOut(**record)

                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Could not find a library entry with that id"
                )

    def create_library_entry(self, library_dict: LibraryIn) -> LibraryOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    game_id_check = db.execute(
                        """
                        SELECT * FROM gamesdb
                        WHERE id = %s
                        """,
                        [library_dict["game_id"]]
                    )

                    game_id_row = game_id_check.fetchone()
                    if game_id_row is None:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="A game with the id you inputted does not exist in the database"
                        )

                    result = db.execute(
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
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        return LibraryOut(**record)
                except ValueError:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Error creating library entry"
                    )

    def delete_library_entry(self, id: int, account_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                id_check = db.execute(
                    """
                    SELECT * FROM libraries
                    WHERE id = %s
                    """,
                    [id]
                )

                id_row = id_check.fetchone()
                if id_row is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="A library with that id does not exist in the database"
                    )

                account_id_check=db.execute(
                    """
                    DELETE FROM libraries
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
                        detail="You are attempting to delete a library that you did not create"
                    )
                return True

    # def update_library_entry(self, id: int, library_dict: LibraryIn) -> LibraryOut:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 id_check = db.execute(
    #                     """
    #                     SELECT * FROM libraries
    #                     WHERE id = %s
    #                     """,
    #                     [id]
    #                 )

    #                 id_row = id_check.fetchone()
    #                 if id_row is None:
    #                     raise HTTPException(
    #                         status_code=status.HTTP_404_NOT_FOUND,
    #                         detail="A library entry with that id does not exist in the database"
    #                     )

    #                 account_id_check=db.execute(
    #                     """
    #                     UPDATE libraries
    #                     SET wishlist = %s,
    #                         game_id = %s,
    #                         board_id = %s,
    #                         account_id = %s
    #                     WHERE id = %s AND account_id = %s
    #                     """,
    #                     [
    #                         library_dict["wishlist"],
    #                         library_dict["game_id"],
    #                         library_dict["board_id"],
    #                         library_dict["account_id"],
    #                         id,
    #                         library_dict["account_id"]
    #                     ]
    #                 )
    #             if account_id_check.rowcount <= 0:
    #                 raise HTTPException(
    #                     status_code=status.HTTP_401_UNAUTHORIZED,
    #                     detail="You are attempting to update a library entry that you did not create"
    #                 )
    #             return LibraryOut(id=id, **library_dict)
