import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class StoreInBase(BaseModel):
    game_id: str
    store_url: str


class StoreIn(StoreInBase):
    store_id: str


class StoreOut(BaseModel):
    id: str
    game_id: str
    store_id: str
    store_url: str


class StoreQueries:
    def get_store(self, store_id: str) -> StoreOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(

                    """
                    SELECT *
                    FROM storesdb
                    WHERE store_id = %s;
                    """,
                    [store_id],
                )
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return StoreOut(**record)
                raise ValueError("Could not retrieve store")
