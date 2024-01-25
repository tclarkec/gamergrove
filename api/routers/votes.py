from fastapi import (APIRouter, Depends, HTTPException, Request, Response,
                     status)
from typing import Union, List
from queries.votes import (
    VoteInBase,
    VoteIn,
    VoteInUpdate,
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
        created_vote = queries.create_vote(vote_dict)

        if isinstance(created_vote, HttpError):
            return created_vote

        return created_vote

    except InvalidVoteError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create Vote"
        )

@router.get("/api/votes/{account_id}", response_model=Union[List[VoteOut], HttpError])
async def get_user_votes(
    queries: VoteQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data["id"]
    return queries.get_user_votes(account_id)

@router.get("/api/votes/{review_id}", response_model=Union[List[VoteOut], HttpError])
async def get_review_votes(
    review_id: str,
    queries: VoteQueries = Depends(),
):
    return queries.get_review_votes(review_id)

@router.put("/api/votes/{id}/{account_id}", response_model=Union[VoteOut, HttpError])
async def update_vote(
    id: str,
    vote: VoteInUpdate,
    response: Response,
    queries: VoteQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    vote_details = queries.get_vote(id).dict()

    response.status_code = 200
    account_id = account_data["id"]
    review_id = vote_details["review_id"]

    vote_dict = vote.dict()
    vote_dict["account_id"] = account_id
    vote_dict["review_id"] = review_id
    try:
        updated_vote = queries.update_vote(id, review_id, account_id, vote_dict)
        if isinstance(updated_vote, HttpError):
            return updated_vote
        return updated_vote
    except InvalidVoteError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update vote"
        )
