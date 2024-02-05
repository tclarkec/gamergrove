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

  const fetchData = async (userId) => {
    try {
      const libraryUrl = `http://localhost:8000/api/users/libraries/${userId}`;
      const libraryConfig = {
        credentials: 'include',
      };

      const response = await fetch(libraryUrl, libraryConfig);
      const libraryData = await response.json();

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

return (
  <div>
    {wishlistGames.map((game, index) => (
      <div key={`${game.id}-${index}`} className="wishlistcard">
        <div className="wcard-content">
          <div className="wcard-details">
            <div className="wcard-item">
              <Link to={`/games/${game.id}`} className="wcard-item">
              <p className='gamename'>{game.name}</p>
              </Link>
              <div className="wcard-photo">
                <img src={game.background_img} alt={game.name} />
              </div>
              {/* Add your other content here */}
            </div>
          </div>
        </div>

      </div>
    ))}

  </div>
);




}

export default WishlistCard;
