import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './boardGameCard.css';
import parse from 'html-react-parser';

function BoardGameCard({ gameData, onGameRemoval }) {
  console.log(gameData)
  const navigate = useNavigate ();

  const handleDelete = async (id, account_id) => {
    try {
      const libUrl = `http://localhost:8000/api/libraries/${id}`
      const libResponse = await fetch(libUrl);
      const libData = await libResponse.json();
      const boardID = libData.board_id
     const url = `http://localhost:8000/api/libraries/${id}/${account_id}`
     const fetchConfig = {

       method: "DELETE",
       credentials: 'include',
       headers: {
         'Content-Type': 'application/json',

        }
        };
      const response = await fetch (url, fetchConfig)
      const answer = await response.json()
      console.log(answer)

      if (response.ok) {

        return 'Game removed!'

        }



    } catch (error) {
      console.error("Error deleting game:", error);
    }

  };


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
      </Link>
        <div className='board-game-button'>
          <button onClick={() =>
            {onGameRemoval(gameData.library_id, gameData.account_id)}}>
            <b>Remove Game</b>
          </button>
        </div>
    </div>
  );
}

export default BoardGameCard;
