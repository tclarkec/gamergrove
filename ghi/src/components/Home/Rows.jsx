// Rows.jsx
import React, {useEffect, useState} from 'react';
import './Rows.css';
import BoardCard from '../Cards/boardCard.jsx';


const Rows = () => {
    const [games, setGames] = useState([]);
    const getData = async () => {
        // Want to ping our DB so 15432 or 5432
        const response = await fetch("http://localhost:8000/api/games/{id}");

        if (response.ok) {
            const data =await response.json();
            setGames(data.games)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    console.log(games)
    return (

        <div className='row'>
            <h1>Action Games</h1>
            <div className='row__posters'>
                {games.map(
                    (game) =>{
                        <tr key={game.id}>
                            <td>
                                {game.name}
                            </td>

                        </tr>
                    }
                )}
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                {/* <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" /> */}
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
