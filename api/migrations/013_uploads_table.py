steps = [
    [

        """
        CREATE TABLE uploads (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        board_id INT NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(id),
        image_uri VARCHAR(255)
        );



        """,
        """
        DROP TABLE uploads;
        """
    ],

]
