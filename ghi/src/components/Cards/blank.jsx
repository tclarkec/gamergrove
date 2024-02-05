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
        setIsUpvoted(true);
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
