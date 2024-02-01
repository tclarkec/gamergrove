import React from 'react';
import './wishlistCard.css';

function WishlistCard() {
  return (
    <div className="wcard">
      <div className="wcard-content">
        <div className="wcard-photo">
          <img src="https://i.redd.it/qfddfjyvagd91.jpg" alt="Card Photo" />
        </div>
        <div className="wcard-details">
          <div className="wcard-title">Game Title</div>
          <hr className="solid" />
          <div className="wcard-description">
            <div className="side-by-side">
              <div className="link-container">
                <a href="https://www.example.com/link1" target="_blank" rel="noopener noreferrer">
                  Details
                </a>
              </div>
              <span>|</span>
              <div className="link-container">
                <a href="https://www.example.com/link2" target="_blank" rel="noopener noreferrer">
                  Remove
                </a>
              </div>
            </div>
          </div>
          <div className="gcontent-capsules">
            <img src="https://i.postimg.cc/nrDT7szB/image-5.png" width="25px" height="25px" alt="Icon 1" />
            <img
              src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png"
              width="25px"
              height="25px"
              alt="Icon 2"
            />
            <img src="https://i.postimg.cc/R0qXLppc/image-3.png" width="25px" height="25px" alt="Icon 3" />
            <img
              src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png"
              width="25px"
              height="25px"
              alt="Icon 4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
