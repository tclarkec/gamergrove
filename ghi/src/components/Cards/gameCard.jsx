import React from 'react';
import './gameCard.css';




function GameCard() {
  return (
    <div className='gcard-container'>
    <div className='gcard'>


        <img
          src="https://store-images.s-microsoft.com/image/apps.14679.13754210357812593.c3c8aa7a-e063-438f-8dc1-02c5d4abfd95.b555e954-35b4-47f6-87fb-405136d7273e?q=90&w=480&h=270"
          className="gcard-img"
          alt="Card"
        />
        <div className="gcontent-head">
          <h2>Card Heading</h2>

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

        <div className="gcontent-body">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum debitis aut sequi quaerat. Nobis deleniti
            quibusdam perspiciatis perferendis dicta. Dicta, quia voluptas. Quos amet cupiditate pariatur perspiciatis
            ipsa optio accusamus.
        </p>
        </div>
        <div className="gbutton">
          <button>
            <b>Options</b>
          </button>
        </div>
      </div>
      </div>

  );
}

export default GameCard;
