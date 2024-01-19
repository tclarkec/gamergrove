steps = [
    [

        """
        CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        body TEXT,
        title VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES gamesdb(game_id),
        replies_count INT DEFAULT 0,
        vote_count INT DEFAULT 0,
        ratings INT
    );


        """,
        """
        DROP TABLE reviews;
        """
    ],

]
