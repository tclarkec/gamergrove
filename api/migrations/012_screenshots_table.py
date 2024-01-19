steps = [
    [

        """
        CREATE TABLE screenshots (
        id SERIAL PRIMARY KEY,
        image_url VARCHAR(255),
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES gamesdb(id)
        );


        """,
        """
        DROP TABLE screenshots;
        """
    ],

]
