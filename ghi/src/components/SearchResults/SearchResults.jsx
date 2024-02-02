import React from 'react';
import logo from '../../assets/logo.gif';
import Nav from '../../Nav.jsx';
import Menu from '../Home/Menu.jsx';
import { useLocation } from 'react-router-dom';


const SearchResults = () => {
    const location = useLocation();
    const games = location.state
    console.log(games)
    return(
        <div>
            <h1 style={{color: "white"}}>Search Results:</h1>
            {games.map((game) => (
                <h2 style={{color: "white"}} key={game}>{game}</h2>
            ))}

        </div>
    )

}

export default SearchResults;
