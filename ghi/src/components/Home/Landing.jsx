import React from 'react';
import { useState, useEffect } from 'react';
import './Landing.css';
import Nav from '../../Nav.css';
import './Menu';
import './Rows';
import HomeGameCard from '../Cards/homeGameCard.jsx';

const Landing = () => {
  return (
    <header>
      <br />
      <br />
      <h3 className='homeH3'>New Releases →</h3>
      <div className="homeline"></div>
      <div className="hero-carousel-container">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">

              <img src="https://cdn.vox-cdn.com/thumbor/zolpTPkKQn-mLAk6QRNSLcD9PzI=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/25173694/Switch_MarioVSDonkeyKong_scrn_06.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/WepWpOm_mb9zhjHplHwFcDwLFuw=/0x0:3840x2160/1920x0/filters:focal(0x0:3840x2160):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/25143312/DD2_Glyndwr_png_jpgcopy.jpg" className="d-block w-100" alt="..." />
            </div>

            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/Ca6QN7HIPyTmdtAuKrvWAnIv8WQ=/0x0:1500x844/1920x0/filters:focal(0x0:1500x844):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24963291/qhybg2ye.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/FMzDoSKYRjwk4o3E5eUsPxS2mGU=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22656154/vlcsnap_2021_06_13_13h59m18s576.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/fL7Y3R_kVckqhtFN3pPOEVd0HoA=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24866429/2023_Final_Shape_Reveal_PressKit_Supers_Compressed_002.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/8bjkEs36QX01qBmYO56tO-h486I=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/25173770/NintendoSwitch_BandleTaleLoLStory_Screenshot_4.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://store-images.s-microsoft.com/image/apps.14679.13754210357812593.c3c8aa7a-e063-438f-8dc1-02c5d4abfd95.b555e954-35b4-47f6-87fb-405136d7273e?q=90&w=480&h=270" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/__K_p_kDxJBa1nc4y4jR0pHlfJo=/0x0:3840x2160/1920x0/filters:focal(0x0:3840x2160):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24608090/funko_fusion_characters.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/A1Au9YEYtyxHvzUq5OsmuyO1fg8=/0x0:3840x2160/1920x0/filters:focal(0x0:3840x2160):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/23358010/HLB_Announcement_In_Game_Screenshot_01.jpeg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/DZfBH8GXoLwrs7NMU3bQ2Sd4dLQ=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24712425/TOXIC_COMMANDO_Screenshot_4K_Logo_03.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/oP33gURyIPH4VYSxh8iLa9ca7XY=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/23624778/Lightyear_Frontier_Main_Keyart_1920x1080_cd297eb847be94ea54e4.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.vox-cdn.com/thumbor/q3AsLsCKtmm_FGMg_r4ELp1vGpA=/0x0:1920x1080/1920x0/filters:focal(0x0:1920x1080):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/25173868/Switch_LuigisMansion2HD_scrn_17.jpg" className="d-block w-100" alt="..." />
            </div>







          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      {/* <div>
        <input className='search-bar' type="text" placeholder='Search' />
      </div> */}

    </header>
  );
};

export default Landing;
