steps = [
    [

        """
        CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        icon_id INT NOT NULL,
        FOREIGN KEY (icon_id) REFERENCES icons(id),
        account_id INT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(id)

        );
        """,
        """
        DROP TABLE users;
        """
    ],

]
