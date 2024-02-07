import React, { useState, useEffect } from 'react';
import './Landing.css';
import Nav from '../../Nav.css';
import './Menu';
import './Rows';
import HomeGameCard from '../Cards/homeGameCard.jsx';
import Icon from '../Icon/icon.jsx';

const Landing = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games from your API
    fetch('http://localhost:8000/api/games')
      .then(response => response.json())
      .then(data => {
        
        const filteredGames = data.filter(game => game.rating > 4.30);
        console.log('Filtered games:', filteredGames);

      })
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  return (
    <header>
      <br />
      <br />
      <h3 className='homeH3'>Most Popular</h3>
      <div className="homeline"></div>
      <div className="hero-carousel-container">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {games.map((game, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img
                src={game.background_img}
                className="d-block w-100"
                alt={game.title}
                style={{ minHeight: '400px', maxHeight: '400px', objectFit: 'cover', margin: '0 auto' }}
              />
              <div className="carousel-caption">
                <h5 className='carousel-caption'>{game.title}</h5>
              </div>
              </div>

            ))}
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

    </header>
  );
};

export default Landing;
