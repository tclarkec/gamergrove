steps = [
    [

        """
        CREATE TABLE icons (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        icon_url TEXT

        );
        """,
        """
        DROP TABLE icons;
        """,
        """
        INSERT INTO icons (name, icon_url) VALUES
        ('A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/768px-Video-Game-Controller-Icon.svg.png'),
        ('B', 'https://www.shareicon.net/data/512x512/2016/08/18/809170_user_512x512.png'),
        ('C', 'https://cdn1.iconfinder.com/data/icons/game-elements-10/128/King-crown-leader-games-character-512.png'),
        ('D', 'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-pokemon-go-game-icon-png-22.png');
        """
    ],

]
