from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union
from queries.users import (
    UserInBase,
    UserIn,
    UserOut,
    UserQueries,
    HttpError,
    InvalidUserError
)
from pydantic import BaseModel
from authenticator import authenticator


router = APIRouter()


@router.post("/api/users/", response_model=Union[UserOut, HttpError])
async def create_user(
    user: UserInBase,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    account_id = account_data["id"]
    user_dict = user.dict()
    user_dict["account_id"] = account_id
    try:
        created_user = queries.create_user(user_dict)

        if isinstance(created_user, HttpError):
            return created_user

        return created_user

    except InvalidUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create user"
        )


@router.get("/api/users/{id}/", response_model=UserOut)
async def get_user(
    id: str,
    queries: UserQueries = Depends(),
):
    return queries.get_user(id)


@router.delete("/api/users/{id}", response_model=bool)
async def delete_user(
    id: str,
    queries: UserQueries = Depends(),
) -> bool:
    return queries.delete_user(id)


@router.put("/api/users/{id}", response_model=Union[UserOut, HttpError])
async def update_user(
    id: str,
    user: UserIn,
    queries: UserQueries = Depends(),
) -> Union[HttpError, UserOut]:
    return queries.update_user(id, user)
