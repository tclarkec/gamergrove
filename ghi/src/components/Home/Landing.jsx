import React from 'react'
import { useState, useEffect} from 'react'
import './Landing.css'

const Landing = () => {
  return (
    <div>
        <div className='hero-carosuel' id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="https://media.rawg.io/media/screenshots/8b8/8b81f703d92ce0bc95525bbfee2c1d06.jpg" class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                <img src="https://media.rawg.io/media/screenshots/066/066a1df009c2ecc03a3b687cca001352.jpg" class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                <img src="https://media.rawg.io/media/screenshots/ed1/ed1b906360e140f17bf5bc50251854e7.jpg" class="d-block w-100" alt="..." />
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div>
            <input className='search-bar' type="text" placeholder='Search' />
        </div>
    </div>
  )
}

export default Landing
