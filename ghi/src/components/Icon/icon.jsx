import React, { useState, useEffect } from 'react';

const Icon = () => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {

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
        const { account } = userData;
        const { icon_id } = account;

        const iconResponse = await fetch(`http://localhost:8000/api/icons/${icon_id}`);
        if (!iconResponse.ok) {
          throw new Error(`Error fetching icon information. Status: ${iconResponse.status}`);
        }

        const iconData = await iconResponse.json();

        setIconUrl(iconData.icon_url);
      } catch (error) {
        console.error('Error fetching user icon information:', error);
      }
    };


    fetchUserData();
  }, []);

  return (
  <div>
    {iconUrl ? (
      <img src={iconUrl} alt="User Icon" style={{ width: '60px', height: '60px' }} />
    ) : (
      <>

        <img src="https://i.postimg.cc/SQCfRFsN/image-9.png" alt="Hardcoded Icon" style={{ width: '50px', height: '50px' }} />
      </>
    )}
  </div>
);

};

export default Icon;
