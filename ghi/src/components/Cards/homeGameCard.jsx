import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './homeGameCard.css';

function HomeGameCard() {
  const [gameDataList, setGameDataList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/games');
      const data = await response.json();
      setGameDataList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (platform, rawg_pk) => {
    const storeUrl = await fetchStoreUrl(platform, rawg_pk);
    if (storeUrl) {
      window.location.href = storeUrl;
    }
  };

  const fetchStoreUrl = async (platform, rawg_pk) => {
    try {
      const response = await fetch(`http://localhost:8000/api/stores/${rawg_pk}?platform=${platform}`);
      const data = await response.json();
      return data[0]?.url;
    } catch (error) {
      console.error('Cant find the store you are looking for', error);
      return null;
    }
  };

  return (
    <div className='hgcard-container'>
      {gameDataList.map((gameData) => (
        <div key={gameData.id} className='hgcard'>
          <Link to={`/games/${gameData.id}`}>
            <img
              src={gameData.background_img}
              className="hgcard-img"
              alt={`Card for ${gameData.name}`}
            />
            <div className="hgcontent-head">
              <h2>{gameData.name.slice(0, 20)}</h2>
            </div>
          </Link>
          <div className="hgcontent-capsules">
            <img src="https://i.postimg.cc/nrDT7szB/image-5.png" width="15px" height="15px" alt="Icon 1" />
            <img
            src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
            width="15px"
            height="15px"
            alt="Icon 2"
          />
          <img src="https://i.postimg.cc/R0qXLppc/image-3.png" width="15px" height="15px" alt="Icon 3" />
          <img
            src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
            width="15px"
            height="15px"
            alt="Icon 4"
          />
          </div>
          <div className="hgcontent-body">
            <p>{gameData.description.slice(0, 200)}</p>
          </div>
          <div className="hgbutton">
            <button>
              <b>Options</b>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeGameCard;
