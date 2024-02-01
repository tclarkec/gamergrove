
import React, { useState, useEffect, useCallback } from 'react';
import './boardCard.css';

async function fetchUserName() {
  const tokenUrl = `http://localhost:8000/token`;
  const fetchConfig = {
    credentials: 'include',
    redirect: 'follow',
  };

  const response = await fetch(tokenUrl, fetchConfig);

  if (response.ok) {
    const data = await response.json();
    return data.account.id;
  }
}

async function fetchGamesForBoard(boardId) {
  const gamesUrl = `http://localhost:8000/api/users/libraries/${boardId}`;
  const gamesConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(gamesUrl, gamesConfig);
    const gamesData = await response.json();

    const filteredGames = gamesData.filter(game => game.board_id === boardId);
    return filteredGames;
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

    if (response.ok) {
      const gameData = await response.json();
      return gameData;
    } else {
      console.error(`Error fetching game details for game ID ${gameId}: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching game details for game ID ${gameId}:`, error);
    return null;
  }
}

function BoardCard() {
  const [boardDataList, setBoardDataList] = useState([]);
  const [userSavedBoards, setUserSavedBoards] = useState([]);

  const fetchData = async (userId) => {
    const boardUrl = `http://localhost:8000/api/boards/users/${userId}`;
    const boardConfig = {
      credentials: 'include',
    };

    try {
      const response = await fetch(boardUrl, boardConfig);
      const boardData = await response.json();

      setUserSavedBoards(boardData.map((item) => item.id));
      setBoardDataList(boardData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAndSetGamesData = async (boardId) => {
    const gamesData = await fetchGamesForBoard(boardId);

    setBoardDataList((prevBoardDataList) =>
      prevBoardDataList.map((boardData) =>
        boardData.id === boardId
          ? { ...boardData, games: gamesData }
          : boardData
      )
    );

    for (const game of gamesData) {
      const gameDetails = await fetchGameDetails(game.game_id);
      if (gameDetails) {
        setBoardDataList((prevBoardDataList) =>
          prevBoardDataList.map((boardData) =>
            boardData.id === boardId
              ? {
                  ...boardData,
                  games: prevBoardDataList
                    .find((bd) => bd.id === boardId)
                    .games.map((g) =>
                      g.game_id === game.game_id
                        ? { ...g, background_img: gameDetails.background_img }
                        : g
                    ),
                }
              : boardData
          )
        );
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  // Memoize the fetchBoardData function
  const fetchBoardData = useCallback(async () => {
    for (const boardId of userSavedBoards) {
      await fetchAndSetGamesData(boardId);
    }
  }, [userSavedBoards]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserName();
      fetchData(userId);
    };

    fetchUserData();
  }, []);

  // Use the memoized function in the useEffect
  useEffect(() => {
    console.log("Fetching board data...");
    fetchBoardData();
  }, [fetchBoardData]);

  const filteredBoardDataList = boardDataList.filter((boardData) =>
    userSavedBoards.includes(boardData.id)
  );

  return (
    <div className='bcard-container'>
      {filteredBoardDataList.map((boardData) => (
        <div key={boardData.id} className='card' style={{ width: '20rem' }}>
          <img src={boardData.cover_photo} className='card-img-top' alt={`Board Cover for ${boardData.board_name}`} style={{ borderRadius: '20px' }} />
          <div className='card-body'>
            <h5 className='card-title1'>{boardData.board_name}</h5>
            <hr className='bsolid' />
            <p className='card-text1'>{`${boardData.game_count} Games`}</p>
            <div className={`flex-container ${boardData.alignment}`}>
              {boardData.games && Array.isArray(boardData.games) ? (
                boardData.games.slice(0, 3).map((game, index) => {
                  const key = `${game.game_id}-${boardData.id}-${index}`;

                  return (
                    <div key={key} className={`flex-container ${index === 0 ? 'left' : index === 1 ? 'right' : 'center'}`}>
                      <div style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0px 10px 10px black', backgroundColor: game.background_img ? 'transparent' : 'black' }}>
                        <img src={game.background_img} className='small-card-img-top' alt={`Game ${index + 2}`} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Loading games...</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoardCard;
