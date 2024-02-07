import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

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

function UpdateReviewForm() {
  const navigate = useNavigate();
  const { review_id, game_id } = useParams();
  const initialData = {
    title: "",
    body: "",
    game_id: game_id,
    rating: ""
  };

  const [formData, setFormData] = useState(initialData);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedAccountId = await fetchAccountId();
      if (fetchedAccountId) {
        setAccountId(fetchedAccountId);
        console.log('Got account id!');
      } else {
        console.error('Error fetching account ID');
      }
    };

    fetchUserData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStarClick = (selectedRating) => {
    setFormData({
      ...formData,
      rating: selectedRating,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewUrl = `http://localhost:8000/api/reviews/users/${review_id}/${accountId}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(reviewUrl, fetchConfig);
      if (response.ok) {
        navigate("/dashboard");
        setFormData(initialData);
      } else {
        throw new Error('Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Update a review</h1>
            <form onSubmit={handleSubmit} id="create-board">
              <div className="form-floating mb-3">
                <label htmlFor="title">Title</label>
                <input onChange={handleFormChange} placeholder="i.e. The Best Game of 2023" required type="text" name="title" id="title" className="form-control" value={formData.title} />
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="body">Body</label>
                <textarea onChange={handleFormChange} placeholder="i.e. A groundbreaking FPS" name="body" id="body" className="form-control" value={formData.body} rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor='rating' style={{ marginBottom: '0rem' }}>Give a rating out of 5:</label>
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
