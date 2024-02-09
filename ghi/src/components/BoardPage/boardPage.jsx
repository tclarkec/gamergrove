import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import './boardPage.css';
import '../Cards/boardGameCard.css'
import SideMenu from '../Home/Menu';
import Nav from '../../Nav';
import BoardGameCard from '../Cards/boardGameCard';



async function fetchBoardDetails(boardId) {
  const boardUrl = `http://localhost:8000/api/boards/${boardId}`;
  const boardConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(boardUrl, boardConfig);
    const boardData = await response.json();
    return boardData;
  } catch (error) {
    console.error(`Error fetching board details for board ID ${boardId}:`, error);
    return null;
  }
}

async function fetchGamesForBoard(accountId, boardId) {
  const libraryUrl = `http://localhost:8000/api/users/libraries/${accountId}`;
  const libraryConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(libraryUrl, libraryConfig);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const libraryData = await response.json();

    return Array.isArray(libraryData) ? libraryData : [];
  } catch (error) {
    console.error('Error fetching games data:', error);
    return [];
  }
}

async function fetchGameDetails(gameId) {
  const gameUrl = `http://localhost:8000/api/games/${gameId}`;
  const gameConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(gameUrl, gameConfig);
    const gameData = await response.json();
    return gameData;
  } catch (error) {
    console.error(`Error fetching game details for game ID ${gameId}:`, error);
    return null;
  }
}

async function fetchUserName() {
  const tokenUrl = `http://localhost:8000/token`;
  const fetchConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(tokenUrl, fetchConfig);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.account.id;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

function BoardPage() {
  const { id: boardId } = useParams();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState(null);
  const [gamesData, setGamesData] = useState([]);

  const fetchData = async () => {
    try {
      const boardDetails = await fetchBoardDetails(boardId);
      setBoardData(boardDetails);

      const accountId = await fetchUserName();

      const libraryData = await fetchGamesForBoard(accountId, boardId);


      if (!Array.isArray(libraryData)) {
        console.error('Invalid library data received:', libraryData);
        return;
      }
      const gamesForBoard = libraryData
        .filter((item) => item.board_id === parseInt(boardId, 10))
        .map((item) => item.game_id);
        const gameDetailsPromises = gamesForBoard.map((gameId) => fetchGameDetails(gameId));
      const gamesForBoardDetails = await Promise.all(gameDetailsPromises);
      for (const game of gamesForBoardDetails){
        for (const entry of libraryData){
          if (entry.game_id == game.id){
            game.library_id = entry.id
            game.account_id = entry.account_id
        }
      }
    }

      setGamesData(gamesForBoardDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  useEffect(() => {
    fetchData();
  }, [boardId]);

  const handleGameRemoval = async (id, account_id,) => {
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


      if (response.ok) {
        
        fetchData();
        }

    } catch (error) {
      console.error("Error deleting game:", error);
    }

  };

  if (!boardData || !gamesData) {
    return null;
  }

  return (
    <div>
       <Nav />
    <SideMenu />
  <div className="board-page-container">


    <div className="cover-photo-container">
      <img
        src={boardData.cover_photo}
        alt="Cover Photo"
        className="cover-photo"
      />
    </div>

    <div className="content-container">
      <br />
      <h1 className='BoardPageTitle'><span>{boardData.board_name}</span></h1>
      <hr className='boardpagehr' />
      <h1 className='BoardPageDescription'><span>{boardData.description}</span></h1>

      <div className='board-game-card-container'>
        {gamesData.map((gameData) => (
          <BoardGameCard
          key={gameData.id}
          gameData={gameData}
          onGameRemoval={(libraryId, accountId) =>
          handleGameRemoval(libraryId, accountId)
        }
          />
        ))}
      </div>
      <br />
      <Link to={`/boards/update/${boardId}`} className='updateboard'>
        <span>Update Board</span>
      </Link>
      <br />
      <br />
       <Link to={`/boards/delete/${boardId}`} className='deleteboard'>
          <span>Delete Board</span>
        </Link>
        <br />
      <br />
    </div>
          </div>
  </div>
);

}

export default BoardPage;
