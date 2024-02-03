import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './gameDetails.css';
import ReviewCard from '../Cards/reviewCard.jsx';
import SideMenu from '../Home/Menu';
import Nav from '../../Nav';
import LargeUserReviewCard from '../Cards/largeUserReviewCard';
import ScreenshotsCard from '../Cards/screenshotsCard';
import StarRating from '../../StarRating';



function GameDetails() {
  const { id } = useParams();

  const initialData = {
    title:"",
    body:"",
    game_id: id,
    rating: ""
  }

  const [gameData, setGameData] = useState(null);

  const [formData, setFormData] = useState(initialData);

  const[submittedReview, setSubmittedReview] = useState(false);

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


   const getRecommendation = (rating) => {
    if (rating >= 4.3) {
      return "Highly Recommended";
    } else if (rating >= 3.7) {
      return "Recommended";
    } else if (rating >= 2.5) {
      return "Okay";
    } else {
      return "Not Recommended";
    }
  };

  const handleFormChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}
  const handleStarClick = (selectedRating) => {
    setFormData({
      ...formData,
      rating: selectedRating,
    });
  };

const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewUrl = 'http://localhost:8000/api/reviews'

    const fetchConfig = {
        method: "post",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(reviewUrl, fetchConfig);
    if (response.ok) {
        // navigate("/reviews");
        setFormData(initialData);
        setSubmittedReview(true);
    } else {
        throw new Error('Failed to create review')
    }
  }

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (submittedReview) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
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
          <h3 className='gamesh1'>Games/Popular/{gameData.name}</h3><p className='recommendation'>{getRecommendation(gameData.rating)}</p>
          <h5 className='gamesh2'>Buy Here</h5>
          <hr className='gamessolid' />
          <button className='GDButton' style={{color:'black', width: 'fit-content'}}>Add to Wishlist</button>
          <button className='GDButton' style={{color:'black', width: 'fit-content'}}>Add to Board</button>
          <button className='GDButton' style={{color:'black', width: 'fit-content'}} disabled>{gameData.rating_count} ratings</button>
          <button className='GDButton' style={{color:'black', width: 'fit-content'}} disabled>Ovr. Rating: {"⭐".repeat(gameData.rating.toFixed(1))} {(gameData.rating.toFixed(1))}</button>
          <button className='GDButton' style={{color:'black', width: 'fit-content'}} disabled>Released: {gameData.dates}</button>
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

              <div className='screenshotsHero'>
                <ScreenshotsCard rawgPk={gameData.rawg_pk} />
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '20px' }}>Write a Review</h1>
          <form onSubmit={handleSubmit} id="create-review">
          <div className='rcontainer-title'>
            <input onChange={handleFormChange} placeholder='Review Title...' required type='text' name='title' id='title' className='form-control' value={formData.title} />
          </div>
          <div className='rcontainer'>
            <input onChange={handleFormChange} placeholder='Write a review...' required type='text' name='body' id='body' className='form-control' value={formData.body} />
          </div>
      <div className='rcontainer'>
        <div className='white-container'>
          <label htmlFor='rating' style={{marginBottom: '0rem'}} >Give a rating out of 5:</label>
          <div className='rating-container'>
            <div className='star-rating'>
              <StarRating rating={formData.rating} onStarClick={handleStarClick} />
            </div>
          </div>
        </div>
        <button style={{marginTop: '20px'}}>Submit</button>
      </div>
      </form>
          <br />
          <br />
          <br />
          <br />
      <div className='rcontainer' style={{marginTop: '10px'}}>
        <div className={messageClasses} id="success-message">
            Your review has been submitted!
        </div>
      </div>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline', marginTop: '5px' }}>Reviews</h1>
          <div className='moveright' >
            <LargeUserReviewCard gameId={gameData.id} />
          </div>

        </div>
        <br />
      </div>
    </div>
  );
}

export default GameDetails;
