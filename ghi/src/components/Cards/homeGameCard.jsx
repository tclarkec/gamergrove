import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import './homeGameCard.css';
// Set the prop to games in the HomeCard to get that to populate properly, potentially(Originally empty)
function HomeGameCard( { games } ) {
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


  const handleClick = async (platform, rawg_pk) => {
    const storeUrl = await fetchStoreUrl(platform, rawg_pk);
    if (storeUrl) {
      window.location.href = storeUrl;
    }
  };

  const fetchStoreUrl = async (platform, rawg_pk) => {
    try {

      const response = await fetch(`http://localhost:8000/api/stores/${rawg_pk}`);

      const data = await response.json();


      for (const link of data) {
        if (link.platform === platform) {
          return link.url
        }

      }




    } catch (error) {
      console.error('Cant find the store you are looking for', error);
      return null;
    }
  };

<<<<<<< HEAD
  const game = games[0]
  // console.log(game)


  useEffect(() => {
    fetchData();
  }, []);
=======
>>>>>>> kyle-dev

// Used games as a prop to have as a callBack in Rows, but resulted in blank screen
// gameDataList in line 43 possibly change to games prop
  return (
    <div className='hgcard-container'>
      {games.map((gameData) => (
        <div key={gameData.id} className='hgcard'>
          <Link to={`/games/${gameData.id}`}>
            <img
              src={gameData.background_img}
              className="hgcard-img"
              alt={`Card for ${gameData.name}`}
            />
            <div className="hgcontent-head">
              <h2>
                {gameData.name.length > 20
                  ? `${gameData.name.slice(0, 20)}..`
                  : gameData.name
                }
              </h2>
            </div>
          </Link>
          <div className="hgcontent-capsules">
<<<<<<< HEAD
            {gameData.Xbox ?
              // <img
              //   src="https://i.postimg.cc/nrDT7szB/image-5.png"
              //   width="15px"
              //   height="15px"
              //   alt="Icon 1"
              //   onClick={() => handleClick('Xbox', gameData.rawg_pk)}
              //   />
                'Xbox' : '' }

            {/* {gameData.PlayStation && (
=======
            {gameData.xbox && (
              <img
                src="https://i.postimg.cc/nrDT7szB/image-5.png"
                width="15px"
                height="15px"
                alt="Icon 1"
                onClick={() => handleClick('Xbox', gameData.rawg_pk)}
              />
            )}

            {gameData.playstation && (
>>>>>>> kyle-dev
                <img
                src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
                width="15px"
                height="15px"
                alt="Icon 2"
                onClick={() => handleClick('PlayStation', gameData.rawg_pk)}
              />
<<<<<<< HEAD
              )}


            {gameData.Nintendo && (
=======
            )}


           {gameData.nintendo && (
>>>>>>> kyle-dev
              <img
                src="https://i.postimg.cc/R0qXLppc/image-3.png"
                width="15px"
                height="15px"
                alt="Icon 3"
                onClick={() => handleClick('Nintendo', gameData.rawg_pk)}
              />
            )}
<<<<<<< HEAD
             {gameData.PC && (
=======
            {gameData.pc && (
>>>>>>> kyle-dev
              <img
                src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
                width="15px"
                height="15px"
                alt="Icon 4"
                onClick={() => handleClick('PC', gameData.rawg_pk)}
              />
<<<<<<< HEAD
            )} */}
=======
            )}
>>>>>>> kyle-dev

          </div>
          <div className="hgcontent-body">
            <p>{parse(gameData.description.slice(0, 200))}</p>
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
