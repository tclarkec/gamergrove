import React, { useEffect, useState } from 'react';
import './Rows.css';
import HomeGameCard from '../Cards/homeGameCard.jsx';

const Rows = () => {
    const [gameDataList, setGameDataList] = useState([]);

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
            organizedGames[game.genre].push(game);
        });
        return organizedGames;
    };

    const organizedGamesByGenre = organizeGamesByGenre();

    return (
        <div>
            <br />
            <br />

            {Object.keys(organizedGamesByGenre).map((genre) => (
                <div key={genre} className='row'>
                    <h3>{`${genre} Games →`}</h3>
                    <div className="line"></div>
                    <div className='row__posters'>
                        <HomeGameCard games={organizedGamesByGenre[genre]} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Rows;
