steps = [
    [

        """
        CREATE TABLE boards(
        id SERIAL PRIMARY KEY,
        board_name VARCHAR(255),
        description TEXT,
        private BOOLEAN,
        cover_photo VARCHAR(255),
        game_count INT,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)

        );
        """,
        """
        DROP TABLE boards;
        """
    ],

]
