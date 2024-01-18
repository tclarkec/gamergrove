steps = [
    [

        """
        CREATE TABLE libraries(
        library_id SERIAL PRIMARY KEY,
        wishlist BOOLEAN DEFAULT false,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES gamesdb(game_id),
        board_id INT NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(board_id)
);

        """,
        """
        DROP TABLE libraries;
        """
    ],

]
