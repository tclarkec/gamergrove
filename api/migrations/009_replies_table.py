steps = [
    [

        """
        CREATE TABLE replies (
        id SERIAL PRIMARY KEY,
        body TEXT,
        title VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        review_id INT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(id)
        );
        """,
        """
        DROP TABLE replies;
        """
    ],

]
