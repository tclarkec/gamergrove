import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import './homeGameCard.css';
import { Menu, MenuItem, SubMenu } from "@spaceymonk/react-radial-menu";
// Set the prop to games in the HomeCard to get that to populate properly, potentially(Originally empty)
function HomeGameCard( {games} ) {
  const [gameDataList, setGameDataList] = useState([]);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleItemClick = (event, index, data) => {
    console.log(`[MenuItem] ${data} clicked`);
    setShow(false); // you should handle your menu visibility yourself
  };
  const handleSubMenuClick = (event, index, data) => {
    console.log(`[SubMenu] ${data} clicked`);
  };
  const handleDisplayClick = (event, position) => {
    console.log(`[Display] ${position} clicked`);
  };


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
                <img
                src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
                width="15px"
                height="15px"
                alt="Icon 2"
                onClick={() => handleClick('PlayStation', gameData.rawg_pk)}
              />
            )}


           {gameData.nintendo && (
              <img
                src="https://i.postimg.cc/R0qXLppc/image-3.png"
                width="15px"
                height="15px"
                alt="Icon 3"
                onClick={() => handleClick('Nintendo', gameData.rawg_pk)}
              />
            )}
            {gameData.pc && (
              <img
                src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
                width="15px"
                height="15px"
                alt="Icon 4"
                onClick={() => handleClick('PC', gameData.rawg_pk)}
              />
            )}

          </div>
          <div className="hgcontent-body">

            <div className='hgcontent-body'>
              {gameData.description.length > 165 && (
            <p>{parse(`${gameData.description.slice(0, 165)}..`)}</p>
          )}
            </div>



          </div>
          <div className="hgbutton">
            <button onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                  setPosition({ });
                  }}

                  >
              <b>Options</b>
            </button>
              <div

              >
                <Menu

                  centerX={position.x}
                  centerY={position.y}
                  innerRadius={38}
                  outerRadius={80}
                  show={show}
                  animation={["fade", "scale"]}
                  animationTimeout={150}
                >
                  {/* Populate your menu here */}
                  <MenuItem onItemClick={handleItemClick} data="Save to Board">
                    Review
                  </MenuItem>
                  <MenuItem onItemClick={handleItemClick} data="Save to Board">
                    Wish
                  </MenuItem>
                  <MenuItem onItemClick={handleItemClick} data="Save to Board">
                    Details
                  </MenuItem>
                  <SubMenu
                    onDisplayClick={handleDisplayClick}
                    onItemClick={handleSubMenuClick}
                    itemView="Add to Board"
                    data="2. Sub Menu"
                    displayPosition="bottom"
                  >
                    <MenuItem onItemClick={handleItemClick} data="2.1. Item">
                      Board 1
                    </MenuItem>
                    <MenuItem onItemClick={handleItemClick} data="2.2. Item">
                      Board 2
                    </MenuItem>
                    <MenuItem onItemClick={handleItemClick} data="2.3. Item">
                      Board 3
                    </MenuItem>

                  </SubMenu>
                </Menu>
              </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeGameCard;
