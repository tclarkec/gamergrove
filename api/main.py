from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts, users, replies, votes
from seederfile import seed_data

app = FastAPI()
app.include_router(authenticator.router, tags = ["AUTH"])
app.include_router(accounts.router, tags=["AUTH"])
app.include_router(users.router, tags=["User"])
app.include_router(replies.router, tags=["Replies"])
app.include_router(votes.router, tags=["Votes"])


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
