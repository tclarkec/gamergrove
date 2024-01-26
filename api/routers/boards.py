from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union
from queries.boards import (
    BoardInBase,
    BoardIn,
    BoardOut,
    BoardQueries,
    InvalidBoardError
)
from pydantic import BaseModel
from authenticator import authenticator
from typing import List


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/boards", response_model=Union[BoardOut, HttpError])
async def create_board(
    board: BoardInBase,
    request: Request,
    response: Response,
    queries: BoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    account_id = account_data["id"]
    board_dict = board.dict()
    board_dict["account_id"] = account_id
    try:
        created_board = queries.create_board(board_dict)

        if isinstance(created_board, HttpError):
            return created_board

        return created_board

    except InvalidBoardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create board"
        )


@router.get("/api/board/{id}", response_model=BoardOut)
async def get_board(
    id: str,
    queries: BoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.get_board(id)


@router.get("/api/board/", response_model=List[BoardOut])
async def get_all_boards(
    account_id: int,
    queries: BoardQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    print(f"Endpoint - Account ID: {account_id}")
    return queries.get_all_boards(account_id)

@router.delete("/api/boards/{id}/{account_id}", response_model=bool)
async def delete_board(
    id: str,
    queries: BoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account_id = account_data["id"]
    return queries.delete_board(id)


@router.put("/api/boards/{id}/{account_id}", response_model=Union[BoardOut, HttpError])
async def update_board(
    id: str,
    board: BoardInBase,
    response: Response,
    queries: BoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    account_id = account_data["id"]

    board_dict = board.dict()
    board_dict["account_id"] = account_id
    try:
        updated_board = queries.update_board(id, board_dict)
        if isinstance(updated_board, HttpError):
            return updated_board
        return updated_board
    except InvalidBoardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update board"
        )
