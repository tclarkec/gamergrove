import { React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './wishlistCard.css';

async function fetchUserName() {
  const tokenUrl = `http://localhost:8000/token`;

  const fetchConfig = {
    credentials: 'include',
  };

  const response = await fetch(tokenUrl, fetchConfig);

  if (response.ok) {
    const data = await response.json();
    return data.account.id;
  }
}


function WishlistCard() {
  const [wishlistGames, setWishlistGames] = useState([]);
  const [lastGameRemoved, setLastGameRemoved] = useState(false);
  const [userLibrary, setUserLibrary] = useState([]);
  const [userWishlistGames, setUserWishlistGames] = useState([]);


  const fetchData = async (userId) => {
    try {
      const libraryUrl = `http://localhost:8000/api/users/libraries/${userId}`;
      const libraryConfig = {
        credentials: 'include',
      };

      const response = await fetch(libraryUrl, libraryConfig);

      if (response.ok) {
      const libraryData = await response.json();
      setUserLibrary(libraryData);

      const wishlistGameIds = libraryData
        .filter((item) => item.wishlist === true)
        .map((item) => item.game_id);

      const uniqueGameIds = Array.from(new Set(wishlistGameIds));

      const gameDetailsPromises = uniqueGameIds.map((gameId) =>
        fetch(`http://localhost:8000/api/games/${gameId}`).then((response) =>
          response.json()
        )
      );


      const wishlistGames = await Promise.all(gameDetailsPromises);

      setWishlistGames(wishlistGames);

      setUserWishlistGames(libraryData.map((entry) => entry.id));


      } else {
          setLastGameRemoved(true);

    }
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserName();
      await fetchData(userId);
    };

    fetchUserData();
  }, []);


  if(lastGameRemoved === true){
    return (
      <p style={{color:'white'}}> No games saved to your wishlist yet. </p>
    )
  }

  const filteredUserLibrary = userLibrary.filter((libraryData) =>
    userWishlistGames.includes(libraryData.id) && libraryData.wishlist === true
  );

  if (filteredUserLibrary.length === 0) {
    return (
      <p style={{color:'white'}}> No games saved to your wishlist yet. </p>
    )
  }


  const handleRemove = async (gameId, userId) => {
     try {
    const userId = await fetchUserName();
    const libraryUrl = `http://localhost:8000/api/users/libraries/${userId}`;
    const libraryConfig = {
      credentials: 'include',
    };

    const libraryResponse = await fetch(libraryUrl, libraryConfig);
    const libraryData = await libraryResponse.json();

    const filteredLibraryData = libraryData.filter((libraryEntry) =>
      libraryEntry.game_id === gameId && libraryEntry.wishlist === true
    );


    const url = `http://localhost:8000/api/libraries/${filteredLibraryData[0].id}/${userId}`;

    const fetchConfig = {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log('Game removed from wishlist!');
      fetchData(userId);

    } else {
      throw new Error('Failed to remove game from wishlist');
    }
  } catch (error) {
    console.error('Error removing game from wishlist:', error);
  }
};

return (
    <div>
      {wishlistGames.map((game, index) => (
        <div key={`${game.id}-${index}`} className="wishlistcard">
          <div className="wcard-content">
            <div className="wcard-details">
              <div className="wcard-item">
                <div className='wcontent-capsules'>
                      <img src="https://i.postimg.cc/nrDT7szB/image-5.png" width="25px" height="25px" alt="Icon 1" />
                    <img
                      src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
                      width="25px"
                      height="25px"
                      alt="Icon 2"
                    />
                    <img src="https://i.postimg.cc/R0qXLppc/image-3.png" width="25px" height="25px" alt="Icon 3" />
                    <img
                      src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
                      width="25px"
                      height="25px"
                      alt="Icon 4"
                    />
                    </div>
                <Link to={`/games/${game.id}`} className="wcard-item">
                  <p className='gamename'>{game.name}</p>

                </Link>
                <div className="wcard-photo" style={{ position: 'relative' }}>
                  <img src={game.background_img} alt={game.name} />

                  <div
                    className="remove-button-wrapper"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      margin: '10px',
                    }}
                  >

                      <button onClick={() => handleRemove(game.id, fetchUserName())}>
                        Remove
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishlistCard;
