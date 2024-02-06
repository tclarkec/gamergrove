import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './gameCard.css';

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

function GameCard() {
  const [gameDataList, setGameDataList] = useState([]);
  const [userSavedGames, setUserSavedGames] = useState([]);

  const fetchData = async (userId) => {
    const libraryUrl = `http://localhost:8000/api/users/libraries/${userId}`;
    const libraryConfig = {
      credentials: 'include',
    };

    try {
      const response = await fetch(libraryUrl, libraryConfig);
      const libraryData = await response.json();
      setUserSavedGames(libraryData.map((item) => item.game_id));

      const gameDetailsPromises = libraryData.map((item) =>
        fetch(`http://localhost:8000/api/games/${item.game_id}`).then((response) =>
          response.json()
        )
      );

      const gameDetails = await Promise.all(gameDetailsPromises);
      setGameDataList(gameDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserName();
      fetchData(userId);
    };

    fetchUserData();
  }, []);

  const filteredGameDataList = gameDataList.filter((gameData) =>
    userSavedGames.includes(gameData.id)
  );

  if (filteredGameDataList.length === 0) {
    return (
      <>
      <p style={{color:'white'}}>No games added to a board or your wishlist.</p>
      </>
    )
  }

  return (
    <div className='gcard-container'>
      {filteredGameDataList.map((gameData) => (
        <div key={gameData.id} className='gcard'>
          <Link to={`/games/${gameData.id}`}>
          <img
            src={gameData.background_img}
            className='gcard-img'
            alt={`Card for ${gameData.name}`}
          />
          <div className='gcontent-head'>
            <h2>{gameData.name.slice(0, 20)}</h2>
          </div>
          </Link>
          <div className='gcontent-capsules'>
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
          <div className='gcontent-body'>
            <p dangerouslySetInnerHTML={{ __html: gameData.description.slice(0, 200) }} />
            {/* Currently not working to get the ptag to be removed from our frontend home page Maybe its an
            OS issue or maybe have to go into migrations to remove the p tags manually. So far no dice*/}
          </div>
          <div className='gbutton'>
            <button>
              <b>Options</b>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameCard;
