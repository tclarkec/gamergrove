steps = [
    [

        """
        CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        photo VARCHAR(255)

        );
        """,
        """
        DROP TABLE users;
        """
    ],

]
