import os
from psycopg_pool import ConnectionPool
from psycopg import connect, sql


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


def seed_data():
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM icons")
            icons = cur.fetchall()

            print(icons)
            if icons:
                pass
            else:
                result = cur.execute(
                    """
                    INSERT INTO icons (name, icon_url) VALUES
                    ('A', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/768px-Video-Game-Controller-Icon.svg.png'),
                    ('B', 'https://www.shareicon.net/data/512x512/2016/08/18/809170_user_512x512.png'),
                    ('C', 'https://cdn1.iconfinder.com/data/icons/game-elements-10/128/King-crown-leader-games-character-512.png'),
                    ('D', 'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-pokemon-go-game-icon-png-22.png');

                    INSERT INTO gamesdb ("name", description, ratings, dates, background_img, Xbox, PlayStation, Nintendo, PC, rating_count, rating_total, genre, developers, rawg_pk, reviews_count)
                    VALUES
                    ('Stellaris', 'Featuring deep strategic gameplay, a rich and enormously diverse selection of alien races and emergent storytelling, Stellaris has engaging challenging gameplay that rewards interstellar exploration as you traverse, discover, interact and learn more about the multitude of species you will encounter during your travels.<br /> Etch your name across the cosmos by forging a galactic empire; colonizing remote planets and integrating alien civilizations. Will you expand through war alone or walk the path of diplomacy to achieve your goals?Main FeaturesDeep &amp; Varied Exploration.<br /> Enormous procedural galaxies, containing thousands of planets.<br /> Explore Anomalies with your heroic Scientist leaders.<br /> Infinitely varied races through customization and procedural generation.<br /> Advanced Diplomacy system worthy of a Grand Strategy Game.<br /> Ship Designer based on a vast array of technologies.<br /> Stunning space visuals.</p>', '4.12', '2016-05-08', 'https://media.rawg.io/media/games/92b/92bbf8a451e2742ab812a580546e593a.jpg', 'False', 'False', 'False', 'True', '100', '412.0', 'Strategy', 'Paradox Development Studio', '10040', '0'),
                    ('Dying Light', '<p>Dying Light is a first-person action horror game with the elements of survival. It is a first part of the Dying light series followed by Dying Light 2. The game is set in the open-world environment of fictional Harran city. Players are offered to assume the role of an undercover agent Kyle Crane who has been sent in the quarantine zone. His mission is to find the rogue politician Kadir &quot;Rais&quot; Suleiman lost somewhere in the infected giant city. On the way to achieving the goal, Kyle will meet other survivors, who desperately try to stay alive among zombies. The chief game mechanic is running the generators and turning on streetlights throughout Harran to make another part of the map accessible and safe at nighttime. The game features day/night time cycles that change the game remarkably: the action becomes fast-paced, and all the infected people turn into dangerous zombies. Therefore, the gameplay is based on armed combat against mutants and Kyle’s sneak and parkour skill for preventing it.</p>', '4.09', '2015-01-27', 'https://media.rawg.io/media/games/4a5/4a5ce21f529cf8fd4670b4c3188b25df.jpg', 'True', 'True', 'True', 'True', '100', '409.0', 'Action', 'Techland', '42215', '0'),
                    ('Civilization IV: Warlords', '<p>Civilization IV: Warlords is the first official expansion pack for well-known video game Civilization IV. The game adds new features into original game such as a new category called Great Generals which can join a city as a Great Military Instructor, which gives +2 experience points to any military unit created in the city or creates a Military Academy, which boosts military unit production by 50%. Also, the game offers the ability to institute vassal states, which lets player to take up other empires as vassals. When an empire becomes a vassal, it loses the ability to declare war and make peace independently. <br /> Warlords offers new civilizations including Carthage, the Celts, Korea, the Ottoman Empire, the Vikings and the Zulu, and four new leaders for existing civilizations. <br /> There are also eight new scenarios, six new civilizations which can be played in single-player as well as in multiplayer mode, ten new leaders, three new leader traits, unique buildings for each civilization, three new wonders, new units, resources and improvements, core gameplay tweaks and additions and inclusion of all patches released for original game.</p>', '3.7', '2006-07-26', 'https://media.rawg.io/media/screenshots/4f2/4f24c59ac7ba91590d7394acac0bfae8.jpg', 'False', 'False', 'False', 'True', '100', '370.0', 'Strategy', 'Firaxis', '13779', '0'),
                    ('Hearts of Iron 2 Complete', '<p>Includes Hearts of Iron II plus the two expansions, Doomsday and Armageddon</p> <p>When Germany is defeated in 1945, the Allies and the new Soviet alliance fight for supremacy. World War III is drawing closer.</p> <p>Play as the ruler of one of 175 countries through World Wars II and III. As the Allies and the Soviet Union clash in Europe, the fate of the world hangs in the balance.</p> <ul> <li>Detailed diplomacy and production systems with help functions to avoid micromanagement.</li> <li>Movement-is-attack combat system making warfare more realistic.</li> <li>Mission-based Air and Naval system, giving options for logistical strikes and targeted bombing.</li> <li>New political system with possibilities to change the political base of your country during the war.</li> <li>Fifteen battle scenarios optimized for an evening or two for gaming. Historical scenarios like Case White, Operation Barbarossa and alternative history scenarios like Operation Watchtower and Case Green are included in the game.</li> <li>Co-operative multiplayer, enabling players to share the same country while playing.</li> </ul> <p>Doomsday Expansion Features</p> <ul> <li>World War III scenario with an alternative historical outcome. Play the Soviet alliance, the United States or any country of your choice as new superpowers rise to power on the global stage.</li> <li>Expanded tech trees with considerable detail in a new decade of warfare, allowing you to develop tactical nukes and other kinds of nuclear warfare as well as helicopter squads, Escort carriers and much more.</li> <li>Improved Diplomatic/Intelligence System reflects the increased political tension of the 1950s.</li> </ul> <p>Armageddon Expansion Features</p> <ul> <li>New attachments for Naval units; do you scrap or upgrade those old ships.</li> <li>Land units can now be built with brigades already attached.</li> <li>An Air Naval combat system that radically alters the combat balance.</li> <li>New damage algorithms for the Air combat system, making organization more important and allowing air units to fight longer.</li> </ul>', '3.35', '2009-01-23', 'https://media.rawg.io/media/screenshots/07d/07dad72dd41319d2ea2752b0b4155626.jpeg', 'False', 'False', 'False', 'True', '100', '335.0', 'Strategy', 'Paradox Development Studio', '19241', '0'),
                    ('Age of Empires IV', '<p>One of the most beloved real-time strategy games returns to glory with Age of Empires IV, putting you at the center of epic historical battles that shaped the world. Featuring both familiar and innovative new ways to expand your empire in vast landscapes with stunning 4K visual fidelity, Age of Empires IV brings an evolved real-time strategy game to a new generation.</p> <p>Return to History – The past is prologue as you are immersed in a rich historical setting of 8 diverse civilizations across the world from the English to the Chinese to the Delhi Sultanate in your quest for victory. Build cities, manage resources, and lead your troops to battle on land and at sea in 4 distinct campaigns with 35 missions that span across 500 years of history from the Dark Ages up to the Renaissance.</p> <p>Choose Your Path to Greatness with Historical Figures – Live the adventures of Joan of Arc in her quest to defeat the English, or command mighty Mongol troops as Genghis Khan in his conquest across Asia. The choice is yours – and every decision you make will determine the outcome of history.</p> <p>Customize Your Game with Mods – Available in Early 2022, play how you want with user generated content tools for custom games.</p> <p>Challenge the World – Jump online to compete, cooperate or spectate with up to 7 of your friends in PVP and PVE multiplayer modes.</p> <p>An Age for All Players – Age of Empires IV is an inviting experience for new players with a tutorial system that teaches the essence of real-time strategy and a Campaign Story Mode designed for first time players to help achieve easy setup and success, yet is challenging enough for veteran players with new game mechanics, evolved strategies, and combat techniques.</p>', '3.89', '2021-10-28', 'https://media.rawg.io/media/games/23e/23e45acbf29bd241913ddcf5cf4053d5.jpg', 'False', 'False', 'False', 'True', '100', '389.0', 'Strategy', 'Relic Entertainment', '58618', '0'),
                    ('Scythe: Digital Edition', '<p>Scythe is a board game set in an alternate-history 1920s period. It is a time of farming and war, broken hearts and rusted gears, innovation and valor. In Scythe, each player represents a fallen leader attempting to restore their honor and lead their faction to power in Eastern Europa. Players conquer territory, enlist new recruits, reap resources, gain villagers, build structures, and activate monstrous mechs.<br /> Features :<br /> -Asymmetry: Each player begins the game with different resources (strength, victory points, movement capabilities, and popularity), their choice of several faction-specific abilities, and a hidden goal. Starting positions are specially calibrated to contribute to each faction’s uniqueness and the asymmetrical nature of the game.<br /> -Strategy: Scythe gives players almost complete control over their fate. Other than each player’s individual hidden objective cards, the only elements of luck are encounter cards that players will draw as they interact with the citizens of newly explored lands and combat cards that give you a temporary boost in combat. Combat is also driven by choices, not luck or randomness.<br /> -Engaged Play: Scythe uses a streamlined action-selection mechanism (no rounds or phases) to keep gameplay moving at a brisk pace and reduce downtime between turns. While there is plenty of direct conflict, there is no player elimination, nor can units be killed or destroyed.<br /> Engine Building: Players can upgrade actions to become more efficient, build structures that improve their position on the map, enlist new recruits to enhance character abilities, activate mechs to deter opponents from invading, and expand their borders to reap greater types and quantities of resources. These engine-building aspects create a sense of momentum and progress throughout the game. The order in which players improve their engine adds to the unique feel of each game, even when playing one faction multiple times.</p>', '3.46', '2018-09-05', 'https://media.rawg.io/media/games/eed/eed5c04763919193268a78351d33ec19.jpg', 'False', 'False', 'False', 'True', '100', '346.0', 'Strategy', 'Asmodee Digital', '51350', '0'),
                    ('Gran Turismo 7', '<p>Gran Turismo™ 7 builds on 22 years of experience to bring you the best features from the history of the franchise</p> <p>Whether you’re a competitive racer, collector, fine-tuning builder, livery designer, photographer or arcade fan – ignite your personal passion for cars with features inspired by the past, present and future of Gran Turismo™.</p>', '4.29', '2022-03-04', 'https://media.rawg.io/media/games/3f6/3f6a04b856f23310d3c2f5be8c5963f7.jpg', 'False', 'True', 'False', 'False', '100', '429.0', 'Racing', 'Polyphony Digital', '452633', '0'),
                    ('Elden Ring', '<p>The Golden Order has been broken.</p> <p>Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.</p> <p>In the Lands Between ruled by Queen Marika the Eternal, the Elden Ring, the source of the Erdtree, has been shattered.</p> <p>Marika&#39;s offspring, demigods all, claimed the shards of the Elden Ring known as the Great Runes, and the mad taint of their newfound strength triggered a war: The Shattering. A war that meant abandonment by the Greater Will.</p> <p>And now the guidance of grace will be brought to the Tarnished who were spurned by the grace of gold and exiled from the Lands Between. Ye dead who yet live, your grace long lost, follow the path to the Lands Between beyond the foggy sea to stand before the Elden Ring.</p>', '4.42', '2022-02-25', 'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg', 'True', 'True', 'False', 'True', '100', '442.0', 'Action', 'FromSoftware', '326243', '0'),
                    ('Super Smash Bros. Ultimate', '<p>Super Smash Bros. Ultimate is the fifth game in its franchise. It is also the first game in its series to be released for Nintendo Switch.</p> <h3>Premise</h3> <p>The series is a crossover of characters from various video game franchises, such as The Legend of Zelda, Pokemon, Sonic the Hedgehog, Super Mario, Metroid, and Mega Man, among many others. Their famous protagonists fight each other on an arena. In accordance with its name, the game is the “ultimate” installment of the series, in that it offers the players all the characters ever featured in Super Smash Bros. The game also introduces five new characters, most famously, Castlevania&#39;s Simon Belmont.</p> <h3>Gameplay</h3> <p>Unlike most fighting games, Super Smash Bros. series is built around knocking opponents out of the arena rather than lowering their health bars. However, the damage meter increases the character&#39;s chances to be knocked out. Each fighter has a limited number of lives and loses one when he or she is knocked out. The player is eliminated when he or she loses all lives.</p> <h3>Multiplayer</h3> <p>Super Smash Bros. Ultimate includes several competitive multiplayer modes. Besides the traditional versus mode, there are several new modes not featured in the previous games. These include Tournament (the playoff mode for 32 players), Smash Squad (team multiplayer), Smashdown (a mode in which the defeated characters are eliminated).</p>', '4.37', '2018-12-07', 'https://media.rawg.io/media/games/9f3/9f3c513b301d8d7250a64dd7e73c62df.jpg', 'False', 'False', 'True', 'False', '100', '437.0', 'Fighting', 'Nintendo', '58829', '0'),
                    ('DRAGON QUEST XI: Echoes of an Elusive Age', '<p>DRAGON QUEST® XI: Echoes of an Elusive Age™ follows the journey of a hunted Hero who must uncover the mystery of his fate with the aid of a charismatic cast of supporting characters. They embark on a quest taking them across continents and over vast oceans as they learn of an ominous threat facing the world.<br /> DQ XI brings a massive, gorgeous world to life in a style that blends stylistic cel-shading with photorealistic detail.<br /> Engage in a turn-based battle system that eases players into combat, featuring mechanics simple enough for novices but with enough depth to satisfy long-time fans.<br /> DQ XI features tons of side-quests and mini-games, providing enough content to keep you playing for well over 100 hours.<br /> Software subject to license (us.playstation.com/softwarelicense). Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service &amp; playstationnetwork.com/privacy-policy). One-time license fee for play on account’s designated primary PS4™ system and other PS4™ systems when signed in with that account.<br /> DRAGON QUEST, ECHOES OF AN ELUSIVE AGE, SQUARE ENIX and the SQUARE ENIX logo are trademarks or registered trademarks of Square Enix Holdings Co., Ltd.</p>', '4.31', '2017-07-29', 'https://media.rawg.io/media/games/e04/e041cc430f6b6681477580d3bcddf29f.jpg', 'True', 'True', 'True', 'True', '100', '430.99999999999994', 'RPG', 'Square Enix', '58084', '0'),
                    ('The Witcher 3: Wild Hunt', '<p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.</p> <p>CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.</p> <p>Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>', '4.65', '2015-05-18', 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', 'True', 'True', 'True', 'True', '100', '465.00000000000006', 'Action', 'CD PROJEKT RED', '3328', '0'),
                    ('The Elder Scrolls V: Skyrim', '<p>The fifth game in the series, Skyrim takes us on a journey through the coldest region of Cyrodiil. Once again player can traverse the open world RPG armed with various medieval weapons and magic, to become a hero of Nordic legends –Dovahkiin, the Dragonborn. After mandatory character creation players will have to escape not only imprisonment but a fire-breathing dragon. Something Skyrim hasn’t seen in centuries.</p>', '4.42', '2011-11-11', 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg', 'True', 'True', 'True', 'True', '100', '442.0', 'Action', 'Bethesda Softworks', '5679', '0'),
                    ('Divinity: Original Sin 2', '<p>The Divine is dead. The Void approaches. And the powers latent within you are soon to awaken. The battle for Divinity has begun. Choose wisely and trust sparingly; darkness lurks within every heart.</p> <p>Who will you be? A flesh-eating elf; an imperial lizard; an undead risen from the grave? Choose your race and origin story - or create your own! Discover how the world reacts differently to who - and what - you are.It’s time for a new Divinity!<br /> Gather your party and develop relationships with your companions. Blast your opponents in deep tactical turn-based combat. Use the environment as a weapon, use height to your advantage, and manipulate the elements.Ascend as the god that Rivellon so desperately needs.<br /> Explore the vast and layered world of Rivellon alone or with up to 4 players in drop-in/drop-out co-operative play. Go anywhere, kill anyone, and explore endless ways to interact with the world. Continue to play in the brand-new PvP and Game Master modes.<br /> Choose your race and origin. or create your own as a Human, Lizard, Elf, Dwarf, or Undead. The world reacts to who you are, and what you’ve done. Every choice will have a consequence.<br /> Unlimited freedom to explore and experiment. Go anywhere, talk to anyone, and interact with everything! Every NPC can be killed, and every animal spoken to! Even ghosts hold a few secrets or two…<br /> The next generation of turn-based combat. Revamped action point system, AI 2.0., new elemental combos, over 200 skills, height advantage… and much, much more.<br /> Up to 4 player online and split-screen multiplayer. Choose one of the 6 pre-made characters or create your own. Play with your friends online or in local split-screen with full controller support.<br /> Game Master Mode: Take your imagination to the next level and craft your own stories with the Game Master mode. Download fan-made campaigns and mods from Steam Workshop.</p>', '4.4', '2017-09-14', 'https://media.rawg.io/media/games/424/424facd40f4eb1f2794fe4b4bb28a277.jpg', 'True', 'True', 'True', 'True', '100', '440.00000000000006', 'RPG', 'Larian Studios', '10073', '0'),
                    ('Kingdom Come: Deliverance', '<p>You&#39;re Henry, the son of a blacksmith. Thrust into a raging civil war, you watch helplessly as invaders storm your village and slaughter your friends and family. Narrowly escaping the brutal attack, you grab your sword to fight back. Avenge the death of your parents and help repel the invading forces!</p>', '4.02', '2018-02-13', 'https://media.rawg.io/media/games/d8f/d8f3b28fc747ed6f92943cdd33fb91b5.jpeg', 'True', 'True', 'False', 'True', '100', '401.99999999999994', 'Action', 'Deep Silver', '28172', '0'),
                    ('Marvel''s Spider-Man Remastered', '<p>This isn’t the Spider-Man you’ve met or ever seen before. In Marvel’s Spider-Man Remastered, we meet an experienced Peter Parker who’s more masterful at fighting big crime in New York City. At the same time, he’s struggling to balance his chaotic personal life and career while the fate of Marvel’s New York rests upon his shoulders.</p> <p>Discover the complete web-slinging story with the Marvel’s Spider-Man: Miles Morales Ultimate Edition. This unmissable bundle includes a voucher code** for Marvel’s Spider-Man Remastered – the complete award-winning game, including all three DLC chapters in the Marvel’s Spider-Man: The City That Never Sleeps adventure – remastered and enhanced for the PS5 console.</p>', '4.45', '2020-11-12', 'https://media.rawg.io/media/games/5f1/5f1399f755ed3a40b04a9195f4c06be5.jpg', 'False', 'True', 'False', 'True', '100', '445.0', 'Action', 'Insomniac Games', '663742', '0'),
                    ('Uncharted: Drake''s Fortune', '<p>The game that started the popular Uncharted series. It is all about a treasure hunt in the jungle and ancient ruins and thus somewhat similar in mood and aesthetics to the Tomb Raider series, albeit with a slightly more realistic approach. </p> <p>The plot follows the adventurer and treasure seeker Nathan Drake, who believes himself to be a distant offspring of the famous Sir Francis Drake. When exhuming his ancestor&#39;s remains, Nathan discovers an artifact that supposedly shows him the way to the legendary El Dorado, the city of gold in the Latin American folklore. Accompanied by journalist Elena Fisher, he sets out on a dangerous journey to a remote island. Throughout the game Nathan, controlled by the player, will have to fight pirates, using both melee weapons and firearms, and explore ancient ruins by jumping the cliffs, climbing the walls and swinging from the ropes.</p> <p>Uncharted: Drake''s Fortune includes motion-captured cinematic cutscenes that help develop characters and the plot to the point the game may feel like a blockbuster movie.</p>', '4.03', '2007-11-19', 'https://media.rawg.io/media/games/f2e/f2e6dcf9c27d99ba2551f1094ad41756.jpg', 'False', 'True', 'False', 'False', '100', '403.0', 'Action', 'Naughty Dog', '4340', '0'),
                    ('God of War (2018)', '<p>It is a new beginning for Kratos. Living as a man outside the shadow of the gods, he ventures into the brutal Norse wilds with his son Atreus, fighting to fulfill a deeply personal quest. </p> <p>His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… And teach his son to do the same. This startling reimagining of God of War deconstructs the core elements that defined the series—satisfying combat; breathtaking scale; and a powerful narrative—and fuses them anew. </p> <p>Kratos is a father again. As mentor and protector to Atreus, a son determined to earn his respect, he is forced to deal with and control the rage that has long defined him while out in a very dangerous world with his son. </p> <p>From the marble and columns of ornate Olympus to the gritty forests, mountains, and caves of Pre-Viking Norse lore, this is a distinctly new realm with its own pantheon of creatures, monsters, and gods. With an added emphasis on discovery and exploration, the world will draw players in to explore every inch of God of War’s breathtakingly threatening landscape—by far the largest in the franchise. </p> <p>With an over the shoulder free camera that brings the player closer to the action than ever before, fights in God of War mirror the pantheon of Norse creatures Kratos will face: grand, gritty, and grueling. A new main weapon and new abilities retain the defining spirit of God of War while presenting a vision of violent conflict that forges new ground in the genre</p>', '4.57', '2018-04-20', 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg', 'False', 'True', 'False', 'True', '100', '457.0', 'Action', 'SCE Santa Monica Studio', '58175', '0'),
                    ('Destiny 2: Forsaken', '<p>Following years of strife, what remains of the Reef has fallen to lawlessness. You and Cayde-6 are sent to personally investigate the recent unrest. Upon arrival, you soon discover the most-wanted criminals in the Prison of Elders have organized an escape. Beyond the Vanguard’s authority, you’ll pursue these fugitives deep into the Reef. Explore new regions, awaken new powers, earn powerful weapons, and uncover long lost Awoken secrets. The hunt is on.</p>', '4.13', '2018-09-04', 'https://media.rawg.io/media/games/68c/68c7bafb388dc19348bc694ae55919a5.jpg', 'True', 'True', 'False', 'True', '100', '413.0', 'Action', 'Activision', '59233', '0'),
                    ('Cyberpunk 2077: Phantom Liberty', '<p>Phantom Liberty is a new spy-thriller adventure for Cyberpunk 2077. When the orbital shuttle of the President of the New United States of America is shot down over the deadliest district of Night City, there’s only one person who can save her — you. Become V, a cyberpunk for hire, and dive deep into a tangled web of espionage and political intrigue, unraveling a story that connects the highest echelons of power with the brutal world of black-market mercenaries.</p> <p>Infiltrate Dogtown, a city-within-a-city run by a trigger-happy militia and ruled by a leader with an iron fist. With the help of NUSA sleeper agent Solomon Reed (Idris Elba) and the support of Johnny Silverhand (Keanu Reeves), unravel a web of shattered loyalties and use your every skill to survive in a fractured world of desperate hustlers, shadowy netrunners, and ruthless mercenaries. Built with the power of next-gen hardware in mind, Phantom Liberty offers brand-new gameplay mechanics, nail-biting courier jobs, gigs, and missions — and a thrilling main quest where freedom and loyalty always come at a price.</p>', '4.7', '2023-09-26', 'https://media.rawg.io/media/games/062/06285b425e61623530c5430f20e5d222.jpg', 'True', 'True', 'False', 'True', '100', '470.0', 'Action', 'CD PROJEKT RED', '846303', '0'),
                    ('Fallout: New Vegas', '<p>Fallout: New Vegas is the second instalment after the reboot of the Fallout series and a fourth instalment in the franchise itself. Being a spin-off and developed by a different studio, Obsidian Entertainment, Fallout: New Vegas follows the Courier as he&#39;s ambushed by a gang lead by Benny, stealing a Platinum Chip and heavily wounded, practically left for dead. As he wakes up, he minds himself in the company of Doc Mitchell who saved our protagonist and patches him up. This section of the game is given for customising your characters, picking traits and the look of the main hero before embarking on his journey to retrieve Platinum Chip.</p> <p>New Vegas has very similar gameplay to Fallout 3 with a few improvements, such as iron sights for most of the guns, new animations for VATS kills, new perk Survivor, which allowed you to have more benefits from drinks and food you could craft and gambling in the casinos. Expanded crafting system, weapon modification system force player to scavenge for resources. Reputation system was reintroduced in New Vegas as old reputation system from Fallout 2, with Karma making a serious impact on the game.</p>', '4.44', '2010-10-19', 'https://media.rawg.io/media/games/995/9951d9d55323d08967640f7b9ab3e342.jpg', 'True', 'True', 'False', 'True', '100', '444.00000000000006', 'Action', 'Obsidian Entertainment', '5563', '0'),
                    ('The Last of Us Part II', '<p>The Last of Us Part II is the sequel to the post-apocalyptic zombie game The Last of Us.</p> <p>Plot</p> <p>The game follows Ellie, the girl who was the secondary protagonist and the player character&#39;s companion in The Last of Us. The game is set five years after the ending of the original. Both Ellie (who is by 19 now) and Joel survived and live in Jackson, Wyoming, where Ellie is dating another girl, Dina. However, the characters have to deal with the evil cult called the Seraphites, who try to sacrifice their former members. A matter of revenge forces Ellie and her friends to undertake a trip to Seattle, Washington, to kill their enemies. The major theme of the plot is Ellie&#39;s dealing with her hate issues.</p> <p>Gameplay</p> <p>Unlike in the original game, the player controls Ellie instead of Joel, who now becomes her AI-controlled companion. The game features improved controls that include new options such as crawling, dodging, and a jump button. A new AI system allows the human adversaries to communicate share information with each other. The game also introduces multiplayer.</p>', '4.42', '2020-06-19', 'https://media.rawg.io/media/games/909/909974d1c7863c2027241e265fe7011f.jpg', 'False', 'True', 'False', 'False', '100', '442.0', 'Action', 'Naughty Dog', '51325', '0'),
                    ('Final Fantasy VII', '<p>The world is under the control of Shinra, a corporation controlling the planet&#39;s life force as mako energy. In the city of Midgar, Cloud Strife, former member of Shinra&#39;s elite SOLDIER unit now turned mercenary lends his aid to the Avalanche resistance group, unaware of the epic consequences that await him.</p> <p>FINAL FANTASY VII REMAKE is a reimagining of the iconic original with unforgettable characters, a mind-blowing story, and epic battles.<br /> The story of this first, standalone game in the FINAL FANTASY VII REMAKE project covers up to the party’s escape from Midgar, and goes deeper into the events occurring in Midgar than the original FINAL FANTASY VII.</p>', '4.37', '2020-04-10', 'https://media.rawg.io/media/games/d89/d89bd0cf4fcdc10820892980cbba0f49.jpg', 'False', 'True', 'False', 'True', '100', '437.0', 'Action', 'Square Enix', '259801', '0'),
                    ('Stray', '<p>Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten city.</p> <p>Stray is a third-person cat adventure game set amidst the detailed, neon-lit alleys of a decaying cybercity and the murky environments of its seedy underbelly. Roam surroundings high and low, defend against unforeseen threats and solve the mysteries of this unwelcoming place inhabited by curious droids and dangerous creatures.</p> <p>See the world through the eyes of a cat and interact with the environment in playful ways. Be stealthy, nimble, silly, and sometimes as annoying as possible with the strange inhabitants of this mysterious world.</p> <p>Along the way, the cat befriends a small flying drone, known only as B-12. With the help of this newfound companion, the duo must find a way out.</p> <p>Stray is developed by BlueTwelve Studio, a small team from the south of France mostly made up of cats and a handful of humans.</p>', '4.15', '2022-07-19', 'https://media.rawg.io/media/games/cd3/cd3c9c7d3e95cb1608fd6250f1b90b7a.jpg', 'True', 'True', 'False', 'True', '100', '415.00000000000006', 'Action', 'BlueTwelve', '452638', '0'),
                    ('Spyro Reignited Trilogy', '<p>Spyro Reignited Trilogy is a collection that includes three remastered games from the Spyro franchise that were released in the late 1990s: Spyro the Dragon, Spyro 2: Ripto&#39;s Rage! and Spyro: Year of the Dragon</p> <h3>Plot</h3> <p>The plot of the game is identical to that of the three original games. They all follow Spyro, a small cutesy purple dragon, on his quest to save his dragon kin from various villains.</p> <p>The games are set in the Dragon Kingdom, a fantasy world inhabited by sentient dragons. There are five dragon realms that used to co-exist peacefully. In the first game, the villain is Gnasty Gnorc (a gnome/orc half-blood), who magically turned all dragons into crystals. Spyro has to save them and defeat Gnorc. In the sequels, Spyro has to deal with other villains, such as Ripto the warlock, who tries to conquer the world, or Sorceress, who steals the dragons&#39; eggs.</p> <h3>Gameplay</h3> <p>The player controls Spyro in a 3D environment from the third person view. Spyro can breathe fire to defeat his enemies. The dragon cannot actually fly, but he can glide long distances. A dragonfly companion named Sparx follows Spyro, helping him to pick up treasures and keep track of his health. To restore his health, Spyro can eat butterflies. The third game, Year of the Dragon, introduces other playable characters that can be unlocked by completing levels.</p>', '4.13', '2018-11-13', 'https://media.rawg.io/media/games/a50/a505bccdcfdc79970a93574c747f6e0d.jpg', 'True', 'True', 'True', 'True', '100', '413.0', 'Action', 'Activision', '58133', '0'),
                    ('LittleBigPlanet 3', '<p>LittleBigPlanet 3 is a side-scrolling platformer with a heavy focus on environmental puzzles. It’s the final part of the LittleBigPlanet trilogy, where you, like in the previous installments, play as Sackboy, a knitted creature that can be customized with different costumes. There are three more characters additionally to him, and each of them has unique abilities that help to solve puzzles.<br /> In LittleBigPlanet 3 Sackboy is sent to another world called Bunkum where he needs to find three heroes and destroy the plans of Newton, the antagonist. To do so, he explores colorful levels, interacting with NPCs and solving puzzles. The game provides a huge variety of activities such as swimming, jumping, fighting enemies and interacting with the environment. There are also various collectibles in the game.  <br /> LittleBigPlanet 3 pays great attention to its sandbox aspect, allowing the players to create their own levels, weapons, characters, and items. You can also share the things you created.</p>', '3.5', '2014-11-18', 'https://media.rawg.io/media/games/8e3/8e399167fd529da5e9e505e987ae63ff.jpg', 'False', 'True', 'False', 'False', '100', '350.0', 'Adventure', 'Sumo Digital', '3501', '0'),
                    ('Psychonauts 2', '<p>Razputin Aquato, trained acrobat and powerful young psychic, has realized his life long dream of joining the international psychic espionage organization known as the Psychonauts! But these psychic super spies are in trouble. Their leader hasn&#39;t been the same since he was kidnapped, and what&#39;s worse, there&#39;s a mole hiding in headquarters. Raz must use his powers to stop the mole before they execute their secret plan--to bring the murderous psychic villain, Maligula, back from the dead!</p>', '4.37', '2021-08-24', 'https://media.rawg.io/media/games/c3c/c3c536cc4d32623ba928020dfd39a648.jpg', 'True', 'True', 'False', 'True', '100', '437.0', 'Action', 'Double Fine Productions', '257192', '0');
                    """
                    )
                return result