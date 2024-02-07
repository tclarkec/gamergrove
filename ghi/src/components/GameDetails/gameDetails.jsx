import {useAuthContext} from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './gameDetails.css';
import ReviewCard from '../Cards/reviewCard.jsx';
import SideMenu from '../Home/Menu';
import Nav from '../../Nav';
import LargeUserReviewCard from '../Cards/largeUserReviewCard';
import LargeNonUserReviewCard from '../Cards/largeNonUserReviewCard';
import ScreenshotsCard from '../Cards/screenshotsCard';
import StarRating from '../../StarRating';
import parse from 'html-react-parser';
import { useLocation } from "react-router-dom";

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const fetchUserName = async () => {
  const tokenUrl = `http://localhost:8000/token`;

  const fetchConfig = {
    credentials: 'include',
  };

  const response = await fetch(tokenUrl, fetchConfig);

  if (response.ok) {
    const data = await response.json();
    return data.account.username;
  }
};

const saved_username = await fetchUserName();

const fetchAccount = async () => {
  const accountUrl = `http://localhost:8000/api/accounts/${saved_username}`;

  const response = await fetch(accountUrl);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const account_data = await fetchAccount();


function GameDetails() {

  const location = useLocation();
  const place = location.state
  console.log(place)
  const lastHash = useRef('');
  useEffect(() => {
    if (place) {
      lastHash.current = place.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        lastHash.current = '';
      }, 100);
    }
  }, [place]);



  const { token } = useAuthContext();

  const navigate = useNavigate();

  const { id } = useParams();

  const wishListData = {
    wishlist: true,
    game_id: id
  }

  const removeWishListData = {
    wishlist: false,
    game_id: id
  }


  const initialReviewData = {
    title:"",
    body:"",
    game_id: id,
    rating: ""
  }



  const [gameData, setGameData] = useState(null);

  const [wishListText, setWishListText] = useState('Add to Wishlist')

  const [reviewFormData, setReviewFormData] = useState(initialReviewData);

  const[submittedReview, setSubmittedReview] = useState(false);
  const [boards, setBoards] = useState([]);
  const fetchBoards = async () => {
    const boardUrl = `http://localhost:8000/api/boards/users/${account_data.id}`
    const fetchConfig = {
      credentials: 'include'
    };
    try {
      const boardResponse = await fetch(boardUrl, fetchConfig)
      if (boardResponse.ok) {
        const boardData = await boardResponse.json()
        console.log(boardData)
        setBoards(boardData)
      }
    } catch(error) {
      console.log("Error fetching boards:", error)
    }



  }

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/games/${id}`);
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    };

    const fetchLibraryData = async() => {
      try {
        const libraryUrl = `http://localhost:8000/api/users/libraries/${account_data.id}`;

        const fetchConfig = {
          credentials: 'include'
        };

        const response = await fetch(libraryUrl, fetchConfig);
        const data = await response.json();
        if (response.ok && data[data.length-1]["wishlist"] === true) {
          setWishListText('Added to Wishlist!');
        }

      } catch (error) {
        console.error('Error fetching library data', error);
      }

    };
    fetchGamesData();
    if (token) {
    fetchLibraryData();
    }
    fetchBoards();
  }, [, token]);


  if (!gameData) {
    return null;
  }


   const getRecommendation = (rating) => {
    if (rating >= 4.3) {
      return "Highly Recommended 🔥🏆 ";
    } else if (rating >= 3.7) {
      return "Recommended 💣";
    } else if (rating >= 2.5) {
      return "Okay 🕯️";
    } else {
      return "Not Recommended 🛑";
    }
  };

  const handleFormChange = (e) => {
    setReviewFormData({
        ...reviewFormData,
        [e.target.name]:e.target.value
    })
}
  const handleStarClick = (selectedRating) => {
    setReviewFormData({
      ...reviewFormData,
      rating: selectedRating,
    });
  };

