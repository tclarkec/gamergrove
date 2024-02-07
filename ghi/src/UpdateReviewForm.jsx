import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

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

async function fetchReviews(id) {
  const reviewUrl = `http://localhost:8000/api/reviews/${id}`;
  const reviewConfig = {
    credentials: 'include'
  };

  const response = await fetch(reviewUrl, reviewConfig);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

function UpdateReviewForm() {
  const navigate = useNavigate();
  const { review_id, game_id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    game_id: `${game_id}`,
    rating: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewData = await fetchReviews(review_id);

        if (reviewData) {
          setFormData({
            title: reviewData.title || '',
            body: reviewData.body || '',
            game_id: reviewData.game_id,
            rating: reviewData.rating || ''
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [review_id]);

    const handleStarClick = (selectedRating) => {
    setFormData({
      ...formData,
      rating: selectedRating,
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewsUrl = `http://localhost:8000/api/reviews/${review_id}/${account_data.id}`;

    const fetchConfig = {
      method: 'put',
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(reviewsUrl, fetchConfig);

    if (response.ok) {
      navigate(`/games/${game_id}`);
    } else {
      console.error('Failed to update review');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Update this review</h1>
            <form onSubmit={handleSubmit} id="create-board">
              <div className="form-floating mb-3">
                <label htmlFor="title">Title</label>
                <input onChange={handleFormChange} required type="text" name="title" id="title" className="form-control" value={formData.title} />
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="body">Description</label>
                <textarea onChange={handleFormChange} required name="body" id="body" className="form-control" value={formData.body} rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor='rating' style={{ marginBottom: '0rem' }}>Rating out of 5:</label>
                <div className='rating-container d-flex justify-content-center'>
                  <div className='star-rating'>
                    <StarRating rating={formData.rating} onStarClick={handleStarClick} />
                  </div>
                </div>
              </div>
              <button>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateReviewForm;
