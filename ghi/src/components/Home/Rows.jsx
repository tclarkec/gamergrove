// Rows.jsx
import React from 'react';
import './Rows.css';

const Rows = () => {
    return (
        <div className='row'>
            <h1>Hello There!!!!!!!!!!!!!!</h1>
            <h2>Game Images and Boards</h2>
            <div className='row__posters'>
                {/* Provide the correct image source */}
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
            </div>
        </div>
    );
};

export default Rows;
