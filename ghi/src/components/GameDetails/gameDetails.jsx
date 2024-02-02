import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './gameDetails.css';
import ReviewCard from '../Cards/reviewCard.jsx';
import SideMenu from '../Home/Menu';
import Nav from '../../Nav';
import LargeUserReviewCard from '../Cards/largeUserReviewCard';
import ScreenshotsCard from '../Cards/screenshotsCard';

function GameDetails() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/games/${id}`);
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!gameData) {

    return null;
  }

  return (
    <div>
      <SideMenu />
      <Nav />

      <div className='gamescard-img2'>

        <img
            src={gameData.background_img}
            alt="Background"
            className="background-image"
          />
        <div>
          <br />
          <br />
          <br />
          <br />
          <h3 className='gamesh1'>Games/Popular/{gameData.name}</h3>
          <h5 className='gamesh2'>Buy Here</h5>
          <hr className='gamessolid' />
          <button className='GDButton'>Add to Wishlist</button>
          <button className='GDButton'>Add to Board</button>
          <button className='GDButton'>⭐⭐⭐⭐⭐</button>
          <button className='GDButton'>{gameData.rating} </button>
          <button className='GDButton'>{gameData.dates}</button>
          <img
            className='GDIcon1'
            src="https://i.postimg.cc/nrDT7szB/image-5.png"
            width="35px"
            height="35px"
            alt="Icon 1"
          />
          <img
            className='GDIcon'
            src="https://i.postimg.cc/nrDT7szB/image-5.png"
            width="35px"
            height="35px"
            alt="Icon 1"
          />
          <img
            className='GDIcon'
            src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
            width="35px"
            height="35px"
            alt="Icon 2"
          />
          <img
            className='GDIcon'
            src="https://i.postimg.cc/R0qXLppc/image-3.png"
            width="35px"
            height="35px"
            alt="Icon 3"
          />
          <img
            className='GDIcon'
            src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
            width="35px"
            height="35px"
            alt="Icon 4"
          />

          <br />
          <div className="flex-container">
            <div className="flex-item">


              <br />
              <br />
              <p className='text-title'>About Game:</p>
              <p className='text'> {gameData.description} </p>
              <br />
              <p className='text-genres-dev'>Genres:</p>
              <p className='text-title1'>{gameData.genre}</p>
              <br />
              <p className='text-genres-dev'>Developers:</p>
              <p className='text-title1'>{gameData.developers}</p>
            </div>
            <div className="flex-item">
              {/* empty at the moment :/ */}
            </div>
            <div className="flex-item">
              <h1 className="gameTitle">{gameData.name}</h1>
              <img
                className="divider"
                src="https://i.postimg.cc/6pP3GtxW/image-11.png"
                alt="Divider"
              />
              <div className='screenshotsHero'><ScreenshotsCard /></div>
            </div>
          </div>
          <br/>
          <br/>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline' }}>Write a Review</h1>
        <div className='rcontainer-title'>
          <input placeholder='Review Title...' type='text' />
        </div>

        <div className='rcontainer'>
          <input placeholder='Write a review...' type='text' />
        </div>
        <br />
        <br />

        <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline' }}>Reviews</h1>
        <div className='moveright'><LargeUserReviewCard /></div>
        <div className='moveright'><LargeUserReviewCard /></div>
        <div className='moveright'><LargeUserReviewCard /></div>
        </div>

        <br />

      </div>
    </div>
  );
}

export default GameDetails;
