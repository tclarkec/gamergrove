CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  hashed_password VARCHAR(500)
);

CREATE TABLE gamesdb (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(2500),
    ratings INTEGER,
    dates DATE,
    background_img VARCHAR(2500),
    Xbox BOOLEAN DEFAULT false,
    PlayStation BOOLEAN DEFAULT false,
    Nintendo BOOLEAN DEFAULT false,
    PC BOOLEAN DEFAULT false,
    rating_count FLOAT,
    rating_total FLOAT,
    genre VARCHAR(50),
    tags VARCHAR(50),
    developers VARCHAR(50),
    rawg_pk INTEGER,
    replies_count INTEGER
);

CREATE TABLE icons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    icon_url TEXT
);

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

CREATE TABLE boards(
    id SERIAL PRIMARY KEY,
    board_name VARCHAR(255),
    description TEXT,
    private BOOLEAN,
    cover_photo VARCHAR(255),
    game_count INT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE libraries(
    id SERIAL PRIMARY KEY,
    wishlist BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    game_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES gamesdb(id),
    board_id INT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES boards(id)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    body TEXT,
    title VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    game_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES gamesdb(id),
    account_id INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    replies_count INT DEFAULT NULL,
    vote_count INT DEFAULT NULL,
    ratings INT
);

CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    body TEXT,
    title VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    review_id INT NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id),
);

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    review_id INT NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    upvote BOOLEAN,
    downvote BOOLEAN
);
CREATE TABLE storesdb (
    id SERIAL PRIMARY KEY,
    game_id INT,
    store_id INT,
    store_url VARCHAR(255)
);
 CREATE TABLE screenshots (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255),
    game_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES gamesdb(id)
    );

CREATE TABLE uploads (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    board_id INT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES boards(id),
    image_uri VARCHAR(255)
);
