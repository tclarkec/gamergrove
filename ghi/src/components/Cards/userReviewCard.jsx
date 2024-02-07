import React, { useState, useEffect } from 'react';
import './userReviewCard.css';
import StarRating from '../../StarRating'; // Make sure to adjust the path based on your project structure
import {useNavigate} from 'react-router-dom';

async function fetchAccountId() {
  const tokenUrl = `http://localhost:8000/token`;

  const fetchConfig = {
    credentials: 'include',
  };

  try {
    const response = await fetch(tokenUrl, fetchConfig);

    if (response.ok) {
      const data = await response.json();
      return data.account.id;
    } else {
      console.error('Error fetching account ID:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching account ID:', error);
    return null;
  }
}

function UserReviewCard() {
  const navigate = useNavigate();

  const [userReviews, setUserReviews] = useState([]);

  const fetchUserReviews = async (accountId) => {
    const reviewsUrl = `http://localhost:8000/api/reviews/users/${accountId}`;

    try {
      const response = await fetch(reviewsUrl, { credentials: 'include' });

      if (response.ok) {
        const reviewsData = await response.json();
        setUserReviews(reviewsData);
      } else {
        console.error('Error fetching user reviews:', response.status);
        setUserReviews([]); // Set an empty array in case of an error
      }
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      setUserReviews([]); // Set an empty array in case of an error
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const accountId = await fetchAccountId();
      if (accountId) {
        fetchUserReviews(accountId);
      } else {
        console.error('Error fetching account ID');
        setUserReviews([]);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userReviews.length === 0 ? (
        <p style={{color:'white'}}>No user reviews available.</p>
      ) : (
        userReviews.map((review) => (
          <div key={review.id} className="urcard">
            <div className="urcard-contenet">
            <div className="urcard-title">{review.title}</div>


            </div>
            <div className="urline"></div>
            <div className="urcard-content">
              {/* <div className="urcard-photo">
                <img src="https://www.shareicon.net/data/512x512/2016/08/18/809170_user_512x512.png" alt="User" />
              </div> */}
              <div className="urcard-details" style={{ color: 'black', flex: '2', textAlign: 'right' }}>
                <p>{review.body}</p>
                {review.rating && (
                  <div className="rating-container">
                    <div className="star-rating">
                      <StarRating rating={review.rating} />

                    </div>
                    <div>
                    <button className="urcard-edit-delete" style={{ color: 'black' }} onClick={() => {
                      navigate(`/reviews/update/${review.id}/${review.game_id}`)
                    }}>Edit</button> |
                    <button className="urcard-edit-delete" style={{ color: 'black' }} onClick={() => {
                            navigate(`/reviews/delete/${review.id}`)
                    }}>Delete</button>
                  </div>
                  </div>

                )}
              </div>
            </div>
            {/* <div>
              <img className="thumbs-up" src="https://i.postimg.cc/N0md97zp/thumbsup.png" alt="Thumbs Up" />
              <p className="urp">34</p>
              <img className="thumbs-down" src="https://i.postimg.cc/m2W27bkj/thumbsdown.png" alt="Thumbs Down" />
              <p className="urp2">13</p>
            </div> */}
          </div>
        ))
      )}
    </div>
  );
}

export default UserReviewCard;
