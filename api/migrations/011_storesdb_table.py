steps = [
    [

        """
        CREATE TABLE storesdb(
        id SERIAL PRIMARY KEY,
        game_id INT,
        store_id INT,
        store_url VARCHAR(255)
);


        """,
        """
        DROP TABLE storesdb;
        """
    ],

]
