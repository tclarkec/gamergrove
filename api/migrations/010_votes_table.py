steps = [
    [

        """
        CREATE TABLE votes(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        review_id INT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(id),
        upvote BOOLEAN,
        downvote BOOLEAN
    );

        """,
        """
        DROP TABLE votes;
        """
    ],

]
