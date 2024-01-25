import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import Union, List
from fastapi import Request, Response, HTTPException
import requests
import logging

logging.basicConfig(level=logging.DEBUG)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))
api_key = os.environ.get("API_KEY")


class InvalidStoresError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str


class StoresInBase(BaseModel):
    store_url: str


class StoresIn(StoresInBase):
    rawg_pk: str


class StoresOut(BaseModel):
    id: str
    store_url: str
    rawg_pk: str


class StoresNotFoundError(Exception):
    pass


class StoresQueries:
    def get_stores(self, rawg_pk: str) -> List[StoresOut]:
        stores_list = []

        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM storesdb
                        WHERE rawg_pk = %s;
                        """,
                        [rawg_pk],
                    )
                    rows = cur.fetchall()

                    if rows:
                        for row in rows:
                            record = dict(zip([column.name for column in cur.description], row))
                            stores_list.append(StoresOut(**record))
                        logging.debug("stores from Database: %s", stores_list)

        except Exception as db_error:
            logging.error("Error fetching stores from the database: %s", db_error)

        # If not found in the database or not enough in the database, make an API call to Rawg
        api_url = f"https://api.rawg.io/api/games/{rawg_pk}/stores?key={api_key}"
        response = requests.get(api_url)

        if response.status_code == 200:
            external_data = response.json()
            stores = external_data.get("results", [])

            if stores:
                try:
                    with pool.connection() as conn:
                        with conn.cursor() as cur:
                            for store in stores:
                                store_url = store.get("url")
                                store_id = store.get("store_id")

                                # Check if the entry already exists in the database
                                cur.execute(
                                    """
                                    SELECT id
                                    FROM storesdb
                                    WHERE store_id = %s AND rawg_pk = %s;
                                    """,
                                    [store_url, store_id, rawg_pk],
                                )
                                existing_store = cur.fetchone()

                                if existing_store:
                                    continue

                                cur.execute(
                                    """
                                    INSERT INTO storesdb (store_id, store_url, rawg_pk)
                                    VALUES (%s, %s, %s)
                                    RETURNING id, store_id, store_url, rawg_pk;
                                    """,
                                    [store_id, store_url, rawg_pk],
                                )

                                row = cur.fetchone()
                                if row is not None:
                                    record = dict(zip([column.name for column in cur.description], row))
                                    stores_list.append(StoresOut(**record))

                except Exception as db_error:
                    logging.error("Error inserting stores into the database: %s", db_error)

        if not stores_list:
            logging.debug("No stores found in both database and API.")
            return []

        logging.debug("Returning stores: %s", stores_list)
        return stores_list

    def delete_stores(self, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM stores
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
