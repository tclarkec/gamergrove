import React, { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom';
import './userReviewCard.css';
import StarRating from '../../StarRating';

function LargeUserReviewCard({ gameId, accountId }) {
  const { token } = useAuthContext();
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
              {review.account_id === accountId && (
                <>
                  <button
                    className="urcard-edit-delete"
                    style={{ color: 'black' }}
                    onClick={() => {
                      navigate(`/reviews/update/${review.id}/${review.game_id}`)
                    }}
                  >
                    edit
                  </button>{' '}
                  | delete
                </>
              )}
            </div>
            <div className="urline"></div>
            <div className="urcard-content">
              <div className="urcontainer-title">
                <p>Title: {review.title}</p>
              </div>
              <div className="urcontainer">
                <p>Review: {review.body}</p>
              </div>
              <div className="urcontainer">
                <div className="white-container">
                  <p>Rating: {review.rating}</p>
                  <div className="rating-container">
                    <div className="star-rating">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                className="thumbs-up"
                src="https://i.postimg.cc/N0md97zp/thumbsup.png"
                alt="Thumbs Up"
              />
              <p className="urp">34</p>
              <img
                className="thumbs-down"
                src="https://i.postimg.cc/m2W27bkj/thumbsdown.png"
                alt="Thumbs Down"
              />
              <p className="urp2">13</p>
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

export default LargeUserReviewCard;
