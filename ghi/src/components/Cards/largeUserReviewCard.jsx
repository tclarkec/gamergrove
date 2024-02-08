import React, { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom';
import './largeUserReviewCard.css';
import StarRating from '../../StarRating';


function LargeUserReviewCard({ gameId, accountId }) {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [userVotes, setUserVotes] = useState([])

    const fetchReviewsForGame = async (gameId) => {
    const votes = await fetchVotesForUser();
    const reviewsUrl = `http://localhost:8000/api/reviews/games/${gameId}`;

    try {
      const response = await fetch(reviewsUrl);

      if (response.status === 404) {
        console.warn(`No reviews found for game with ID ${gameId}`);
        setUserReviews([]);
      } else {
        const reviewsData = await response.json();
        if (votes.length > 0) {
          for (const r of reviewsData) {
          let change = 0
          console.log(votes)
          for (const v of votes) {
            if (r.id == v.review_id) {
              change++
              if (v.upvote) {
                r.upvote = true
                r.downvote = false
              } else {
                r.upvote = false
                r.downvote = true
              }
            }
          }
         if (change === 0) {
            r.upvote = undefined
            r.downvote = undefined
          } else {
            change = 0
          }

        }

    }
        setUserReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVotesForUser = async () => {
    const user = await fetchUserName();
    const votesUrl = `http://localhost:8000/api/votes/users/${user}`;

    const votesConfig = {
      credentials: 'include'
    };


      const response = await fetch(votesUrl, votesConfig);
      if (response.ok) {
        const votesData = await response.json();

        const votes = []
        for (const v of votesData) {
          votes.push(v)

        }
        return votes

      } else {
        return 0
      }



      // if (response.status === 404) {
      //   console.warn(`No votes found for user`);

      // } else if (response.ok && votesData[votesData.length-1]["upvote"] === true) {
    //     setIsUpvoted(true);
    //   } else if (response.ok && votesData[votesData.length-1]["downvote"] === true) {
    //     setIsDownvoted(true);
    //   }
    // } catch (error) {
    //   console.error('Error fetching votes', error);
    // } finally {
    //   setIsLoading(false);

  };

  useEffect(() => {
    fetchReviewsForGame(gameId);
    fetchVotesForUser();
  }, [gameId, accountId]);

  async function fetchUserName() {
  const tokenUrl = `http://localhost:8000/token`;
  const fetchConfig = {
    credentials: 'include',
    redirect: 'follow',
  };

  const response = await fetch(tokenUrl, fetchConfig);

  if (response.ok) {
    const data = await response.json();
    return data.account.id;
  }
  }
  const [voted, setVoted] = useState(false)


  const handleUpVoteClick = async (reviewId, gameId) => {
    setVoted(false)
    const user = await fetchUserName();


    const upVoteData = {
      "review_id": reviewId,
      "upvote": true,
      "downvote": false
    }
    console.log(user)
    console.log(upVoteData)
    if (user) {
      const voteUrl = `http://localhost:8000/api/votes/users/${user}`
      const postUrl = 'http://localhost:8000/api/votes'
      const response = await fetch(voteUrl, { credentials: 'include' });
      if (response.ok) {
        const votes = await response.json()
        console.log(votes)



        for (const v of votes) {
          if (v.account_id == user && v.review_id == reviewId ) {
            console.log(v.id)
            setVoted(true)
            const upVoteUrl = `http://localhost:8000/api/votes/${v.id}/${user}`;
            const fetchConfig = {
              method: 'put',
              body: JSON.stringify(upVoteData),
              credentials: 'include',
              headers: {
                "Content-Type": 'application/json'
              }
            }
            const upVoteResponse = await fetch(upVoteUrl, fetchConfig)
            fetchReviewsForGame(gameId)
            return

          }
        }

        console.log('Trying to post')
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(upVoteData),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const upVoteResponse = await fetch(postUrl, fetchConfig)
          fetchReviewsForGame(gameId)


      } else {
        console.log('Trying to post')
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(upVoteData),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const upVoteResponse = await fetch(postUrl, fetchConfig)
          fetchReviewsForGame(gameId)
      }
    }
  }


  const handleDownVoteClick = async (reviewId, gameId) => {
    setVoted(false)
    const user = await fetchUserName();
    const downVoteData = {
      "review_id": reviewId,
      "upvote": false,
      "downvote": true
    }
    if (user) {
      const voteUrl = `http://localhost:8000/api/votes/users/${user}`
      const postUrl = 'http://localhost:8000/api/votes'
      const response = await fetch(voteUrl, { credentials: 'include' });
      if (response.ok) {
        const votes = await response.json()



        for (const v of votes) {
          console.log(v)
          if (v.account_id == user && v.review_id == reviewId ) {
            console.log(v.id)
            setVoted(true)
            const downVoteUrl = `http://localhost:8000/api/votes/${v.id}/${user}`
            const fetchConfig = {
              method: 'put',
              body: JSON.stringify(downVoteData),
              credentials: 'include',
              headers: {
                "Content-Type": 'application/json'
              }
            }
            const downVoteResponse = await fetch(downVoteUrl, fetchConfig)
            fetchReviewsForGame(gameId)
            return
          }
        }

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(downVoteData),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const downVoteResponse = await fetch(postUrl, fetchConfig)
          fetchReviewsForGame(gameId)



      } else {
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(downVoteData),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const downVoteResponse = await fetch(postUrl, fetchConfig)
          fetchReviewsForGame(gameId)
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
            <div style={{color: 'white'}} className="lurcard-content">
              <div className="lurcontainer-title">
                <p>Title: {review.title}</p>
              </div>
              <div className="lurcard-details">
                <p>Review: {review.body}</p>
              </div>
              <div className="lurcard-details">
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
                handleUpVoteClick(review.id, review.game_id)
              }}
              style={{ backgroundColor: review.upvote === true ? 'green' : 'transparent' }}
              >
              <img
                className='thumb-up'
                src="https://i.postimg.cc/dV4GtWb9/Thumbs-Up-White.png"
                alt="Thumbs Up"
              />
              <p className="urp" style={{ color: 'white', margin: '0', fontWeight: 'bold', textAlign: 'center' }}>{review.upvote_count}</p>
              </button>
              <button className='down-btn' onClick = {() => {
                handleDownVoteClick(review.id, review.game_id)
              }}
              style={{ backgroundColor: review.downvote === true ? 'red' : 'transparent' }}
              >
              <img
                className="thumbs-down"
                src="https://i.postimg.cc/fyNVvm4L/Thumbsdown-White.png"
                alt="Thumbs Down"
              />
              <p className="urp" style={{ color: 'white', marginBottom: '10', fontWeight: 'bold', textAlign: 'center' }}>{review.downvote_count}</p>
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
