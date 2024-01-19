steps = [
    [

        """
        CREATE TABLE screenshots (
        image_id SERIAL PRIMARY KEY,
        image_url VARCHAR(255),
        game_id INT REFERENCES gamesdb(game_id)
        );


        """,
        """
        DROP TABLE screenshots;
        """
    ],

]
