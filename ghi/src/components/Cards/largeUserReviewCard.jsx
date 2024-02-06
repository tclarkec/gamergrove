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
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

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

  const fetchVotesForUser = async (accountId) => {
    const votesUrl = `http://localhost:8000/api/votes/users/${accountId}`;

    const votesConfig = {
      credentials: 'include'
    };

    try {
      const response = await fetch(votesUrl, votesConfig);
      const votesData = await response.json();

      if (response.status === 404) {
        console.warn(`No votes found for user`);

      } else if (response.ok && votesData[votesData.length-1]["upvote"] === true) {
        setIsUpvoted(true);
      } else if (response.ok && votesData[votesData.length-1]["downvote"] === true) {
        setIsDownvoted(true);
      }
    } catch (error) {
      console.error('Error fetching votes', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchReviewsForGame(gameId);
    fetchVotesForUser(accountId);
  }, [gameId, accountId]);

  const handleUpVoteClick = async (reviewId) => {
   if (isUpvoted == false && isDownvoted == true) {
    const removeDownvoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": false
    }
    const removeDownvoteUrl = 'http://localhost:8000/api/votes';

    const removeDownvoteFetchConfig = {
      method: "post",
      body: JSON.stringify (removeDownvoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const removeDownvoteResponse = await fetch(removeDownvoteUrl, removeDownvoteFetchConfig);
      if (removeDownvoteResponse.ok) {
        console.log('Downvote removed')
        setIsDownvoted(false);
      } else {
        console.error('Failed to remove downvote. Server response: ', response);
        throw new Error('Failed to remove downvote')
      }
    } catch (error) {
      console.error ('Error removing downvote', error);
    }

    const upVoteData = {
      "review_id": reviewId,
      "upvote": true,
      "downvote": false
    }

    const voteUrl = 'http://localhost:8000/api/votes';

    const voteFetchConfig = {
      method: "post",
      body: JSON.stringify (upVoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const voteResponse = await fetch(voteUrl, voteFetchConfig);
      if (voteResponse.ok) {
        console.log('Upvote registered!')
        setIsUpvoted(true);
      } else {
        console.error('Failed to register upvote. Server response: ', response);
        throw new Error('Failed to create upvote')
      }
    } catch (error) {
      console.error ('Error creating upvote', error);
    }
   }
    if (isUpvoted === false && isDownvoted == false) {
    const upVoteData = {
      "review_id": reviewId,
      "upvote": true,
      "downvote": false
    }

    const voteUrl = 'http://localhost:8000/api/votes';

    const voteFetchConfig = {
      method: "post",
      body: JSON.stringify (upVoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const voteResponse = await fetch(voteUrl, voteFetchConfig);
      if (voteResponse.ok) {
        console.log('Upvote registered!')
        setIsUpvoted(true);
      } else {
        console.error('Failed to register upvote. Server response: ', response);
        throw new Error('Failed to create upvote')
      }
    } catch (error) {
      console.error ('Error creating upvote', error);
    }
  } else if (isUpvoted === true) {
    const upVoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": false
    }

    const voteUrl = 'http://localhost:8000/api/votes';

    const voteFetchConfig = {
      method: "post",
      body: JSON.stringify (upVoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const voteResponse = await fetch(voteUrl, voteFetchConfig);
      if (voteResponse.ok) {
        console.log('Upvote removed!')
        setIsUpvoted(false);
      } else {
        console.error('Failed to remove upvote. Server response: ', response);
        throw new Error('Failed to remove upvote')
      }
    } catch (error) {
      console.error ('Error removing upvote', error);
    }
  }
}

  const handleDownVoteClick = async (reviewId) => {
    if (isDownvoted === false && isUpvoted == true) {
    const removeUpvoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": false
    }

    const removeUpvoteUrl = 'http://localhost:8000/api/votes';

    const removeUpvoteFetchConfig = {
      method: "post",
      body: JSON.stringify (removeUpvoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const removeUpvoteResponse = await fetch(removeUpvoteUrl, removeUpvoteFetchConfig);
      if (removeUpvoteResponse.ok) {
        console.log('Upvote removed!')
        setIsUpvoted(false);
      } else {
        console.error('Failed to remove upvote. Server response: ', response);
        throw new Error('Failed to remove upvote')
      }
    } catch (error) {
      console.error ('Error removing upvote', error);
    }

    const downVoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": true
    }

    const voteUrl = 'http://localhost:8000/api/votes';

    const voteFetchConfig = {
      method: "post",
      body: JSON.stringify (downVoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const voteResponse = await fetch(voteUrl, voteFetchConfig);
      if (voteResponse.ok) {
        console.log('Downvote registered!')
        setIsDownvoted(true);
      } else {
        console.error('Failed to register downvote. Server response: ', response);
        throw new Error('Failed to create downvote')
      }
    } catch (error) {
      console.error ('Error creating downvote', error);
    }

  }

    if (isDownvoted === false && isUpvoted == false) {
    const downVoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": true
    }

    const voteUrl = 'http://localhost:8000/api/votes';

    const voteFetchConfig = {
      method: "post",
      body: JSON.stringify (downVoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const voteResponse = await fetch(voteUrl, voteFetchConfig);
      if (voteResponse.ok) {
        console.log('Downvote registered!')
        setIsDownvoted(true);
      } else {
        console.error('Failed to register downvote. Server response: ', response);
        throw new Error('Failed to create downvote')
      }
    } catch (error) {
      console.error ('Error creating downvote', error);
    }
  } else if (isDownvoted === true) {
    const downVoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": false
    }

    const voteUrl = 'http://localhost:8000/api/votes';

    const voteFetchConfig = {
      method: "post",
      body: JSON.stringify (downVoteData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const voteResponse = await fetch(voteUrl, voteFetchConfig);
      if (voteResponse.ok) {
        console.log('Downvote removed!')
        setIsDownvoted(false);
      } else {
        console.error('Failed to remove downvote. Server response: ', response);
        throw new Error('Failed to remove downvote')
      }
    } catch (error) {
      console.error ('Error removing downvote', error);
    }
  }
}

  return (
    <div>
      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        userReviews.map((review) => (
          <div key={review.id} className="largercard">
            <div className="lurcard-title">{review.title}</div>
            <div className="lurcard-date">9/3/2023</div>
            <div>
              {review.account_id === accountId && (
                <>
                  <button
                    className="lurcard-edit"
                    style={{ color: 'black' }}
                    onClick={() => {
                      navigate(`/reviews/update/${review.id}/${review.game_id}`)
                    }}
                  >
                    Edit
                  </button>{' '}
                  <button
                    className="lurcard-delete"
                    style={{ color: 'black' }}
                    onClick={() => {
                      navigate(`/reviews/delete/${review.id}`)
                    }}
                  >
                    Delete
                  </button>{' '}
                </>
              )}
            </div>
            <div className="lurline"></div>
            <div style={{color: 'white'}} className="urcard-content">
              <div className="urcontainer-title">
                <p>Title: {review.title}</p>
              </div>
              <div className="ulrcontainer">
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
                handleUpVoteClick(review.id)
              }}
              style={{ backgroundColor: isUpvoted ? 'green' : 'transparent' }}
              >
              <img
                className="thumbs-up"
                src="https://i.postimg.cc/dV4GtWb9/Thumbs-Up-White.png"
                alt="Thumbs Up"
              />
              <p className="urp" style={{ color: 'white', margin: '0', fontWeight: 'bold', textAlign: 'center' }}>{review.upvote_count}</p>
              </button>
              <button onClick = {() => {
                handleDownVoteClick(review.id)
              }}
              style={{ backgroundColor: isDownvoted ? 'red' : 'transparent' }}
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

export default LargeUserReviewCard;
