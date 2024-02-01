import React, { useState, useEffect } from 'react';
import './wishlistCard.css';

async function fetchUserName() {
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

function WishlistCard() {
  const [libraryDataList, setLibraryDataList] = useState([]);

  const fetchGameDetails = async (gameId) => {
    const gameDetailsUrl = `http://localhost:8000/api/games/${gameId}`;
    const gameDetailsResponse = await fetch(gameDetailsUrl);
    return gameDetailsResponse.json();
  };

  const fetchAllGameDetails = async () => {
    const detailsPromises = libraryDataList.map((libraryItem) =>
      fetchGameDetails(libraryItem.game_id)
    );
    return Promise.all(detailsPromises);
  };

  const fetchData = async (userId) => {
    const libraryUrl = `http://localhost:8000/api/users/libraries/${userId}`;
    const libraryConfig = {
      credentials: 'include',
    };

    try {
      const response = await fetch(libraryUrl, libraryConfig);
      const libraryData = await response.json();
      setLibraryDataList(libraryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserName();
      fetchData(userId);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const displayGameDetails = async () => {
      const gameDetailsList = await fetchAllGameDetails();
      setLibraryDataList((prevList) =>
        prevList.map((item, index) => ({ ...item, ...gameDetailsList[index] }))
      );
    };

    displayGameDetails();
  }, [libraryDataList]);

  const filteredLibraryDataList = libraryDataList.filter((libraryItem) => libraryItem.wishlist);

  return (
    <div className="wcard-container">
      {filteredLibraryDataList.map((libraryItem) => (
        <div key={libraryItem.id} className="wcard">
          {libraryItem.background_img && (
            <div className="wcard-photo">
              <img
                src={libraryItem.background_img}
                alt={`Card Photo for Game ID ${libraryItem.game_id}`}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'fallback-image-url'; // Replace with your fallback image URL
                }}
              />
            </div>
          )}
          {libraryItem.name && (
            <div className="wcard-details">
              <div className="wcard-title">{libraryItem.name}</div>
              <hr className="solid" />
              <div className="wcard-description">
                <div className="side-by-side">
                  <div className="link-container">
                    <a
                      href={`https://www.example.com/details`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Details
                    </a>
                  </div>
                  <span>|</span>
                  <div className="link-container">
                    <a
                      href={`https://www.example.com/remove`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Remove
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default WishlistCard;

