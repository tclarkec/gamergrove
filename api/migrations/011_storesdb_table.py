steps = [
    [

        """
        CREATE TABLE storesdb(
        id SERIAL PRIMARY KEY,
        game_id INT,
        FOREIGN KEY (game_id) REFERENCES gamesdb(rawg_pk),
        store_id INT,
        url VARCHAR(255),
        rawg_pk VARCHAR(20),
        FOREIGN KEY (rawg_pk) REFERENCES gamesdb(rawg_pk)
        );


        """,
        """
        DROP TABLE storesdb;
        """
    ],

]
