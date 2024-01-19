steps = [
    [

        """
        CREATE TABLE uploads (
        upload_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        board_id INT NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(board_id),
        image_uri VARCHAR(255)
        );



        """,
        """
        DROP TABLE uploads;
        """
    ],

]
