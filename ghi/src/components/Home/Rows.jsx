// Rows.jsx
import React, {useEffect, useState} from 'react';
import './Rows.css';
import BoardCard from '../Cards/boardCard.jsx';


const Rows = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        // Replace this with the actual game data you want to send to the backend
                        name: '',
                        description: '',
                        rating: 5,
                        background_img: ''
                        // Add other fields as needed
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setGames(data);
                } else {
                    console.error('Could not fetch those games for you');
                }
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);



    return (

        <div className='row'>
            <h1>Action Games</h1>
            <div className='row__posters'>
                {/* Provide the correct image source */}

                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
            </div>
            <h1>Strategy Games</h1>
            <div className='row__posters'>
                {/* Provide the correct image source */}
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
            </div>
            <h1>RPG Games</h1>
            <div className='row__posters'>
                {/* Provide the correct image source */}
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
            </div>
            <h1>Adventure Games</h1>
            <div className='row__posters'>
                {/* Provide the correct image source */}
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
                <img className='row__poster' src="https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg" alt="Poster" />
            </div>



        </div>
    );
};

export default Rows;
