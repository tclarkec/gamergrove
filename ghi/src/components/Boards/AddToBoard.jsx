import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../../components/Cards/boardCard.css';
import { Link } from 'react-router-dom';

async function fetchUserName() {
  const tokenUrl = `${process.env.VITE_API_HOST}/token`;
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
  const gamesUrl = `${process.env.VITE_API_HOST}/api/users/libraries/${boardId}`;
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
  const gameUrl = `${process.env.VITE_API_HOST}/api/games/${gameId}`;
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



function AddToBoard() {
  const [boardDataList, setBoardDataList] = useState([]);
  const [userSavedBoards, setUserSavedBoards] = useState([]);
  const { id } = useParams();

  const fetchData = async (userId) => {
    const boardUrl = `${process.env.VITE_API_HOST}/api/boards/users/${userId}`;
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

    const updatedBoardDataList = await Promise.all(
      gamesData.map(async (game) => {
        const gameDetails = await fetchGameDetails(game.game_id);
        return gameDetails
          ? {
              ...game,
              background_img: gameDetails.background_img,
            }
          : game;
      })
    );

    setBoardDataList((prevBoardDataList) =>
      prevBoardDataList.map((boardData) =>
        boardData.id === boardId
          ? { ...boardData, games: updatedBoardDataList }
          : boardData
      )
    );
  };


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


  useEffect(() => {

    fetchBoardData();
  }, [fetchBoardData]);

  async function fetchLibraryData(userId, gameId, boardId) {
    try {
    const libraryUrl = `${process.env.VITE_API_HOST}/api/users/libraries/${userId}`;

    const fetchConfig = {
        credentials: 'include'
    };

    const response = await fetch(libraryUrl, fetchConfig);
    const data = await response.json();

    let addBoardData = {}

    if (response.ok && data[data.length-1]["wishlist"] === true) {
        addBoardData = {
            wishlist: true,
            game_id: gameId,
            board_id: boardId
        }
    } else {
        addBoardData = {
            wishlist: false,
            game_id: gameId,
            board_id: boardId
        }
    }

    return addBoardData

    } catch (error) {
    console.error('Error fetching library data', error);
    }

}


const handleBoardClick = async (gameId, boardId) => {
  try {
    const userId = await fetchUserName(); // Fetch userId here
    const libraryData = await fetchLibraryData(userId, gameId, boardId); // Pass userId as an argument

    const libraryUrl = `${process.env.VITE_API_HOST}/api/libraries`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(libraryData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(libraryUrl, fetchConfig);

    if (!response.ok) {
      console.error('Failed to add to board. Server response:', response);
      throw new Error('Failed to add to board');
    }
  } catch (error) {
    console.error('Error adding to board:', error);
  }
};

  const filteredBoardDataList = boardDataList.filter((boardData) =>
    userSavedBoards.includes(boardData.id)
  );

  if (filteredBoardDataList.length === 0) {
    return <p>No boards available.</p>;
  }

  return (
    <div className='bcard-container'>
      {filteredBoardDataList.map((boardData) => (
        <div key={boardData.id} className='card' style={{ width: '20rem' }}>
          <img src={boardData.cover_photo} className='card-img-top' alt={`Board Cover for ${boardData.board_name}`} style={{ borderRadius: '20px 20px 0 0 ' }} />
          <div className='card-body'>
          <Link to={`/games/${id}`} className='board-link' onClick={() => {
            handleBoardClick(gameId, boardId);
          }}>
            <h5 className='card-title1'>{boardData.board_name}</h5>
          </Link>
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

export default AddToBoard;
