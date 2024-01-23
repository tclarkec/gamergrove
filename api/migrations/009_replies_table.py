steps = [
    [

        """
        CREATE TABLE replies (
        id SERIAL PRIMARY KEY,
        body TEXT,
        title VARCHAR(255),
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id),
        review_id INT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(id)
        );
        """,
        """
        DROP TABLE replies;
        """
    ],

]
