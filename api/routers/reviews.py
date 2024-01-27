from fastapi import (APIRouter, Depends, HTTPException, Response,
                     status)
from typing import Union
from queries.reviews import (
    ReviewInBase,
    ReviewInUpdate,
    ReviewOut,
    ReviewQueries,
    HttpError
)
from pydantic import BaseModel
from authenticator import authenticator
from typing import List


class ErrorResponse(BaseModel):
    detail: str


router = APIRouter()


def authenticate_user(review_data: dict):
    account_id = review_data["id"]
    if account_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized access"
        )
    return account_id


@router.get("/api/reviews/games/{game_id}", response_model=List[ReviewOut])
async def get_game_reviews(
    game_id: str,
    queries: ReviewQueries = Depends(),
):
    return queries.get_game_reviews(game_id)


@router.get("/api/reviews/users/{account_id}", response_model=List[ReviewOut])
async def get_user_reviews(

    queries: ReviewQueries = Depends(),
    review_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = authenticate_user(review_data)
    return queries.get_user_reviews(account_id)

@router.get("/api/reviews/{id}", response_model=ReviewOut)
async def get_review(
    id: str,
    queries: ReviewQueries = Depends(),
):
    return queries.get_review(id)

@router.post("/api/reviews", response_model=Union[ReviewOut, ErrorResponse])
async def create_review(
    review: ReviewInBase,
    response: Response,
    queries: ReviewQueries = Depends(),
    review_data: dict = Depends(authenticator.get_current_account_data),
):
    account_id = authenticate_user(review_data)

    review_dict = review.dict()
    review_dict["account_id"] = account_id
    review_dict["replies_count"] = 0
    review_dict["vote_count"] = 0

    try:
        created_review = queries.create_review(review_dict)
        if isinstance(created_review, HttpError):
            return created_review
        return created_review
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Review cannot be created"
        )


@router.put("/api/reviews/users/{id}/{account_id}", response_model=Union[ReviewOut, HttpError])
async def update_review(
    id: str,
    review: ReviewInUpdate,
    response: Response,
    queries: ReviewQueries = Depends(),
    review_data: dict = Depends(authenticator.get_current_account_data),
):
    review_details = queries.get_review(id).dict()

    response.status_code=200
    account_id = authenticate_user(review_data)
    game_id = review_details["game_id"]
    ratings = review_details["ratings"]
    replies_count = review_details["replies_count"]
    vote_count = review_details["vote_count"]

    review_dict = review.dict()
    review_dict["account_id"] = account_id
    review_dict["game_id"] = game_id
    review_dict["ratings"] = ratings
    review_dict["replies_count"] = replies_count
    review_dict["vote_count"] = vote_count

    try:
        updated_review = queries.update_review(id, review_dict)

        if isinstance(updated_review, HttpError):
            return updated_review

        return updated_review
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Review cannot be created"
        )

@router.delete("/api/reviews/users/{id}/{account_id}", response_model=bool)
async def delete_review(
    id: str,
    queries: ReviewQueries = Depends(),
    review_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    account_id = authenticate_user(review_data)
    return queries.delete_review(id, account_id)
