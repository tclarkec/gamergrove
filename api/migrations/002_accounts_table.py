steps = [
    [

        """
        CREATE TABLE accounts(
        account_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(50)

        );
        """,
        """
        DROP TABLE accounts;
        """
    ],

]
