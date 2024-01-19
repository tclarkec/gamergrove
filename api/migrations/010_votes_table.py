steps = [
    [

        """
        CREATE TABLE votes(
        vote_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        review_id INT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(review_id),
        upvote BOOLEAN,
        downvote BOOLEAN
    );

        """,
        """
        DROP TABLE votes;
        """
    ],

]
