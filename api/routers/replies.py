from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union, List
from queries.replies import (
    ReplyInBase,
    ReplyIn,
    ReplyInUpdate,
    ReplyOut,
    ReplyQueries,
    InvalidReplyError,
    HttpError
)
from pydantic import BaseModel
from authenticator import authenticator

router = APIRouter()

@router.post("/api/replies", response_model=Union[ReplyOut, HttpError])
async def create_reply(
    reply: ReplyInBase,
    request: Request,
    response: Response,
    queries: ReplyQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    response.status_code = 200
    account_id = account_data["id"]
    reply_dict = reply.dict()
    reply_dict["account_id"] = account_id
    try:
        created_reply = queries.create_reply(reply_dict)

        if isinstance(created_reply, HttpError):
            return created_reply

        return created_reply

    except InvalidReplyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create reply"
        )

@router.get("/api/replies/users/{account_id}", response_model=Union[List[ReplyOut], HttpError])
async def get_user_replies(
    queries: ReplyQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data["id"]
    return queries.get_user_replies(account_id)

@router.get("/api/replies/reviews/{review_id}", response_model=Union[List[ReplyOut], HttpError])
async def get_review_replies(
    review_id: str,
    queries: ReplyQueries = Depends(),
):
    return queries.get_review_replies(review_id)

@router.get("/api/replies/{id}", response_model=ReplyOut)
async def get_reply(
    id: str,
    queries: ReplyQueries = Depends(),
):
    return queries.get_reply(id)

@router.delete("/api/replies/{id}/{account_id}", response_model=bool)
async def delete_reply(
    id: str,
    queries: ReplyQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data["id"]
    return queries.delete_reply(id, account_id)


@router.put("/api/replies/{id}/{account_id}", response_model=Union[ReplyOut, HttpError])
async def update_reply(
    id: str,
    review_id: str,
    reply: ReplyInUpdate,
    response: Response,
    queries: ReplyQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    response.status_code = 200
    account_id = account_data["id"]
    reply_dict = reply.dict()
    reply_dict["account_id"] = account_id
    reply_dict["review_id"] = review_id
    try:
        updated_reply = queries.update_reply(id, review_id, account_id, reply_dict)
        if isinstance(updated_reply, HttpError):
            return updated_reply
        return updated_reply
    except InvalidReplyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update reply"
        )
