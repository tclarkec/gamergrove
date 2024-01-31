import React, { useState, useEffect } from 'react';
import './Menu.css';

const SideMenu = () => {

    const [menuWidth, setMenuWidth] = useState(250);

    const updateMenuWidth = () => {
        if (window.innerWidth <= 768) {
            setMenuWidth(window.innerWidth);
        } else {
            setMenuWidth(250); // Set your default width
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
                    <hr class='solid' />

                    <p class='space'>New Releases</p>
                    <hr class='solid' />
                    <ul>
                        <li>- Last 30 Days</li>
                        <li>- This Week</li>
                        <li>- Coming Soon</li>
                    </ul>
                    <br />
                    <p>Consoles</p>
                    <hr class='solid' />
                    <ul>
                        <li>- Xbox</li>
                        <li>- Playstation</li>
                        <li>- PC</li>
                        <li>- Nintendo</li>
                    </ul>
                    <br />
                    <p>Genres</p>
                    <hr class='solid'/>
                    <ul>
                        <li>- Action</li>
                        <li>- Strategy</li>
                        <li>- RPG</li>
                        <li>- Shooter</li>
                        <li>- Adventure</li>
                    </ul>
                    <br />
                    <hr class='solid' />
                    <p className='all-games' >All Games</p>
                    <hr class='solid'/>
                    <ul>

                    </ul>
                </ul>
            </div>
    );
};

export default SideMenu;
