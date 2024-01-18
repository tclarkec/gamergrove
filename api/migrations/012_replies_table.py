steps = [
    [

        """
        CREATE TABLE replies (
        reply_id SERIAL PRIMARY KEY,
        body TEXT,
        title VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        review_id INT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);
        """,
        """
        DROP TABLE replies;
        """
    ],

]
