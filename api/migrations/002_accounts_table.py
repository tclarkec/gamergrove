steps = [
    [

        """
        CREATE TABLE accounts(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        hashed_password VARCHAR(500)

        );
        """,
        """
        DROP TABLE accounts;
        """
    ],

]
