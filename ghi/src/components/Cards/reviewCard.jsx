import React, { useState, useEffect } from 'react';
import './reviewCard.css';
import { Link } from 'react-router-dom';

async function fetchAccountId() {
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

function ReviewCard() {
  const [userReviews, setUserReviews] = useState([]);
  const [gameDetailsList, setGameDetailsList] = useState([]);

  const fetchUserReviews = async (accountId) => {
    const reviewsUrl = `http://localhost:8000/api/reviews/users/${accountId}`;

    try {
      const response = await fetch(reviewsUrl, { credentials: 'include' });
      const reviewsData = await response.json();

      setUserReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  const fetchGameDetails = async (gameId) => {
    try {
      // Make an API call to get game details based on gameId
      const response = await fetch(`http://localhost:8000/api/games/${gameId}`);
      if (response.ok) {
        const gameData = await response.json();
        return gameData;
      } else {
        console.error('Error fetching game details:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching game details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const accountId = await fetchAccountId();
      fetchUserReviews(accountId);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchGameDetailsForReviews = async () => {
      const gameDetailsPromises = userReviews.map(async (review) => {
        if (review.game_id) {
          return await fetchGameDetails(review.game_id);
        } else {
          return null;
        }
      });

      const fetchedGameDetailsList = await Promise.all(gameDetailsPromises);
      setGameDetailsList(fetchedGameDetailsList);
    };

    // Trigger the second API call once userReviews are fetched
    if (userReviews.length > 0) {
      fetchGameDetailsForReviews();
    }
  }, [userReviews]);


  const handleLinkClick = (e) => {
    console.log('Link clicked');
    e.stopPropagation();
  };

return (
<div>
  {gameDetailsList.map((gameDetails) => (
    <div key={gameDetails.id} className="rcard">
      <div className="card-content">
        <div className="card-photo">
          <img src={gameDetails?.background_img} alt="Card Photo" />
        </div>
        <div className="card-details">
          <Link to={`/games/${gameDetails.id}`} onClick={handleLinkClick}>
            <div className="card-title">{gameDetails?.name}</div>
          </Link>
          <hr className="rsolid" />
          <div className="side-by-side">
            <div className="link-container">
              {/* Additional content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

);
}

export default ReviewCard;
