import React, { useState, useEffect } from 'react';
import './userReviewCard.css';

function LargeUserReviewCard({ gameId }) {
  const [userReviews, setUserReviews] = useState([]);

  const fetchReviewsForGame = async (gameId) => {
    const reviewsUrl = `http://localhost:8000/api/reviews/games/${gameId}`;

    try {
      const response = await fetch(reviewsUrl);
      const reviewsData = await response.json();

      setUserReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
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
            <div className="urcard-edit-delete">edit | delete</div>
            <div className="urline"></div>
            <div className="urcard-content">
              <div className="urcard-photo">
                <img
                  src="https://www.shareicon.net/data/512x512/2016/08/18/809170_user_512x512.png"
                  alt="User"
                />
              </div>
              <div className="urcard-details" style={{ color: 'black' }}>
                <p>{review.body}</p>
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
