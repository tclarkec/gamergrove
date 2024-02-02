import React from 'react';
import logo from '../../assets/logo.gif';
import Nav from '../../Nav.jsx';
import Menu from '../Home/Menu.jsx';

const Allgames = () => {
    return (
        <div id="game-container">
            <div>
            <Nav />
            {/* <Menu /> */}
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <body className='game-container'>
                <h2> Popular Games !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h2>
                <div className='game__posters'>
                    {/* ... Your game posters */}
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                    <img className='row__poster' src="https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1024" alt="Poster" />
                </div>
            </body>
        </div>
    )
}

export default Allgames;
