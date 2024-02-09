import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rows.css';
import HomeGameCard from '../Cards/homeGameCard.jsx';

const Rows = ({ selectedGenre, onSelectGenre }) => {
  const [gameDataList, setGameDataList] = useState([]);
  const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/games');
            const data = await response.json();
            setGameDataList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const organizeGamesByGenre = () => {
    const organizedGames = {};
    gameDataList.forEach((game) => {
      if (!organizedGames[game.genre]) {
        organizedGames[game.genre] = [];
      }
      if (!selectedGenre || game.genre === selectedGenre) {
        organizedGames[game.genre].push(game);
      }
    });
    return organizedGames;
  };

  const organizedGamesByGenre = organizeGamesByGenre();



  return (
    <div>
      {Object.keys(organizedGamesByGenre).map((genre) => (
        <div key={genre} className='row'>

            <h3>{`${genre} Games`}</h3>
          <div className="line"></div>
          <div className='row__posters'>
            <HomeGameCard games={organizedGamesByGenre[genre].slice(0, 5)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rows;
