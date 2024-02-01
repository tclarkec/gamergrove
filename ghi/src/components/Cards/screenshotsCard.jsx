import React from 'react';
import './screenshotsCard.css';

function ScreenshotsCard() {
  return (
    <div className="screenshotscard">
      <div className="scard-content">
        <div className="scard-Herophoto">
          <img src="https://www.gematsu.com/wp-content/uploads/2022/12/Hogwarts-Legacy-Play_12-14-22.jpg" alt="Card Photo" />
        </div>
        <div className="scard-SmallphotoTop">
          <img src="https://images.thebrag.com/var/uploads/2023/02/Hogwarts-Legacy-1.jpg" alt="Card Photo" />
        </div>
        <div className="scard-SmallphotoBottom">
          <img src="https://imageio.forbes.com/specials-images/imageserve/63d14ab916372f9583d1c38a/duel2/960x0.png?format=png&width=960" alt="Card Photo" />
        </div>
      </div>
      <div className="scard-title">Screenshots</div>
      <hr className="ssolid" />
    </div>
  );
}

export default ScreenshotsCard;
