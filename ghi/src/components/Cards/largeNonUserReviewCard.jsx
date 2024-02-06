import React, { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom';
import './userReviewCard.css';
import StarRating from '../../StarRating';


function LargeNonUserReviewCard({ gameId }) {
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchReviewsForGame = async (gameId) => {
    const reviewsUrl = `http://localhost:8000/api/reviews/games/${gameId}`;

    try {
      const response = await fetch(reviewsUrl);

      if (response.status === 404) {
        console.warn(`No reviews found for game with ID ${gameId}`);
        setUserReviews([]);
      } else {
        const reviewsData = await response.json();
        setUserReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchReviewsForGame(gameId);
  }, [gameId]);


  return (
    <div>
      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        userReviews.map((review) => (
          <div key={review.id} className="urcard">
            <div className="urcard-title">{review.title}</div>
            <div className="urcard-date">9/3/2023</div>
            <div>
                  <button
                    className="urcard-edit"
                    style={{ color: 'black' }}
                    onClick={() => {
                      navigate('/games/nonuser')
                    }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    className="urcard-delete"
                    style={{ color: 'black' }}
                    onClick={() => {
                      navigate('/games/nonuser')
                    }}
                  >
                    Delete
                  </button>{' '}


            </div>
            <div className="urline"></div>
            <div style={{color: 'white'}} className="urcard-content">
              <div className="urcontainer-title">
                <p>Title: {review.title}</p>
              </div>
              <div className="urcontainer">
                <p>Review: {review.body}</p>
              </div>
              <div className="urcontainer">
                  <p>Rating: {review.rating}</p>
                  <div className="rating-container">
                    <div className="star-rating">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
              </div>
            </div>
            <div>
              <button onClick = {() => {
                navigate('/games/nonuser')
              }}
              style = {{ backgroundColor: 'transparent'}}
              >
              <img
                className="thumbs-up"
                src="https://i.postimg.cc/dV4GtWb9/Thumbs-Up-White.png"
                alt="Thumbs Up"
              />
              <p className="urp" style={{ color: 'white', margin: '0', fontWeight: 'bold', textAlign: 'center' }}>{review.upvote_count}</p>
              </button>
              <button onClick = {() => {
                navigate('/games/nonuser')
              }}
              style = {{ backgroundColor: 'transparent'}}
              >
              <img
                className="thumbs-down"
                src="https://i.postimg.cc/fyNVvm4L/Thumbsdown-White.png"
                alt="Thumbs Down"
              />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', marginRight: '250px' }}>
          No reviews available for this game.
        </p>
      )}
    </div>
  );
}

export default LargeNonUserReviewCard;
