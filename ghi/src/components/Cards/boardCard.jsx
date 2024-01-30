import React from 'react';
import './boardCard.css';

function BoardCard() {
  return (
    // <div className="container mx-auto mt-4">
    //   <div className="row">
    //     <div className="col-md-4">
          <div className="card" style={{ width: '20rem' }}>

            <img src="https://image.api.playstation.com/vulcan/ap/rnd/202306/2400/ac505d57a46e24dd96712263d89a150cb443af288c025ff2.jpg" className="card-img-top" alt="..." style={{ borderRadius: '20px' }} />

            <div className="card-body">
              <h5 className="card-title1">Call of Duty Games</h5>

              <hr className="solid" />
              <p className="card-text1">10 Games</p>

              <div className="flex-container left" style={{ width: '8rem' }}>
                <img src="https://s.yimg.com/ny/api/res/1.2/Gd0bRJJa.OyTt.VhHZ.pww--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/gamesradar_237/5cad446a3d1dbf46c1d960b083fc6caa" className="card-img-top" alt="..." />
              </div>

              <div className="flex-container right" style={{ width: '8rem' }}>
                <img src="https://img.xboxachievements.com/images/monthly_2022_11/screenshots/9267/med_mwii-season-01-roadmap-028_df39a32a-18cc-4b01-b539-4f87d5c977cd.jpg" className="card-img-top" alt="..." />
              </div>

              <div className="flex-container center" style={{ width: '9.7rem' }}>
                <img src="https://mp1st.com/wp-content/uploads/2022/09/modern-warfare-2-mp-13.jpg" className="card-img-top" alt="..." />
              </div>
            </div>
          </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default BoardCard;
