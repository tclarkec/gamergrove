steps = [
    [

        """
        CREATE TABLE screenshots (
        id SERIAL PRIMARY KEY,
        image_url VARCHAR(255),
        rawg_pk VARCHAR(20),
        FOREIGN KEY (rawg_pk) REFERENCES gamesdb(rawg_pk)
        );


        """,
        """
        DROP TABLE screenshots;
        """
    ],

]
