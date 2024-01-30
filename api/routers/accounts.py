from fastapi import (
    APIRouter, Depends, Request,
    Response
)
from typing import Union
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    AccountToken,
    AccountForm
)
from authenticator import authenticator

from pydantic import BaseModel


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=Union[AccountToken, HttpError])
async def create_account(
    data: AccountIn,
    request: Request,
    response: Response,
    queries: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(data.password)

    account = queries.create(data, hashed_password)

    form = AccountForm(username=data.username, password=data.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())

@router.get("/api/accounts/{username}", response_model=AccountOut)
async def get_account(
    username: str,
    queries: AccountQueries = Depends()
):
    return queries.get(username)

@router.delete("/api/accounts/{id}/{username}", response_model = Union[bool, HttpError])
async def delete_account(
    id: int,
    queries: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    username = account_data["username"]
    return queries.delete(id, username)

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account
        }
