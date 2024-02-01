from fastapi import (APIRouter, Depends, Request, Response)
from typing import Union, List
from authenticator import authenticator
from queries.libraries import (
    LibraryInBase,
    LibraryInUpdate,
    LibraryOut,
    LibraryQueries,
    HttpError
)
from queries.boards import(
    BoardQueries
)

router = APIRouter()


@router.post("/api/libraries/", response_model=Union[LibraryOut, HttpError])
async def create_library_entry(
    entry: LibraryInBase,
    request: Request,
    response: Response,
    queries: LibraryQueries = Depends(),
    board_queries: BoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account_id = account_data["id"]
    library_dict = entry.dict()

    board_id = library_dict["board_id"]
    board_dict = board_queries.get_board(board_id).dict()
    del board_dict["id"]
    board_dict["game_count"] += 1
    board_queries.update_board(board_id, board_dict)

    library_dict["account_id"] = account_id
    created_entry = queries.create_library_entry(library_dict)
    return created_entry

@router.get("/api/users/libraries/{account_id}/", response_model=Union[List[LibraryOut], HttpError])
async def get_library(
    queries: LibraryQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data['id']
    return queries.get_library(account_id)

@router.get("/api/libraries/{id}/", response_model=Union[LibraryOut,HttpError])
async def get_library_entry(
    id: int,
    queries: LibraryQueries = Depends(),
):
    return queries.get_library_entry(id)

@router.delete("/api/libraries/{id}/{account_id}", response_model=Union[bool, HttpError])
async def delete_library_entry(
    id: int,
    queries: LibraryQueries = Depends(),
    board_queries: BoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    library_details = queries.get_library_entry(id).dict()
    board_id = library_details["board_id"]
    board_dict = board_queries.get_board(board_id).dict()
    del board_dict["id"]
    board_dict["game_count"] -=1
    board_queries.update_board(board_id, board_dict)

    account_id = account_data["id"]
    return queries.delete_library_entry(id, account_id)

@router.put("/api/libraries/{id}/{account_id}", response_model=Union[LibraryOut, HttpError])
async def update_library_entry(
    id: int,
    entry: LibraryInUpdate,
    queries: LibraryQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    library_details = queries.get_library_entry(id).dict()

    account_id = account_data["id"]
    game_id = library_details["game_id"]
    board_id = library_details["board_id"]

    library_dict = entry.dict()
    library_dict["account_id"] = account_id
    library_dict["game_id"] = game_id
    library_dict["board_id"] = board_id


    updated_entry = queries.update_library_entry(id,library_dict)
    return updated_entry
