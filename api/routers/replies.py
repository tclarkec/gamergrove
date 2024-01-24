from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union
from queries.replies import (
    ReplyInBase,
    ReplyIn,
    ReplyOut,
    ReplyQueries,
    InvalidReplyError,
    HttpError
)
from pydantic import BaseModel
from authenticator import authenticator

router = APIRouter()

@router.post("/api/replies/", response_model=Union[ReplyOut, HttpError])
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

@router.get("/api/replies/{account_id}/", response_model=Union[ReplyOut, HttpError])
async def get_user_replies(
    account_id: str,
    queries: ReplyQueries = Depends(),
):
    return queries.get_user_replies(account_id)

@router.get("/api/replies/{review_id}/", response_model=Union[ReplyOut, HttpError])
async def get_review_replies(
    review_id: str,
    queries: ReplyQueries = Depends(),
):
    return queries.get_review_replies(review_id)


@router.delete("/api/replies/{id}", response_model=bool)
async def delete_reply(
    id: str,
    queries: ReplyQueries = Depends(),
) -> bool:
    return queries.delete_reply(id)


@router.put("/api/replies/{id}", response_model=Union[ReplyOut, HttpError])
async def update_reply(
    id: str,
    user: ReplyIn,
    queries: ReplyQueries = Depends(),
) -> Union[HttpError, ReplyOut]:
    return queries.update_reply(id, user)
