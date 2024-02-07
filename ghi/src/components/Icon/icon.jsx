import React, { useState, useEffect } from 'react';

const Icon = () => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    // Function to fetch authenticated user's information
    const fetchUserData = async () => {
      const tokenUrl = `http://localhost:8000/token`;
      const fetchConfig = {
        credentials: 'include',
      };

      try {
        const response = await fetch(tokenUrl, fetchConfig);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        console.log('User Data:', userData);

        // Assuming userData includes "account" with "icon_id"
        const { account } = userData;
        const { icon_id } = account;

        console.log('Icon ID:', icon_id);

        // Make a call to api/icons/id to get the icon_url
        const iconResponse = await fetch(`http://localhost:8000/api/icons/${icon_id}`);
        if (!iconResponse.ok) {
          throw new Error(`Error fetching icon information. Status: ${iconResponse.status}`);
        }

        const iconData = await iconResponse.json();

        console.log('Icon Data:', iconData);

        // Set the icon_url in the state
        setIconUrl(iconData.icon_url);
      } catch (error) {
        console.error('Error fetching user icon information:', error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
  <div>
    {iconUrl ? (
      <img src={iconUrl} alt="User Icon" style={{ width: '50px', height: '50px' }} />
    ) : (
      <>

        <img src="https://i.postimg.cc/SQCfRFsN/image-9.png" alt="Hardcoded Icon" style={{ width: '50px', height: '50px' }} />
      </>
    )}
  </div>
);

};

export default Icon;
