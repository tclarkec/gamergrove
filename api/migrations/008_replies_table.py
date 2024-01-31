steps = [
    [
        """
        CREATE TABLE replies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        body TEXT,
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
        review_id INT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE replies;
        """

    ],
]
