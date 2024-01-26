from fastapi import (APIRouter, Depends, HTTPException, Request, Response, status)
from typing import Union, List
from pydantic import BaseModel
from authenticator import authenticator
from queries.libraries import (
    LibraryIn,
    LibraryInBase,
    LibraryOut,
    LibraryQueries,
    InvalidLibraryError,
    HttpError
)


router = APIRouter()


@router.post("/api/libraries/", response_model=Union[LibraryOut, HttpError])
async def create_library_entry(
    entry: LibraryInBase,
    request: Request,
    response: Response,
    queries: LibraryQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    account_id = account_data["id"]
    library_dict = entry.dict()
    library_dict["account_id"] = account_id
    try:
        created_entry = queries.create_library_entry(library_dict)
        if isinstance(created_entry, HttpError):
            return created_entry
        return created_entry
    except InvalidLibraryError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create library entry"
        )

@router.get("/api/libraries/{account_id}/", response_model=List[LibraryOut])
async def get_library(
    queries: LibraryQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data['id']
    return queries.get_library(account_id)

@router.delete("/api/libraries/{id}/{account_id}", response_model=bool)
async def delete_library_entry(
    id: str,
    queries: LibraryQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data["id"]
    return queries.delete_library_entry(id, account_id)

# @router.put("/api/libraries/{id}", response_model=Union[LibraryOut, HttpError])
# async def update_library_entry(
#     id: str,
#     library: LibraryIn,
#     queries: LibraryQueries = Depends()
# ) -> Union[HttpError, LibraryOut]:
#     return queries.update_library_entry(id, library)
