steps = [
    [

        """
        CREATE TABLE boards(
        board_id SERIAL PRIMARY KEY,
        board_name VARCHAR(255),
        description TEXT,
        private BOOLEAN,
        cover_photo VARCHAR(255),
        game_count INT,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)

        );
        """,
        """
        DROP TABLE boards;
        """
    ],

]
