from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (accounts, users, boards, screenshots, games, replies,
                     votes, libraries, stores, reviews)
from seederfile import seed_data

app = FastAPI()
app.include_router(authenticator.router, tags=["AUTH"])
app.include_router(accounts.router, tags=["AUTH"])
app.include_router(users.router, tags=["User"])
app.include_router(boards.router, tags=["Boards"])
app.include_router(screenshots.router, tags=["Screenshots"])
app.include_router(games.router, tags=["Games"])
app.include_router(replies.router, tags=["Replies"])
app.include_router(votes.router, tags=["Votes"])
app.include_router(libraries.router, tags=["Libraries"])
app.include_router(stores.router, tags=["StoresDB"])
app.include_router(reviews.router, tags=["Reviews"])


@app.on_event("startup")
def startup_event():
    seed_data()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
