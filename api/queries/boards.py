import os
from psycopg_pool import ConnectionPool
# from psycopg import connect, sql
# from typing import Optional
from pydantic import BaseModel, ValidationError
from typing import Union, List
import logging

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class InvalidBoardError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str


class BoardInBase(BaseModel):
    board_name: str
    description: str
    cover_photo: str
    private: bool = False


class BoardIn(BoardInBase):
    account_id: int


class BoardOut(BaseModel):
    id: str
    board_name: str
    description: str
    cover_photo: str
    private: bool = False
    account_id: int


class BoardQueries:
    def get_board(self, id: str) -> BoardOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM boards
                    WHERE id = %s;
                    """,
                    [id],
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return BoardOut(**record)
                raise ValueError("Could not get board")

    def get_all_boards(self, account_id: int) -> List[BoardOut]:
        print(account_id)
        boards = []

        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, board_name, description, cover_photo, private, account_id
                        FROM boards
                        WHERE account_id = %s;
                        """,
                        [account_id],
                    )
                    rows = cur.fetchall()
                    # logging.debug(f"Rows: {rows}")

                    if rows:
                        for row in rows:
                            record = dict(zip([column.name for column in cur.description], row))
                            boards.append(BoardOut(**record))
                        return boards

        except Exception as db_error:
            print(db_error)

        return boards

    def create_board(self, board_dict: BoardIn) -> BoardOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO boards (board_name,
                    description,
                    private,
                    cover_photo,
                    account_id)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id,
                    board_name,
                    description,
                    private,
                    cover_photo,
                    account_id;
                    """,
                    [
                        board_dict["board_name"],
                        board_dict["description"],
                        board_dict["private"],
                        board_dict["cover_photo"],
                        board_dict["account_id"]
                    ],
                )

                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return BoardOut(**record)
                raise ValueError("Could not create board")

    def delete_board(self, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM boards
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_board(self, id: str, board: BoardIn) -> Union[BoardOut, HttpError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE boards
                        SET board_name = %s,
                            description = %s,
                            private = %s,
                            cover_photo = %s
                        WHERE id = %s
                        """,
                        [
                            board.board_name,
                            board.description,
                            board.private,
                            board.cover_photo,
                            id
                        ]
                    )
                old_data = board.dict()
                return BoardOut(id=id, **old_data)
        except ValidationError as e:
            print(e.errors())
            return False
