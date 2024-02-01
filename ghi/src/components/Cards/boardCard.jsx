import React, { useState, useEffect } from 'react';
import './boardCard.css';

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

async function fetchGamesForBoard(boardId) {
  const gamesUrl = `http://localhost:8000/api/users/libraries/${boardId}`;
  const gamesConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(gamesUrl, gamesConfig);
    const gamesData = await response.json();

    // Filter games based on the current boardId
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
    const gameData = await response.json();
    return gameData;
  } catch (error) {
    console.error('Error fetching game details:', error);
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

      console.log('boardData:', boardData); // Log for debugging

      setUserSavedBoards(boardData.map((item) => item.id));
      setBoardDataList(boardData); // Just set the board data directly

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAndSetGamesData = async (boardId) => {
    const gamesData = await fetchGamesForBoard(boardId);

    // Update the boardDataList with the games information
    setBoardDataList((prevBoardDataList) =>
      prevBoardDataList.map((boardData) =>
        boardData.id === boardId
          ? { ...boardData, games: gamesData }
          : boardData
      )
    );

    // Fetch and update the game details for each game in the library sequentially
    for (const game of gamesData) {
      const gameDetails = await fetchGameDetails(game.game_id);
      if (gameDetails) {
        // Update the boardDataList with the game details
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
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserName();
      fetchData(userId);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Use fetchAndSetGamesData for each board in userSavedBoards
    userSavedBoards.forEach((boardId) => {
      fetchAndSetGamesData(boardId);
    });
  }, [userSavedBoards]);

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
  {boardData.games && boardData.games.slice(0, 3).map((game, index) => (
    <div key={index} className={`flex-container ${index === 0 ? 'left' : index === 1 ? 'right' : 'center'}`}>
      <div style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0px 10px 10px black', backgroundColor: game.background_img ? 'transparent' : 'black' }}>
        <img src={game.background_img} className='small-card-img-top' alt={`Game ${index + 2}`} />
      </div>
    </div>
  ))}
</div>


          </div>
        </div>
      ))}
    </div>
  );
}

export default BoardCard;
