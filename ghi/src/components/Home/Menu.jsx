import React, { useState, useEffect } from 'react';
import './Menu.css';

const SideMenu = ({ onSelectGenre }) => {

    const [menuWidth, setMenuWidth] = useState(250);

    const updateMenuWidth = () => {
        if (window.innerWidth <= 768) {
            setMenuWidth(window.innerWidth);
        } else {
            setMenuWidth(250);
        }
    };

    useEffect(() => {
        updateMenuWidth();
        window.addEventListener('resize', updateMenuWidth);

        return () => {
            window.removeEventListener('resize', updateMenuWidth);
        };
    }, []);

// Maybe do like a recently purchased Games or Save or some sort that redirects yout to a particular page

    return (
            <div className="side-menu">
                <ul>
                    <br />
                    <br />
                    <a href="http://localhost:5173/">
                    <h5 className='home'>Hompage</h5>
                    </a>
                    <div className="small-space"></div>

                    <hr className='solid' />

                    <div className="small-space"></div>

                    <p className='space'>New Releases</p>
                    <hr className='solid' />
                    <ul>
                        <li>- Last 30 Days</li>
                        <li>- This Week</li>
                        <li>- Coming Soon</li>
                    </ul>
                    <div className="small-space"></div>
                    <p>Consoles</p>
                    <hr className='solid' />
                    <ul>
                        <li>- Xbox</li>
                        <li>- Playstation</li>
                        <li>- PC</li>
                        <li>- Nintendo</li>
                    </ul>
                    <div className="small-space"></div>
                    <p>Genres</p>
                    <hr className='solid'/>
                    <ul>
                        <li onClick={() => onSelectGenre(null)}>- All Genres</li>
                        <li onClick={() => onSelectGenre('Action')}>- Action</li>
                        <li onClick={() => onSelectGenre('Strategy')}>- Strategy</li>
                        <li onClick={() => onSelectGenre('RPG')}>- RPG</li>
                        <li onClick={() => onSelectGenre('Shooter')}>- Shooter</li>
                        <li onClick={() => onSelectGenre('Adventure')}>- Adventure</li>
                    </ul>
                    <div className="small-space"></div>
                    <hr className='solid' />
                    <p className='all-games' >All Games</p>
                    <hr className='solid'/>
                    <ul>

                    </ul>
                </ul>
            </div>
    );
};

export default SideMenu;
