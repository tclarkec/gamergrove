import React from 'react';
import './userReviewCard.css';

function UserReviewCard() {
  return (
    <div className="urcard">
      <div className="urcard-title">Game Title</div>
      <div className="urcard-date">9/3/2023</div>
      <div className="urcard-edit-delete">edit | delete</div>
      <div className="urline"></div>
      <div className="urcard-content">
        <div className="urcard-photo">
          <img src="https://www.shareicon.net/data/512x512/2016/08/18/809170_user_512x512.png" />
        </div>
        <div className="urcard-details">
            {/* limit this to 715 characters */}

            <p>1up isometric view Shoot 'em up rekt Counter-Strike multiplayer online battle arena The Legend of Zelda: Collector's Edition XP character design WWE 2K open world Third-Person. DPS Madden OHKO MMORPG feeding Assassin's Creed bullshot noob. Mudflation achievements drop-out God of War nerf accelerometer FPS tryhard dual wield cheated death job Red Dead game engine. Crowd control Grand Theft Auto IV single-player Crash Bandicoot action mute JRPG The Elder Scrolls V: Skyrim ambient occlusion.</p>

        </div>
      </div>
      <div>
       <img className="thumbs-up" src="https://i.postimg.cc/N0md97zp/thumbsup.png" />
       <p className="urp">34</p>
      <img className="thumbs-down" src="https://i.postimg.cc/m2W27bkj/thumbsdown.png" />
      <p className="urp2">13</p>


      </div>
    </div>
  );
}

export default UserReviewCard;
