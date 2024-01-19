steps = [
    [

        """
        CREATE TABLE libraries(
        id SERIAL PRIMARY KEY,
        wishlist BOOLEAN DEFAULT false,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES gamesdb(id),
        board_id INT NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(id)
);

        """,
        """
        DROP TABLE libraries;
        """
    ],

]
