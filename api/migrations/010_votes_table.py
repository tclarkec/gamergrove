steps = [
    [

        """
        CREATE TABLE votes(
        id SERIAL PRIMARY KEY,
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id),
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
