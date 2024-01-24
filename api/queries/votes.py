# import os
# from psycopg_pool import ConnectionPool
# from psycopg import connect, sql
# from pydantic import BaseModel


# pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


# class VoteIn(BaseModel):
#     user_id: str
#     review_id: str
#     upvote: bool
#     downvote: bool


# class VoteOut(BaseModel):
#     id: str
#     user_id: str
#     review_id: str
#     upvote: bool
#     downvote: bool


# class VoteQueries:
#     def create_vote(self, vote: VoteIn) -> VoteOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 result = cur.execute(
#                     """
#                     INSERT INTO votes (user_id,
#                     review_id,
#                     upvote,
#                     downvote)
#                     VALUES (%s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [
#                         vote.user_id,
#                         vote.review_id,
#                         vote.upvote,
#                         vote.downvote,
#                     ],
#                 )
#                 row = result.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]
#                     return VoteOut(**record)
#                 raise ValueError("Could not create user")
