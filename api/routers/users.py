from fastapi import (APIRouter, Depends, Request, Response)
from typing import Union
from authenticator import authenticator
from queries.users import (
    UserInBase,
    UserOut,
    UserQueries,
    HttpError
)


router = APIRouter()


@router.post("/api/users", response_model=Union[UserOut, HttpError])
async def create_user(
    user: UserInBase,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account_id = account_data["id"]
    user_dict = user.dict()
    user_dict["account_id"] = account_id

    created_user = queries.create_user(user_dict)
    return created_user

@router.get("/api/users/{id}", response_model=UserOut)
async def get_user(
    id: int,
    queries: UserQueries = Depends(),
):
    return queries.get_user(id)


@router.delete("/api/users/{id}/{account_id}", response_model=bool)
async def delete_user(
    id: int,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data["id"]
    return queries.delete_user(id, account_id)

@router.put("/api/users/{id}/{account_id}", response_model=Union[UserOut, HttpError])
async def update_user(
    id: int,
    user: UserInBase,
    response: Response,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data["id"]
    user_dict = user.dict()
    user_dict["account_id"] = account_id

    updated_user = queries.update_user(id, user_dict)
    return updated_user
