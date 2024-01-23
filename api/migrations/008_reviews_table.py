steps = [
    [

        """
        CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        body TEXT,
        title VARCHAR(255),
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id),
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES gamesdb(id),
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
