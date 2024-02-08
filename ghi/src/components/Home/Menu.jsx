import React, { useState, useEffect } from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SideMenu = ({ onSelectGenre, onSelectPlatform }) => {

    const [platforms, setPlatforms] = useState([]);


    const [menuWidth, setMenuWidth] = useState(250);
    const navigate = useNavigate();
    const updateMenuWidth = () => {
        if (window.innerWidth <= 768) {
            setMenuWidth(window.innerWidth);
        } else {
            setMenuWidth(250);
        }
    };
    const [genres, setGenres] = useState([]);
    const fetchGenres = async () => {
        const url = `http://localhost:8000/api/games`;
        const response = await fetch(url)
        if (response.ok) {
            const gameGenres = []
            const data = await response.json()
            for (const game of data) {
                if (gameGenres.includes(game.genre)) {
                    continue
                } else {
                    gameGenres.push(game.genre)
                }
            }
            setGenres(gameGenres)
        }
    }

    const fetchPlatforms = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/platforms');
            if (response.ok) {
                const data = await response.json();
                setPlatforms(data);
            } else {
                console.error('Failed to fetch platforms:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching platforms:', error);
        }
    };

    const handlePlatformClick = (platform) => {
        onSelectPlatform(platform);
    };

    useEffect(() => {
        fetchPlatforms();
    }, []);





    const handleGenreClick = (event) => {
        const page = event.target.value
        // navigate(`/games/${page}`)
    }

    useEffect(() => {
        updateMenuWidth();
        window.addEventListener('resize', updateMenuWidth);
        fetchGenres();

        return () => {
            window.removeEventListener('resize', updateMenuWidth);
        };
    }, []);



    return (
            <div className="side-menu">
                <ul>
                    
                    <a href="http://localhost:5173/">
                    <h5 className='home'>Home Page</h5>
                    </a>
                    <div className="small-space"></div>

                    <hr className='solid' />

                    <div className="small-space"></div>

                    <NavLink to="/games" state={{ state: ''}} >All Games</NavLink>
                    <div className="small-space"></div>
                    <p>Consoles</p>
                    <hr className='solid' />
                    <ul>
                    <li className='linkside'><NavLink to="/games" state={{ state: 'xbox' }} >- Xbox</NavLink></li>
                    <li className='linkside'><NavLink to="/games" state={{ state: 'playstation' }} >- PlayStation</NavLink></li>
                    <li className='linkside'><NavLink to="/games" state={{ state: 'pc' }} >- PC</NavLink></li>
                    <li className='linkside'><NavLink to="/games" state={{ state: 'nintendo' }} >- Nintendo</NavLink></li>
                    </ul>


                    {/* <ul>
                        {platforms.map((platform) => (
                            <li key={platform} onClick={() => handlePlatformClick(platform)}>
                                - {platform}
                            </li>
                        ))}
                    </ul> */}


                    <div className="small-space"></div>
                    <p>Genres</p>
                    <hr className='solid'/>
                    <ul>

                        {genres.map(genre => {
                            return(
                                <li className='linkside'><NavLink to="/games" state={{ state: genre }} >- {genre}</NavLink></li>
                            )

                        })}
                        {/* <li onClick={() => onSelectGenre('Action')}>- Action</li>
                        <li onClick={() => onSelectGenre('Strategy')}>- Strategy</li>
                        <li onClick={() => onSelectGenre('RPG')}>- RPG</li>
                        <li onClick={() => onSelectGenre('Shooter')}>- Shooter</li>
                        <li onClick={() => onSelectGenre('Adventure')}>- Adventure</li> */}
                    </ul>
                    <br />
                    <br />
                    <div className="small-space"></div>
                    <hr className='solid' />

                    <hr className='solid'/>
                    <ul>

                    </ul>
                </ul>
            </div>
    );
};

export default SideMenu;
