import logo from '../../assets/logo.gif';
import Menu from '../Home/Menu.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from '../../Nav.jsx';
import SideMenu from '../Home/Menu.jsx';
import parse from 'html-react-parser';
import './SearchResults.css';


const SearchResults = () => {
    const location = useLocation();
    const rawg_pks = location.state
    const [searchGames, setSearchGames] = useState([]);



    const fetchData = async () => {
        try {
        const games = []
        const response = await fetch('http://localhost:8000/api/games');
        const data = await response.json();
        for (const d of data) {
            if (rawg_pks.includes(d.rawg_pk)) {
                games.push(d)
            }
        }
        setSearchGames(games)
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


  return (
    <div>
      <Nav />
    <div className='searchbody'>
        
        <SideMenu />
        <div className='hgcard-container'>
        {searchGames.map((gameData) => (
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
    </div>
    </div>
  );
}

export default SearchResults;
