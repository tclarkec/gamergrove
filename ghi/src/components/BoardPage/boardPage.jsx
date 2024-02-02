import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    const libraryData = await response.json();

    return libraryData;
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
  const [boardData, setBoardData] = useState(null);
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardDetails = await fetchBoardDetails(boardId);
        setBoardData(boardDetails);

        const accountId = await fetchUserName();

        const libraryData = await fetchGamesForBoard(accountId, boardId);

        const gamesForBoard = libraryData
          .filter((item) => item.board_id === parseInt(boardId, 10))
          .map((item) => item.game_id);

        const gameDetailsPromises = gamesForBoard.map((gameId) => fetchGameDetails(gameId));
        const gamesForBoardDetails = await Promise.all(gameDetailsPromises);

        setGamesData(gamesForBoardDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [boardId]);

  if (!boardData || !gamesData) {
    return null;
  }

  return (
  <div className="board-page-container">
    <Nav />
    <SideMenu />

    <div className="cover-photo-container">
      <img
        src={boardData.cover_photo}
        alt="Cover Photo"
        className="cover-photo"
      />
    </div>

    <div className="content-container">
      <h1 className='BoardPageTitle'><span>{boardData.board_name}</span></h1>
      <hr className='boardpagehr' />
      <h1 className='BoardPageDescription'><span>{boardData.description}</span></h1>

      <div className='board-game-card-container'>
        {gamesData.map((gameData) => (
          <BoardGameCard key={gameData.id} gameData={gameData} />
        ))}
      </div>
    </div>
  </div>
);

}

export default BoardPage;