const handleWishListClick = async () => {
  if (wishListText === 'Add to Wishlist') {
    const addEntryUrl = 'http://localhost:8000/api/libraries';

    const addEntryFetchConfig = {
      method: "post",
      body: JSON.stringify(wishListData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const addEntryResponse = await fetch(addEntryUrl, addEntryFetchConfig);
      if (addEntryResponse.ok) {
        setWishListText('Added to Wishlist!');
        console.log('Nice!');
      } else {
        console.error('Failed to add to wishlist. Server response:', response);
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }

  };
}

const handleBoardClick = async (event) => {
  const data = {};
  const libraryUrl = `http://localhost:8000/api/libraries`
  const board = event.target.value;
  data.wishlist = false;
  data.game_id = id;
  data.board_id = board;
  const fetchConfig = {
    method: 'post',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      "Content-type": "application/json"
    }
  }
  const response = await fetch(libraryUrl, fetchConfig);

  window.location.reload();
}

const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const reviewUrl = 'http://localhost:8000/api/reviews'

    const fetchConfig = {
        method: "post",
        body: JSON.stringify(reviewFormData),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(reviewUrl, fetchConfig);
    if (response.ok) {
        setReviewFormData(initialReviewData);
        setSubmittedReview(true);
    } else {
        throw new Error('Failed to create review')
    }
  }

  let messageReviewClasses = 'alert alert-success d-none mb-0';
  let formReviewClasses = '';
  if (submittedReview) {
    messageReviewClasses = 'alert alert-success mb-0';
    formReviewClasses = 'd-none';
  }

  const handleClick = async (platform, rawg_pk) => {
    const storeUrl = await fetchStoreUrl(platform, rawg_pk);
    if (storeUrl) {
      window.location.href = storeUrl;
    }
  };

  const fetchStoreUrl = async (platform, rawg_pk) => {
    try {

      const response = await fetch(`http://localhost:8000/api/stores/${rawg_pk}`);

      const data = await response.json();


      for (const link of data) {
        if (link.platform === platform) {
          return link.url
        }

      }




    } catch (error) {
      console.error('Cant find the store you are looking for', error);
      return null;
    }
  };


  if (token) {
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
          <button className='GDButton' style={{color:'black', width: 'fit-content'}} onClick={()=>{
            handleWishListClick();
          }}
          disabled = {wishListText === 'Added to Wishlist!' }
          >{wishListText}</button>
          <label >

            <select onChange={handleBoardClick} className='GDButton' style={{color:'black', width: 'fit-content'}}>
              <option value="">Add to Board</option>
              {boards.map(board => {
                return(
                  <option key={board.id} value={board.id}>{board.board_name}</option>
                )

              })}
            </select>
          </label>
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
          {gameData.xbox && (
          <img
            className='GDIcon'
            src="https://i.postimg.cc/nrDT7szB/image-5.png"
            width="35px"
            height="35px"
            alt="Icon 1"
            onClick={() => handleClick('Xbox', gameData.rawg_pk)}
          />
          )}
          {gameData.playstation && (
          <img
            className='GDIcon'
            src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
            width="35px"
            height="35px"
            alt="Icon 2"
            onClick={() => handleClick('PlayStation', gameData.rawg_pk)}
          />
          )}
          {gameData.nintendo && (
          <img
            className='GDIcon'
            src="https://i.postimg.cc/R0qXLppc/image-3.png"
            width="35px"
            height="35px"
            alt="Icon 3"
            onClick={() => handleClick('Nintendo', gameData.rawg_pk)}
          />
          )}
          {gameData.pc && (
          <img
            className='GDIcon'
            src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
            width="35px"
            height="35px"
            alt="Icon 4"
            onClick={() => handleClick('PC', gameData.rawg_pk)}
          />
          )}

          <br />
          <div className="flex-container">
            <div className="flex-item">
              <br />
              <br />
              <p className='text-title'>About Game:</p>
              <p className='text'>{parse(gameData.description)}</p>
              <br />
              <p className='text-genres-dev'>Genres:</p>
              <p className='text-title1'>{gameData.genre}</p>
              <br />
              <p className='text-genres-dev'>Developers:</p>
              <p className='text-title1'>{gameData.developers}</p>

            </div>
            <div className="flex-item">


              <br />
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
              <div class="container">
                <p class="rec">Recommendation: {getRecommendation(gameData.rating)}</p>
              </div>
            </div>


          </div>
          <br/>
          <br/>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '20px' }}>Write a Review</h1>
          <form onSubmit={handleReviewSubmit} id="create-review">
          <div className='rcontainer-title'>
            <input onChange={handleFormChange} placeholder='Review Title...' required type='text' name='title' id='title' className='form-control' value={reviewFormData.title} />
          </div>
          <div className='rcontainer'>
            <input onChange={handleFormChange} placeholder='Write a review...' required type='text' name='body' id='body' className='form-control' value={reviewFormData.body} />
          </div>
      <div className='rcontainer'>
        <div className='white-container'>
          <label htmlFor='rating' style={{marginBottom: '0rem'}} >Give a rating out of 5:</label>
          <div className='rating-container'>
            <div className='star-rating'>
              <StarRating rating={reviewFormData.rating} onStarClick={handleStarClick} />
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
      <div className='rcontainer' id='review' style={{marginTop: '10px'}}>
        <div className={messageReviewClasses} id="success-message">
            Your review has been submitted!
        </div>
      </div>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline', marginTop: '5px' }}>Reviews</h1>
          <div className='moveright' >
            <LargeUserReviewCard gameId={gameData.id} accountId={account_data.id} />
          </div>

        </div>
        <br />
      </div>
    </div>
  );
}

  if (!token) {
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
          <button className='GDButton' style={{color:'black', width: 'fit-content'}} onClick={()=>{
            navigate(`/games/${gameData.id}/nonuser`);
          }}>{wishListText}</button>
          <button className='GDButton' style={{color:'black', width: 'fit-content'}} onClick={()=>{
            navigate(`/games/${gameData.id}/nonuser`);
          }}>Add to Board</button>
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
          {gameData.xbox && (
          <img
            className='GDIcon'
            src="https://i.postimg.cc/nrDT7szB/image-5.png"
            width="35px"
            height="35px"
            alt="Icon 1"
            onClick={() => handleClick('Xbox', gameData.rawg_pk)}
          />
          )}
          {gameData.playstation && (
          <img
            className='GDIcon'
            src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
            width="35px"
            height="35px"
            alt="Icon 2"
            onClick={() => handleClick('PlayStation', gameData.rawg_pk)}
          />
          )}
          {gameData.nintendo && (
          <img
            className='GDIcon'
            src="https://i.postimg.cc/R0qXLppc/image-3.png"
            width="35px"
            height="35px"
            alt="Icon 3"
            onClick={() => handleClick('Nintendo', gameData.rawg_pk)}
          />
          )}
          {gameData.pc && (
          <img
            className='GDIcon'
            src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
            width="35px"
            height="35px"
            alt="Icon 4"
            onClick={() => handleClick('PC', gameData.rawg_pk)}
          />
          )}

          <br />
          <div className="flex-container">
            <div className="flex-item">
              <br />
              <br />
              <p className='text-title'>About Game:</p>
              <p className='text'> {parse(gameData.description)} </p>
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
              <div class="container">
                <p class="rec">Recommendation: {getRecommendation(gameData.rating)}</p>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '20px' }}>Write a Review</h1>
          <div className='rcontainer-title'>
            <input onClick={() => {
              navigate(`/games/${gameData.id}/nonuser`)
            }} placeholder='Review Title...' required type='text' name='title' id='title'/>
          </div>
          <div className='rcontainer'>
            <input onClick={() => {
              navigate(`/games/${gameData.id}/nonuser`)
            }} placeholder='Write a review...' required type='text' name='body' id='body'/>
          </div>
      <div className='rcontainer'>
        <div className='white-container'>
          <label htmlFor='rating' style={{marginBottom: '0rem'}} >Give a rating out of 5:</label>
          <div className='rating-container'>
            <div className='star-rating'>
              <StarRating onStarClick={() => {
                navigate(`/games/${gameData.id}/nonuser`)
              }} />
            </div>
          </div>
        </div>
        <button style={{marginTop: '20px'}} onClick = {() => {
          navigate(`/games/${gameData.id}/nonuser`)
        }}>Submit</button>
      </div>
          <br />
          <br />
          <br />
          <br />
      <div style={{marginTop: '10px'}}>
      </div>
          <h1 className='gamesh1' style={{ textAlign: 'center', textDecoration: 'underline', marginTop: '5px' }}>Reviews</h1>
          <div className='moveright' >
            <LargeNonUserReviewCard gameId={gameData.id} />
          </div>

        </div>
        <br />
      </div>
    </div>
  );
  }
}

export default GameDetails;
