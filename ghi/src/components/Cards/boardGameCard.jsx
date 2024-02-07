import React from 'react';
import { Link } from 'react-router-dom';
import './boardGameCard.css';
import parse from 'html-react-parser';

function BoardGameCard({ gameData }) {
  return (
    <div className='board-game-card'>
      <Link to={`/games/${gameData.id}`}>
        <img
          src={gameData.background_img}
          className='board-game-card-img'
          alt={`Card for ${gameData.name}`}
        />
        <div className='board-game-content-head'>
          <h2>{gameData.name.slice(0, 20)}</h2>
        </div>
        <div className='board-game-content-capsules'>
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
        <div className='board-game-content-body'>
          <p>{parse(gameData.description.slice(0, 150))}</p>
        </div>
        <div className='board-game-button'>
          <button>
            <b>Options</b>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default BoardGameCard;
