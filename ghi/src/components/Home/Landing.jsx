import React, { useState, useEffect } from 'react';
import './Landing.css';
import Nav from '../../Nav.css';
import './Menu';
import './Rows';
import HomeGameCard from '../Cards/homeGameCard.jsx';
import Icon from '../Icon/icon.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Landing = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {

    fetch('http://localhost:8000/api/games')
      .then(response => response.json())
      .then(data => {

        const filteredGames = data.filter(game => game.rating > 4.30);
        setGames(filteredGames);

      })
      .catch(error => console.error('Error fetching games:', error));
  }, []);


      const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };

  return (
    <header>
      <br />
      <br />
      <h3 className='homeH3'>Most Popular</h3>
      <div className="homeline"></div>
      <Slider {...settings}>
        {games.map((game, index) => (
            <div key={index}>
              <img
                  src={game.background_img}
                  className="d-block w-100"
                  alt={game.title}
                  style={{ maxHeight: '400px', maxWidth: '1000px', minHeight: '400px',
                  objectFit: 'cover', margin: '0 auto', marginLeft: '355px', borderRadius: '40px',
                  marginTop: '10px' }}
              />
              <div className="carousel-caption">
                  <h5 className='carousel-caption'>{game.title}</h5>
              </div>
            </div>
        ))}
      </Slider>



    </header>
  );
};

export default Landing;
