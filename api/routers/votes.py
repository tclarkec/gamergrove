from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union
from queries.votes import (
    VoteInBase,
    VoteIn,
    VoteOut,
    VoteQueries,
    InvalidVoteError,
    HttpError
)
from pydantic import BaseModel
from authenticator import authenticator

router = APIRouter()

@router.post("/api/votes", response_model=Union[VoteOut, HttpError])
async def create_vote(
    vote: VoteInBase,
    request: Request,
    response: Response,
    queries: VoteQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    response.status_code = 200
    account_id = account_data["id"]
    vote_dict = vote.dict()
    vote_dict["account_id"] = account_id
    try:
        created_Vote = queries.create_vote(vote_dict)

        if isinstance(created_Vote, HttpError):
            return created_Vote

        return created_Vote

    except InvalidVoteError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create Vote"
        )

@router.get("/api/votes/{account_id}", response_model=Union[VoteOut, HttpError])
async def get_user_votes(
    account_id: str,
    queries: VoteQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.get_user_votes(account_id)

@router.get("/api/votes/{review_id}", response_model=Union[VoteOut, HttpError])
async def get_review_votes(
    review_id: str,
    queries: VoteQueries = Depends(),
):
    return queries.get_review_votes(review_id)

@router.get("/api/votes/{id}", response_model=Union[VoteOut, HttpError])
async def get_vote(
    id: str,
    queries: VoteQueries = Depends(),
):
    return queries.get_vote(id)


@router.delete("/api/votes/{id}", response_model=bool)
async def delete_vote(
    id: str,
    queries: VoteQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.delete_vote(id)


@router.put("/api/votes/{id}", response_model=Union[VoteOut, HttpError])
async def update_vote(
    id: str,
    vote: VoteIn,
    queries: VoteQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_vote(id, vote)
