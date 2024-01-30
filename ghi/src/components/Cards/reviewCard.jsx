import React from 'react';
import './reviewCard.css';

function ReviewCard() {
  return (
    <div className="rcard">
      <div className="card-content">
        <div className="card-photo">
          <img src="https://i.redd.it/qfddfjyvagd91.jpg" alt="Card Photo" />
        </div>
        <div className="card-details">
          <div className="card-title">Game Title</div>
          <hr className="rsolid" />
          <div className="card-description">
            <div className="side-by-side">
              <div className="link-container">
                <a href="https://www.example.com/link1" target="_blank" rel="noopener noreferrer">
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
