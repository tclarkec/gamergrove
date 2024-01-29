steps = [
    [

        """
        CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        body TEXT,
        title VARCHAR(255),
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES gamesdb(id),
        replies_count INT DEFAULT 0,
        upvote_count INT DEFAULT 0,
        rating INT
        );


        """,
        """
        DROP TABLE reviews;
        """
    ],

]
