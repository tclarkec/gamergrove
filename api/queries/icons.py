import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql
from typing import Optional
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class IconIn(BaseModel):
    name: str
    icon_url: str


class IconOut(BaseModel):
    id: str
    name: str
    icon_url: str


class IconQueries:
    def get_icon(self, id: str) -> IconOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT *
                    FROM icons
                    WHERE id = %s;
                    """,
                    [id],
                )
                row = result.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return IconOut(**record)
                raise ValueError("Could not get user")
