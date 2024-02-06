import React, { useState, useEffect } from 'react';
import Menu from '../Home/Menu.jsx';
import Nav from '../../Nav.jsx';
import HomeGameCard from '../Cards/homeGameCard.jsx';
import './Listgames.css';
import { useLocation } from 'react-router-dom';


const Listgames = () => {
  const location = useLocation();
  const data = location.state
  const genre = data.state
  console.log(genre.length > 2)
  const [games, setGames] = useState([]);
  const fetchGames = async () => {
    const url = 'http://localhost:8000/api/games'
    const response = await fetch(url)

    if (response.ok) {
      const fetchedGames = []
      const data = await response.json()
      if (genre.length > 2) {
        for (const game of data) {
          if (game.genre === genre) {
            fetchedGames.push(game)
          }
        }
      } else {
        for (const game of data) {
          fetchedGames.push(game)
        }
      }
      setGames(fetchedGames)
    }

  }


  useEffect(() => {
    fetchGames();
    }, []);


  return (

    <div>

        <h1>{genre}</h1>
        {games.map(g => {
          return(
            <h3 key={g.id}>{g.name}</h3>
          )

        })}
    </div>


  )
}

export default Listgames;
