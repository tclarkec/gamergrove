import os
from pydantic import BaseModel
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class Queries:
    pass

class AccountsQueries(Queries):

    def get(self, email: str) -> AccountOut:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountIn:
        pass
