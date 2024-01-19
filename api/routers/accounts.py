from fastapi import (
    APIRouter, Depends, HTTPException, Request,
    Response, status
)
from typing import Optional, Union
# from queries.users import (
#     UserOut,
#     UserIn,
#     UserQueries
# )
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountsQueries,
    DuplicateAccountError,
    UserToken
)
from authenticator import authenticator

router = APIRouter()


@router.post("/api/accounts/", response_model=AccountOut)
async def create_accounts(
    info: AccountIn,
    request: Request,
    response: Response,
    queries: AccountsQueries = Depends(),
) -> UserToken:
    hashed_password = authenticator.hash_password(info.password)
    print(hashed_password)
    try:
        account = queries.create_accounts(info, info, hashed_password)

    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    # form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, queries)
    return UserToken(account=account, **token.dict())



@router.get("/user/{account_id}/", response_model=AccountOut)
async def get_account(
    account_id: int,
    repo: AccountsQueries = Depends(),
):
    return repo.get_account(account_id)
