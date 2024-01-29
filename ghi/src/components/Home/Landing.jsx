import React from 'react';
import { useState, useEffect } from 'react';
import './Landing.css';
import Nav from '../../Nav.css';
import './Menu';
import './Rows';

const Landing = () => {
  return (
    <header>
      <div className="hero-carousel-container">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://media.rawg.io/media/screenshots/8b8/8b81f703d92ce0bc95525bbfee2c1d06.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://media.rawg.io/media/screenshots/066/066a1df009c2ecc03a3b687cca001352.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://media.rawg.io/media/screenshots/ed1/ed1b906360e140f17bf5bc50251854e7.jpg" className="d-block w-100" alt="..." />
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

      <div>
        <input className='search-bar' type="text" placeholder='Search' />
      </div>
      
    </header>
  );
};

export default Landing;
