import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class BoardIn(BaseModel):
    
