from fastapi import (
    APIRouter, Depends, HTTPException, Request,
    Response, status,
)
from typing import Optional, Union
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountsQueries,
    DuplicateAccountError,
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
    queries: AccountsQueries = Depends(),
):
    hashed_password = authenticator.hash_password(data.password)

    try:
        account = queries.create(data, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    form = AccountForm(username=data.username, password=data.password)
    token = await authenticator.login(response, request, form, queries)
    return AccountToken(account=account, **token.dict())

@router.get("/accounts/{username}", response_model=AccountOut)
async def get_account(
    username: str,
    repo: AccountsQueries = Depends(),
):
    return repo.get(username)

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
