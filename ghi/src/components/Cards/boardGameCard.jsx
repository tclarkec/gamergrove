import {Link } from 'react-router-dom';
import './boardGameCard.css';
import parse from 'html-react-parser';

function BoardGameCard({ gameData, onGameRemoval }) {

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

       <br />
        <div className='board-game-content-body'>
          <div>{parse(gameData.description.slice(0, 150))}</div>
        </div>
      </Link>
        <div className='board-game-button'>
          <button onClick={() =>
            // User clicking 'Remove Game' button on the card of the game they wish to remove
            // from their board will trigger a call back to onGameRemoval
            ///in the parent component BoardPage and pass into it the library id
            //(instance of adding that game to a board) and account id
            // (pass the built-in backend check that a user is removing a game from
            // their own board and not another user's) associated with that game card
            {onGameRemoval(gameData.library_id, gameData.account_id)}}>
            <b>Remove Game</b>
          </button>
        </div>
    </div>
  );
}

export default BoardGameCard;
