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


class InvalidScreenshotsError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str


class ScreenshotsInBase(BaseModel):
    image_url: str


class ScreenshotsIn(ScreenshotsInBase):
    rawg_pk: str


class ScreenshotsOut(BaseModel):
    id: str
    image_url: str
    rawg_pk: str


class ScreenshotsNotFoundError(Exception):
    pass


class ScreenshotsQueries:
    def get_screenshots(self, rawg_pk: str) -> List[ScreenshotsOut]:
        screenshots_list = []

        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM screenshots
                        WHERE rawg_pk = %s;
                        """,
                        [rawg_pk],
                    )
                    rows = cur.fetchall()

                    if rows:
                        for row in rows:
                            record = dict(zip([column.name for column in cur.description], row))
                            screenshots_list.append(ScreenshotsOut(**record))
                        logging.debug("Screenshots from Database: %s", screenshots_list)

        except Exception as db_error:
            logging.error("Error fetching screenshots from the database: %s", db_error)

        # If not found in the database or not enough in the database, make an API call to Rawg
        api_url = f"https://api.rawg.io/api/games/{rawg_pk}/screenshots?key={api_key}"
        response = requests.get(api_url)

        if response.status_code == 200:
            external_data = response.json()
            screenshots = external_data.get("results", [])

            if screenshots:
                try:
                    with pool.connection() as conn:
                        with conn.cursor() as cur:
                            for screenshot in screenshots:
                                image_url = screenshot.get("image")

                                # Check if the entry already exists in the database
                                cur.execute(
                                    """
                                    SELECT id
                                    FROM screenshots
                                    WHERE image_url = %s;
                                    """,
                                    [image_url]
                                )
                                existing_image = cur.fetchone()

                                if existing_image:

                                    continue

                                cur.execute(
                                    """
                                    INSERT INTO screenshots (image_url, rawg_pk)
                                    VALUES (%s, %s)
                                    RETURNING id, image_url, rawg_pk;
                                    """,
                                    [image_url, rawg_pk],
                                )

                                row = cur.fetchone()
                                if row is not None:
                                    record = dict(zip([column.name for column in cur.description], row))
                                    screenshots_list.append(ScreenshotsOut(**record))

                except Exception as db_error:
                    logging.error("Error inserting screenshots into the database: %s", db_error)

        if not screenshots_list:
            logging.debug("No screenshots found in both database and API.")
            return []

        logging.debug("Returning Screenshots: %s", screenshots_list)
        return screenshots_list

    def delete_screenshots(self, id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM screenshots
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
