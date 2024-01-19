CREATE TABLE accounts (
  account_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50)
);

CREATE TABLE gamesdb (
    game_id SERIAL PRIMARY KEY,
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
    icon_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    icon_url TEXT
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    icon_id INT NOT NULL,
    FOREIGN KEY (icon_id) REFERENCES icons(icon_id)
);

CREATE TABLE boards(
    board_id SERIAL PRIMARY KEY,
    board_name VARCHAR(255),
    description TEXT,
    private BOOLEAN,
    cover_photo VARCHAR(255),
    game_count INT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE libraries(
    library_id SERIAL PRIMARY KEY,
    wishlist BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    game_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES gamesdb(game_id),
    board_id INT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES boards(board_id)
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    body TEXT,
    title VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    game_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES gamesdb(game_id),
    replies_count INT DEFAULT NULL,
    vote_count INT DEFAULT NULL,
    ratings INT
);

CREATE TABLE replies (
    reply_id SERIAL PRIMARY KEY,
    body TEXT,
    title VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    review_id INT NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(review_id),
);

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    review_id INT NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(review_id),
    upvote BOOLEAN,
    downvote BOOLEAN
);
CREATE TABLE storesdb (
    storesdb_id SERIAL PRIMARY KEY,
    game_id INT,
    store_id INT,
    store_url VARCHAR(255)
);
CREATE TABLE screenshots (
    image_id SERIAL PRIMARY KEY,
    image_url VARCHAR(255),
    game_id INT REFERENCES gamesdb(game_id)
);
CREATE TABLE uploads (
    upload_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    board_id INT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES boards(board_id),
    image_uri VARCHAR(255)
);
