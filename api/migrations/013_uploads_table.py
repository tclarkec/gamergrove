steps = [
    [

        """
        CREATE TABLE uploads (
        id SERIAL PRIMARY KEY,
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id),
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
