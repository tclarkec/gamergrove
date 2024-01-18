steps = [
    [

        """
        CREATE TABLE votes(
        vote_id SERIAL PRIMARY KEY,
        review_id INT,
        upvote BOOLEAN,
        downvote BOOLEAN
    );

        """,
        """
        DROP TABLE votes;
        """
    ],

]
